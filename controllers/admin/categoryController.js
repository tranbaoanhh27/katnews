'use strict';

const models = require('../../models');
const controllers = {};

controllers.show = async (req, res) => {
    try {
        let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
        const limit = 10;
        let options = {
            attribute: ['id', 'name'],
            order: [['id']],
            limmit: limit,
            offset: limit * (page - 1)
        }

        let { rows, count } = await models.Category.findAndCountAll(options);

        res.locals.pagination = {
            page: page,
            limit: limit,
            totalRows: count,
            queryParams: req.query
        };

        res.locals.categories = rows;
        res.render('admin-category', { layout: 'admin-layout', inCategory: "#0d6efd", type_name: 'category' });
    } catch (error) {
        res.status(500);
    }
};


controllers.add = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await models.Category.create({ name });
        res.status(201).json(newCategory);

    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo danh mục mới.' });
    }
}

controllers.update = async (req, res) => {
    try {
        const { id, name } = req.body;
        const Category = await models.Category.findByPk(id);
        if (!Category) {
            return res.status(404).json({ error: 'không tìm thấy doanh mục.' });
        }
        Category.name = name;
        await Category.save();
        res.status(200).json({ message: 'Sửa danh mục thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa doanh mục.' });
    }
}

controllers.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const Category = await models.Category.findByPk(id);
        if (!Category) {
            return res.status(404).json({ error: 'không tìm thấy Category.' });
        }
        await Category.destroy();
        res.status(200).json({ message: 'Xóa Category thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa Category.' });
    }
}

// controllers.showSubCategory = async (req, res) => {
//     try {
//         let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
//         let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
//         let nameCategory = req.query.name;
//         const limit = 10;
//         let options = {
//             attribute: ['id', 'name'],
//             order: [['id']],
//             where: { categoryId: id },
//             limmit: limit,
//             offset: limit * (page - 1)
//         }

//         let { rows, count } = await models.SubCategory.findAndCountAll(options);

//         res.locals.pagination = {
//             page: page,
//             limit: limit,
//             totalRows: count,
//             queryParams: req.query
//         };

//         res.locals.subCategories = rows;
//         res.render('admin-subCategory', { layout: 'admin-layout', inCategory: "#0d6efd", type_name: `category/${id}?name=${nameCategory}`, nameCategory });
//     } catch (error) {
//         res.status(500);
//     }
// };


module.exports = controllers;