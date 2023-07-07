"use strict";

const models = require("../../models");
const Sequelize = require("sequelize");
const puppeteer = require("puppeteer");
const userHelper = require('./userHelper');
const DEFAULT_USER_AVATAR_PATH = "/images/default-user-icon.jpg";

const controller = {};

controller.showNewsList = async (request, response) => {
    response.locals.isNewsPage = true;
    response.locals.pageTitle = "Tin tức";

    // Get category, subcategory, and tag from request's query
    let categoryId = isNaN(request.query.categoryId) ? -1 : parseInt(request.query.categoryId);
    const subCategoryId = isNaN(request.query.subCategoryId) ? -1 : parseInt(request.query.subCategoryId);
    const tagId = isNaN(request.query.tagId) ? -1 : parseInt(request.query.tagId);

    response.locals.showAllCategories = categoryId === -1 && subCategoryId === -1;
    response.locals.showAllSubCategories = categoryId !== -1 && subCategoryId === -1;

    if (tagId !== -1 && (categoryId !== -1 || subCategoryId !== -1)) return response.redirect(`/news?tagId=${tagId}`);

    // If both category and subcategory is passed, use only subcategory
    if (categoryId !== -1 && subCategoryId !== -1) return response.redirect(`/news?subCategoryId=${subCategoryId}`);

    // Pagination configs
    const page = isNaN(request.query.page) ? 1 : Math.max(1, parseInt(request.query.page));
    const NEWS_LIMIT = 10;
    const newsOffset = NEWS_LIMIT * (page - 1);

    let newsQueryConfigs = {
        attributes: ["id", "title", "abstract", "updatedAt", "tinyImagePath", "isPremium", "isDraft"],
        include: [
            {
                model: models.SubCategory,
                attributes: ["id", "name"],
            }
        ],
        where: { isDraft: false },
        order: [["updatedAt", "DESC"]],
        limit: NEWS_LIMIT,
        offset: newsOffset,
    };

    if (tagId !== -1) newsQueryConfigs.include[1].where = { id: tagId };
    else if (categoryId !== -1) newsQueryConfigs.include[0].where = { categoryId };
    else if (subCategoryId !== -1) {
        newsQueryConfigs.where.categoryId = subCategoryId;

        // Query current category
        const currentCategory = await models.Category.findOne({
            attributes: ["id"],
            include: [
                {
                    model: models.SubCategory,
                    where: { id: subCategoryId },
                },
            ],
        });
        categoryId = currentCategory.id;
    }

    // If user is premium, show premium news and sort to bring premium news on top
    if (userHelper.isPremium(request.user)) {
        newsQueryConfigs.order = [
            ["isPremium", "DESC"],
            ["updatedAt", "DESC"],
        ];
    }

    const { rows, count } = await models.News.findAndCountAll(newsQueryConfigs);

    const colors = ["#E98733", "#CA335C", "#70AFBE", "#7D618F", "#0CA9A8"];
    let colorIndex = 0;

    for (let i = 0; i < rows.length; i++) {
        rows[i].updatedAtString = new Date(rows[i].updatedAt).toLocaleString("vi-VN");
        rows[i].Tags = await queryTags(rows[i].id);
        rows[i].Tags = rows[i].Tags.slice(0, 3);
        let shortAbstract = rows[i].abstract.slice(0, 100);
        if (rows[i].abstract.length > 100) shortAbstract += "...";
        rows[i].shortAbstract = shortAbstract;
        rows[i].categoryColor = colors[colorIndex++ % colors.length];
    }
    response.locals.news = rows;

    // Comments pagination
    response.locals.pagination = {
        page: page,
        limit: NEWS_LIMIT,
        totalRows: count,
        queryParams: request.query,
    };

    // Query categories
    const categories = await models.Category.findAll({
        attributes: ["id", "name"],
    });
    categories.forEach((category) => (category.isActive = category.id == categoryId));
    response.locals.categories = categories;

    // Query sub categories if needed
    if (categoryId !== -1) {
        const subCategories = await models.SubCategory.findAll({
            attributes: ["id", "name"],
            where: { categoryId },
        });
        subCategories.forEach((category) => (category.isActive = category.id == subCategoryId));
        response.locals.subCategories = subCategories;
        response.locals.activeCategory = categoryId;
    }

    // Query tags
    const tags = await models.Tag.findAll({ attributes: ["id", "name"] });
    tags.forEach((tag) => (tag.isActive = tag.id === tagId));
    response.locals.tags = tags;

    response.render("user-news-list");
};

