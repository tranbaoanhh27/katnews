'use strict';

const controllers = {};
const models = require('../../models');

controllers.show = async (req, res) => {
    try {
        let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
        let options = {
            attributes: ['id', 'name'],
            order: [['id']],
            include: [
                {
                    model: models.News,
                }
            ],
            group: ['Tag.id'],
        };
        const limit = 10;
        options.limit = limit;
        options.offset = limit * (page - 1);
        let { rows } = await models.Tag.findAndCountAll(options);

        const count = await models.Tag.count();

        rows = rows.map(tag => ({
            id: tag.id,
            name: tag.name,
            postCount: tag.News.length,
        }));

        res.locals.pagination = {
            page: page,
            limit: limit,
            totalRows: count,
            queryParams: req.query
        };
        res.locals.tags = rows;
        res.render('admin-tag', { layout: 'admin-layout', inTag: "#0d6efd", type_name: 'tag' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách các tag.' });
    }
};


controllers.add = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = await models.Tag.create({ name });
        res.status(201).json(newTag);

    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo tag mới.' });
    }
}

controllers.update = async (req, res) => {
    try {
        const { id, name } = req.body;
        const tag = await models.Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'không tìm thấy tag.' });
        }
        tag.name = name;
        await tag.save();
        res.status(200).json({ message: 'Sửa tag thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa tag.' });
    }
}

controllers.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const tag = await models.Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: 'không tìm thấy tag.' });
        }
        await tag.destroy();
        res.status(200).json({ message: 'Xóa tag thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa tag.' });
    }
}


module.exports = controllers;