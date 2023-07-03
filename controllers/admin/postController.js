'use strict';

const controller = {};
const models = require('../../models');

controller.show = async (req, res) => {
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
        res.status(500);
    }
}

controller.update = async (req, res) => {
    try {
        const { id, isDraft } = req.body;
        const post = await models.News.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'không tìm thấy post.' });
        }
        post.isDraft = isDraft;
        await post.save();
        res.status(200).json({ message: 'Chuyển trạng thái bài viết thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa post.' });
    }
}

controller.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const post = await models.News.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'không tìm thấy post.' });
        }
        await post.destroy({ cascade: true });
        res.status(200).json({ message: 'Xóa post thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa post.' });
    }
}

module.exports = controller;