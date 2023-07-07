'use strict';

const controllers = {};
const models = require('../../models');

controllers.show = async (req, res, next) => {
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
        // res.status(500).json({ error: 'Lỗi khi lấy danh sách các tag.' });
        next(error);
    }
};


controllers.add = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newTag = await models.Tag.create({ name });
        res.status(201).json(newTag);

    } catch (error) {
        // res.status(500).json({ error: 'Lỗi khi tạo tag mới.' });
        next(error);
    }
}

controllers.update = async (req, res, next) => {
    try {
        const { id, name } = req.body;
        const tag = await models.Tag.findByPk(id);
        if (!tag) {
            // return res.status(404).json({ error: 'không tìm thấy tag.' });
            next();
        }
        tag.name = name;
        await tag.save();
        res.status(200).json({ message: 'Sửa tag thành công.' });
    } catch (error) {
        // res.status(500).json({ error: 'Lỗi khi xóa tag.' });
        next(error);
    }
}

controllers.delete = async (req, res, next) => {
    try {
        const { id } = req.body;
        const tag = await models.Tag.findByPk(id);
        if (!tag) {
            // return res.status(404).json({ error: 'không tìm thấy tag.' });
            next();
        }
        await tag.destroy();
        res.status(200).json({ message: 'Xóa tag thành công.' });
    } catch (error) {
        // res.status(500).json({ error: 'Lỗi khi xóa tag.' });
        next(error);
    }
}


module.exports = controllers;