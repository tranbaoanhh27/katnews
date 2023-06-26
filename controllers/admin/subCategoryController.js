'use strict';

const models = require('../../models');
const controllers = {};

controllers.show = async (req, res) => {
    try {
        let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
        let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
        let nameCategory = req.query.name;
        const limit = 10;
        let options = {
            attributes: ['id', 'name'],
            order: [['id']],
            where: { categoryId: id },
            include: [{
                model: models.News,
                attributes: ['id']
            }],
            limit: limit,
            offset: limit * (page - 1)
        }

        let { rows, count } = await models.SubCategory.findAndCountAll(options);

        res.locals.pagination = {
            page: page,
            limit: limit,
            totalRows: count,
            queryParams: req.query
        };

        rows.map((item) => {
            item.countNews = item.News.length;
        })
        res.locals.subCategories = rows;
        res.render('admin-subCategory', { layout: 'admin-layout', inCategory: "#0d6efd", type_name: `category/${id}?name=${nameCategory}`, nameCategory, catId: id });
    } catch (error) {
        res.status(500);
    }
};

controllers.add = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const newCategory = await models.SubCategory.create({ name, categoryId });

        return res.status(201).json(newCategory);
    } catch (error) {
        res.status(500);
    }
}


controllers.update = async (req, res) => {
    try {
        const { id, name } = req.body;
        const subCategory = await models.SubCategory.findByPk(id);
        if (!subCategory) {
            return res.status(404);
        }
        subCategory.name = name;
        await subCategory.save();
        res.status(200).json({ message: 'Sửa subCategory thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa subCategory.' });
    }
}

controllers.delete = async (req, res) => {
    try {
        const { id, countNews } = req.body;
        if (countNews != 0) {
            let news = await models.News.findAll({
                where: { categoryId: id }
            });

            for (const item of news) {
                await item.destroy();
            }
        }

        const subCategory = await models.SubCategory.findByPk(id);
        if (!subCategory) {
            return res.status(404).json({ error: 'không tìm thấy subCategory.' });
        }
        await subCategory.destroy();
        res.status(200).json({ message: 'Xóa subCategory thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa subCategory.' });
    }
}

module.exports = controllers;