controller.showNewsDetails = async (request, response, next) => {
    // Start a sequelize transaction
    const t = await models.sequelize.transaction();
    
    try {
        response.locals.isNewsPage = true;

        const newsId = isNaN(request.params.newsId) ? 1 : parseInt(request.params.newsId);
        const exportPdf = request.query.export;

        const news = await models.News.findOne({
            include: [{
                model: models.SubCategory,
                attributes: ['id', 'name']
            }, { 
                model: models.Writer,
                attributes: ['id', 'pseudonym']
            }, { 
                model: models.Tag,
                attributes: ['id', 'name']
            }],
            where: { id: newsId, isDraft: false },
            transaction: t,
        });

        // If news not found, pass to next controller
        if (!news) return next();

        // If news is premium but user is not logged in, require log in
        if (news.isPremium && !request.user) {
            request.flash('loginMessage', 'Đây là bài viết Premium, bạn cần đăng nhập tài khoản Premium để xem!');
            return response.redirect(`/auth/login?reqUrl=/news/${newsId}`);
        }

        // If news is premium and user is not premium, require buy premium account
        if (news.isPremium && !userHelper.isPremium(request.user)) {
            request.flash('errorMessage', 'Đây là bài viết Premium, bạn cần gia hạn tài khoản Premium để xem!');
            return response.redirect('/account/premium');
        }

        news.updatedAtString = new Date(news.updatedAt).toLocaleString("vi-VN");
        response.locals.pageTitle = news.title;
        response.locals.news = news;

        if (exportPdf === "true" && news.isPremium) {
            // Check if user logged in
            if (!request.user) return response.redirect(`/auth/login?reqUrl=/news/${news.id}`);

            // Check if user has premium
            if (!userHelper.isPremium(request.user)) return response.redirect(`/news/${news.id}`);

            const pdf = await generatePdf(news);

            // Set the content type so the browser knows how to handle the response.
            response.setHeader("Content-Type", "application/pdf");
            response.setHeader("Content-Disposition", `attachment; filename=katnews-${news.id}.pdf`);

            // Serve this pdf to the browser directly.
            response.send(pdf);
        } else {
            // Query comments
            const currentCommentPage = isNaN(request.query.page) ? 1 : Math.max(1, parseInt(request.query.page));
            const COMMENTS_LIMIT = 5;
            const commentsOffset = COMMENTS_LIMIT * (currentCommentPage - 1);
            const { rows, count } = await models.Comment.findAndCountAll({
                attributes: ["id", "content", "updatedAt"],
                include: [
                    {
                        model: models.User,
                        attributes: ["fullName", "avatarPath"],
                    },
                ],
                where: { newsId },
                order: [["updatedAt", "DESC"]],
                limit: COMMENTS_LIMIT,
                offset: commentsOffset,
            });

            // Convert Comments updated Date object to string in expected format
            // and config default avatarPath if it's null
            rows.forEach((comment) => {
                comment.updatedAtString = new Date(comment.updatedAt).toLocaleString("vi-VN");
                if (!comment.User.avatarPath) comment.User.avatarPath = DEFAULT_USER_AVATAR_PATH;
            });
            response.locals.comments = rows;
            response.locals.commentCount = count;
            response.locals.hasComment = count > 0;

            // Comments pagination
            response.locals.pagination = {
                page: currentCommentPage,
                limit: COMMENTS_LIMIT,
                totalRows: count,
                queryParams: request.query,
            };

            // Query parent-category
            const category = await models.Category.findOne({
                attributes: ["id", "name"],
                include: [
                    {
                        model: models.SubCategory,
                        attributes: ["id"],
                        where: { id: news.categoryId },
                    },
                ],
            });

            // Query 5 posts in parent-category except this post
            const relatedNews = await models.News.findAll({
                attributes: ["id", "title", "updatedAt", "tinyImagePath"],
                include: [
                    {
                        model: models.SubCategory,
                        attributes: ["id", "name"],
                        where: { categoryId: category.id },
                    },
                ],
                where: { id: { [Sequelize.Op.ne]: news.id }, isDraft: false },
                limit: 5,
            });

            const colors = ["#E98733", "#CA335C", "#70AFBE", "#7D618F", "#0CA9A8"];
            let colorIndex = 0;

            relatedNews.forEach((news) => {
                news.updatedAtString = new Date(news.updatedAt).toLocaleString("vi-VN");
                news.categoryColor = colors[colorIndex % colors.length];
                colorIndex++;
            });

            response.locals.relatedNews = relatedNews;

            // Increase total and weekly views count
            news.totalViewsCount++;
            news.weeklyViewsCount++;
            await news.save({ transaction: t });

            // Commit the transaction
            await t.commit();

            response.render("user-news-details");
        }
    } catch (error) {
        await t.rollback();
        return next(error);
    }
};

