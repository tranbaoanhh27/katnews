'use strict';

const models = require('../../models');
const Sequelize = require('sequelize');

const DEFAULT_USER_AVATAR_PATH = '/images/default-user-icon.jpg';

const controller = {};

controller.showNewsList = (request, response) => {
    response.locals.isNewsPage = true;
    response.locals.pageTitle = 'Tin tức';
    response.render('user-news-list');
}

controller.showNewsDetails = async (request, response) => {
    response.locals.isNewsPage = true;

    const newsId = isNaN(request.params.newsId) ? 1 : parseInt(request.params.newsId);

    const news = await models.News.findOne({
        include: [
            { model: models.SubCategory },
            { model: models.Writer },
            { model: models.Tag },
            { model: models.Comment }
        ],
        where: { id: newsId }
    });
    
    if (news) {
        news.updatedAtString = (new Date(news.updatedAt)).toLocaleString('vi-VN');
        response.locals.pageTitle = news.title;
        response.locals.news = news;
        response.locals.commentCount = news.Comments.length;

        // Query comments
        const currentCommentPage = isNaN(request.query.page) ? 1 : Math.max(1, parseInt(request.query.page));
        const COMMENTS_LIMIT = 5;
        const commentsOffset = COMMENTS_LIMIT * (currentCommentPage - 1);
        const { rows, count } = await models.Comment.findAndCountAll({
            attributes: ['id', 'content', 'updatedAt'],
            include: [{
                model: models.User,
                attributes: ['fullName', 'avatarPath']
            }],
            where: { newsId },
            order: [['updatedAt', 'DESC']],
            limit: COMMENTS_LIMIT,
            offset: commentsOffset
        });
        
        // Convert Comments updated Date object to string in expected format
        // and config default avatarPath if it's null
        rows.forEach(comment => {
            comment.updatedAtString = (new Date(comment.updatedAt)).toLocaleString('vi-VN');
            if (!comment.User.avatarPath) comment.User.avatarPath = DEFAULT_USER_AVATAR_PATH;
        });
        response.locals.comments = rows;

        // Comments pagination
        response.locals.pagination = {
            page: currentCommentPage,
            limit: COMMENTS_LIMIT,
            totalRows: count,
            queryParams: request.query
        }

        // Query parent-category
        const category = await models.Category.findOne({
            attributes: ['id', 'name'],
            include: [{
                model: models.SubCategory,
                where: { id: news.categoryId }
            }],
        });

        // Query 5 posts in parent-category except this post
        const relatedNews = await models.News.findAll({
            attributes: ['id', 'title', 'updatedAt', 'tinyImagePath'],
            include: [{
                model: models.SubCategory,
                attributes: ['id', 'name'],
                include: [{
                    model: models.Category,
                    attributes: ['id'],
                    where: { id: category.id }
                }]
            }],
            where: { id: { [Sequelize.Op.ne]: news.id }},
            limit: 5,
        });

        const colors = ["#E98733", "#CA335C", "#70AFBE", "#7D618F", "#0CA9A8"];
        let colorIndex = 0;

        relatedNews.forEach(news => {
            news.updatedAtString = (new Date(news.updatedAt)).toLocaleString('vi-VN');
            news.categoryColor = colors[colorIndex % colors.length];
            colorIndex++;
        })

        response.locals.relatedNews = relatedNews;

        response.render('user-news-details');
    } else
        response.render('error', { message: '404 - Page not found!' });
}

controller.postComment = async (request, response) => {
    const content = request.body.content;
    const newsId = isNaN(request.params.newsId) ? -1 : parseInt(request.params.newsId);
    console.log('content', content);
    console.log('newsId', newsId);
    if (content && content.trim().length > 0 && newsId !== -1) {
        await models.Comment.create({
            content: content,
            userId: request.user.id,
            newsId: newsId
        });
    }
    response.redirect(`/news/${newsId}`);
}

module.exports = controller;