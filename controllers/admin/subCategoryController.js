'use strict';

const models = require('../../models');
const controllers = {};

controllers.show = async (req, res, next) => {
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

        let rows = await models.SubCategory.findAll(options);
        let count = await models.SubCategory.count({ where: { categoryId: id } });

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
        // res.status(500);
        next(error);
    }
};

controllers.add = async (req, res, next) => {
    try {
        const { name, categoryId } = req.body;
        const newCategory = await models.SubCategory.create({ name, categoryId });

        return res.status(201).json(newCategory);
    } catch (error) {
        // res.status(500);
        next(error);
    }
}


controllers.update = async (req, res, next) => {
    try {
        const { id, name } = req.body;
        const subCategory = await models.SubCategory.findByPk(id);
        if (!subCategory) {
            // return res.status(404);
            next();
        }
        subCategory.name = name;
        await subCategory.save();
        res.status(200).json({ message: 'Sửa subCategory thành công.' });
    } catch (error) {
        // res.status(500).json({ error: 'Lỗi khi xóa subCategory.' });
        next(error);
    }
}

controllers.delete = async (req, res, next) => {
    try {
        const { id } = req.body;
        // if (countNews != 0) {
        //     let news = await models.News.findAll({
        //         where: { categoryId: id }
        //     });

        //     for (const item of news) {
        //         await item.destroy();
        //     }
        // }

        const subCategory = await models.SubCategory.findByPk(id);
        if (!subCategory) {
            // return res.status(404).json({ error: 'không tìm thấy subCategory.' });
            next();
        }
        await subCategory.destroy({ cascade: true });
        res.status(200).json({ message: 'Xóa subCategory thành công.' });
    } catch (error) {
        // res.status(500).json({ error: 'Lỗi khi xóa subCategory.' });
        next(error);
    }
}

module.exports = controllers;