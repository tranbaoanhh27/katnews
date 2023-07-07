'use strict';

const controller = {};
const models = require('../../models');
const Sequelize = require("sequelize");
const userHelper = require('../user/userHelper');
const DEFAULT_USER_AVATAR_PATH = "/images/default-user-icon.jpg";

controller.show = async (req, res, next) => {
    try {
        let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
        const limit = 10;
        let options = {
            attributes: ['id', 'title', 'tinyImagePath', 'isDraft'],
            order: [['id']],

            include: [{
                model: models.Writer,
                attributes: ['id', 'fullName']
            },
            {
                model: models.SubCategory,
                attributes: ['id', 'name']
            }],
            limit: limit,
            offset: limit * (page - 1)
        }

        let { rows, count } = await models.News.findAndCountAll(options);

        res.locals.pagination = {
            page: page,
            limit: limit,
            totalRows: count,
            queryParams: req.query
        };

        res.locals.posts = rows;
        res.render('admin-post', { layout: 'admin-layout', inPost: "#0d6efd", type_name: 'post' });
    } catch (error) {
        next(error);
    }
}

controller.update = async (req, res, next) => {
    try {
        const { id, isDraft } = req.body;
        const post = await models.News.findByPk(id);
        if (!post) {
            // return res.status(404).json({ error: 'không tìm thấy post.' });
            next();
        }
        post.isDraft = isDraft;
        await post.save();
        res.status(200).json({ message: 'Chuyển trạng thái bài viết thành công.' });
    } catch (error) {
        // res.status(500).json({ error: 'Lỗi khi xóa post.' });
        next(error);
    }
}

controller.delete = async (req, res, next) => {
    try {
        const { id } = req.body;
        const post = await models.News.findByPk(id);
        if (!post) {
            // return res.status(404).json({ error: 'không tìm thấy post.' });
            next();
        }
        await post.destroy({ cascade: true });
        res.status(200).json({ message: 'Xóa post thành công.' });
    } catch (error) {
        // res.status(500).json({ error: 'Lỗi khi xóa post.' });
        next(error);
    }
}

controller.showPostDetails = async (request, response, next) => {

    try {
        response.locals.isNewsPage = true;

        const newsId = isNaN(request.params.newsId) ? 1 : parseInt(request.params.newsId);

        const news = await models.News.findOne({
            include: [{ model: models.SubCategory }, { model: models.Writer }, { model: models.Tag }, { model: models.Comment }],
            where: { id: newsId },
        });

        // If news not found, pass to next controller
        if (!news) return next();

        news.updatedAtString = new Date(news.updatedAt).toLocaleString("vi-VN");
        response.locals.pageTitle = news.title;
        response.locals.news = news;
        response.locals.commentCount = news.Comments.length;
        response.locals.hasComment = news.Comments.length > 0;


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

        // Comments pagination
        response.locals.pagination = {
            page: currentCommentPage,
            limit: COMMENTS_LIMIT,
            totalRows: count,
            queryParams: request.query,
        };
        response.render("admin-new-details", { layout: 'admin-layout', inPost: "#0d6efd", type_name: `post/${newsId}#` });

    } catch (error) {
        return next(error);
    }
};

controller.deleteComment = async (req, res, next) => {
    try {
        const { id } = req.body;
        const post = await models.Comment.findByPk(id);
        if (!post) {
            // return res.status(404).json({ error: 'không tìm thấy post.' });
            next();
        }
        await post.destroy({ cascade: true });
        res.status(200).json({ message: 'Xóa post thành công.' });
    } catch (error) {
        // res.status(500).json({ error: 'Lỗi khi xóa post.' });
        next(error);
    }
}


module.exports = controller;