'use strict';

const controller = {};
const models = require('../../models');
const braintreeHelper = require('../../controllers/braintree')

//subscriber
controller.showSubscriber = async (req, res) => {
    try {
        let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
        const limit = 10;
        let options = {
            attributes: ['id', 'fullName', 'email', 'premiumExpiredTime', 'avatarPath'],
            order: [['id']],
            limit: limit,
            offset: limit * (page - 1)
        }

        let { rows, count } = await models.User.findAndCountAll(options);

        res.locals.pagination = {
            page: page,
            limit: limit,
            totalRows: count,
            queryParams: req.query
        };

        const currentDate = new Date(); // lay ngay hien tai
        rows.map((user) => {
            if (user.premiumExpiredTime) {
                user.isExpired = user.premiumExpiredTime.getTime() < currentDate.getTime();
                let date = user.premiumExpiredTime;
                const year = date.getFullYear(); // Lấy năm
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng và đảm bảo có hai chữ số
                const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và đảm bảo có hai chữ số

                user.date = `${year}-${month}-${day}`; // Chuỗi định dạng ngày tháng
            }
            else {
                user.isExpired = true;
            }

        })

        res.locals.subscribers = rows;
        res.render('admin-subscriber', { layout: 'admin-layout', inSub: "#FFA600", inUser: "#0d6efd", type_name: 'user/subscriber-admin' });
    } catch (error) {
        res.status(500);
    }
}

controller.updateSubscribers = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'không tìm thấy user.' });
        }
        // tinh toan ngay het han moi
        const currentDate = new Date();
        const newExpirationDate = new Date(currentDate);
        newExpirationDate.setDate(newExpirationDate.getDate() + 7);

        // Cập nhật ngày hết hạn mới trong CSDL
        user.premiumExpiredTime = newExpirationDate;
        await user.save();
        res.status(200).json({ message: 'Sửa user thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi sửa user.' });
    }
}

controller.deleteSubscribers = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'không tìm thấy user.' });
        }
        braintreeHelper.deleteBraintreeVaultCustomer(user.braintreeCustomerId); // xoa customer tren he thong thanh toan
        await user.destroy({ cascade: true });
        res.status(200).json({ message: 'Xóa user thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa user.' });
    }
}

//writer
controller.showWriter = async (req, res) => {
    try {
        let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
        const limit = 10;
        let options = {
            attributes: ['id', 'fullName', 'email', 'pseudonym', 'avatarPath'],
            order: [['id']],
            limit: limit,
            offset: limit * (page - 1)
        }

        let { rows, count } = await models.Writer.findAndCountAll(options);

        res.locals.pagination = {
            page: page,
            limit: limit,
            totalRows: count,
            queryParams: req.query
        };

        res.locals.writers = rows;
        res.render('admin-writer', { layout: 'admin-layout', inWriter: "#FFA600", inUser: "#0d6efd", type_name: 'user/writer-admin' });
    } catch (error) {
        res.status(500);
    }
}

controller.deleteWriter = async (req, res) => {
    try {
        const { id } = req.body;
        const writer = await models.Writer.findByPk(id);
        if (!writer) {
            return res.status(404).json({ error: 'không tìm thấy writer.' });
        }
        await writer.destroy({ cascade: true });
        res.status(200).json({ message: 'Xóa writer thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa writer.' });
    }
}

controller.countNewsOfWriter = async (req, res) => {
    const { idWriter } = req.query;
    const countNews = await models.News.findAll({
        attributes: ['id'],
        where: { writerId: idWriter }
    });
    res.status(200).json({ count: countNews.length });
}

// editor
controller.showEditor = async (req, res) => {
    try {
        let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page));
        const limit = 10;
        let options = {
            attributes: ['id', 'fullName', 'email', 'avatarPath'],
            order: [['id']],
            include: {
                model: models.Category,
                attributes: ['id', 'name', 'editorId'],
            },
            limit: limit,
            offset: limit * (page - 1)
        }

        let { rows, count } = await models.Editor.findAndCountAll(options);
        let categories = await models.Category.findAll();

        res.locals.pagination = {
            page: page,
            limit: limit,
            totalRows: count,
            queryParams: req.query
        };
        res.locals.editors = rows;
        res.locals.categories = categories;
        res.render('admin-editor', { layout: 'admin-layout', inEditor: "#FFA600", inUser: "#0d6efd", type_name: 'user/editor-admin' });
    } catch (error) {
        res.status(500);
    }
}

controller.deleteEditor = async (req, res) => {
    try {
        const { id } = req.body;
        const editor = await models.Editor.findByPk(id);
        if (!editor) {
            return res.status(404).json({ error: 'không tìm thấy editor.' });
        }
        await editor.destroy();
        res.status(200).json({ message: 'Xóa editor thành công.' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa editor.' });
    }
}

module.exports = controller;