controller.postComment = async (request, response) => {
    const content = request.body.content;
    const newsId = isNaN(request.params.newsId) ? -1 : parseInt(request.params.newsId);
    console.log("content", content);
    console.log("newsId", newsId);
    if (content && content.trim().length > 0 && newsId !== -1) {
        await models.Comment.create({
            content: content,
            userId: request.user.id,
            newsId: newsId,
        });
    }
    response.redirect(`/news/${newsId}`);
};

const generatePdf = async (news) => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.setContent(`
            <html>
            <body style="margin: 0px !important;">
                <main>
                    <div class="user-news-details__article-info">
                        <img class="user-news-details__main-image" src="${news.largeImagePath}" alt="${news.title}">
                        <div class="user-news-details-article-info__black-cover"></div>
                        <div class="user-news-details-article-info__overlay-content">
                            <div style="display: flex; width: 100%; justify-content: space-between">
                                <div style="display: flex; gap: 10px">
                                    <span class="user-news__premium-badge">Premium</span>
                                    <span  style="animation: none !important;"><a href="/news?subCategoryId=${news.categoryId}">${news.SubCategory.name}</a></span>
                                </div>
                            </div>
                            <h1 style="animation: none !important;">${news.title}</h1>
                            <h5 style="animation: none !important;">${news.abstract}</h5>
                            <p style="animation: none !important;">${news.Writer.pseudonym} - ${news.updatedAtString}</p>
                        </div>
                    </div>
                    <div class="user-news-details-content" style="padding: 0px 10% !important;">
                        <img class="user-news-details__content-image" src="${news.largeImagePath}" alt="${news.title}">
                        ${news.content}
                        <p>Youtube: <a href="${news.youtubePath}">${news.youtubePath}</a></p>
                    </div>
                </main>
            </body>
            </html>
    `);
    await page.addStyleTag({ url: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" });
    await page.addStyleTag({ path: "./public/css/style.css" });
    await page.addStyleTag({ url: "https://fonts.googleapis.com/css?family=Lexend" });
    await page.addStyleTag({ content: `body { font-family: 'Lexend' }` });
    await page.addScriptTag({ url: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" });
    await page.addScriptTag({ url: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" });
    await page.addScriptTag({ url: "https://kit.fontawesome.com/ea0c74c9ad.js" });

    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    return pdf;
};

controller.search = async (req, res) => {
    const keyword = String(req.query.keyword).split(" ").join(" & ");
    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));

    const limit = 10;
    const options = {
        include: [{ model: models.SubCategory, attributes: ["id", "name"] }],
        where: Sequelize.literal(`ts_rank("ts", to_tsquery('english', '${keyword}')) > 0.1`),
        order: [[Sequelize.literal(`ts_rank("ts", to_tsquery('english', '${keyword}'))`), "DESC"]],
        limit: limit,
        offset: limit * (page - 1),
    };

    const { rows, count } = await models.News.findAndCountAll(options);

    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query,
    };

    const colors = ["#E98733", "#CA335C", "#70AFBE", "#7D618F", "#0CA9A8"];
    let colorIndex = 0;

    for (let i = 0; i < rows.length; i++) {
        rows[i].Tags = await queryTags(rows[i].id);
        rows[i].shortAbstract = rows[i].abstract.slice(0, 200);
        if (rows[i].abstract.length > 200) rows[i].shortAbstract += "...";
        rows[i].updatedAtString = new Date(rows[i].updatedAt).toLocaleString("vi-VN");
        rows[i].categoryColor = colors[colorIndex++ % colors.length];
        console.log("tags", rows[i].Tags);
    }

    res.locals.pageTitle = `Tìm kiếm: ${String(req.query.keyword)}`;
    res.locals.keyword = String(req.query.keyword);
    res.locals.hasNews = rows.length > 0;

    res.locals.news = rows;
    res.render("user-news-search-result");
};

const queryTags = async (newsId) => {
    const tags = await models.Tag.findAll({
        attributes: ['id', 'name'],
        include: [{ model: models.News, where: { id: newsId } }]
    });
    return tags;
}

module.exports = controller;
