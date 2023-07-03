'use strict'
const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
const controllers = require('../../controllers/writer/editController');
const authController = require('../../controllers/writer/authController');
const { body, getErrorMessage } = require('../../controllers/validator');
const models = require('../../models');
const bcrypt = require('bcrypt');

router.post('/news',
    authController.isLoggedIn,
    upload.array('image', 2),
    body('title').trim().notEmpty().withMessage("Cần phải nhập tiêu đề cho bài báo"),
    body('tag').trim().notEmpty().withMessage('Cần phải nhập tag cho bài báo'),
    body('categoryId').notEmpty().withMessage('Cần phải chọn chuyên mục cho bài báo'),
    body('youtubePath').trim().notEmpty().withMessage('Cần phải nhập link youtube cho bài báo'),
    body('abstract').trim().notEmpty().withMessage('Cần phải nhập nội dung tóm tắt cho bài báo'),
    body('content').trim().notEmpty().withMessage('Cần phải nhập nội dung cho bài báo'),
    body('youtubePath').custom(
        (youtubePath, { req }) => {
            if (youtubePath.length > 0 && !isValidUrl(linkYoutube)) {
                throw new Error("Link youtube không hợp lệ");
            }
            return true;
        }
    ), (req, res, next) => {
        const message = getErrorMessage(req);
        if (message) {
            return res.render('writer-edit', { createFail: message, layout: 'writer-news-layout' });
        }
        next();
    },
    controllers.createNews);
router.get('/', authController.isLoggedIn, controllers.showEditPage);

router.post('/password',
    authController.isLoggedIn,
    body('oldPassword').trim().notEmpty().withMessage("Cần phải nhập mật khẩu cũ"),
    body('newPassword').trim().notEmpty().withMessage("Cần phải nhập mật khẩu mới"),
    body('newPassword').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("Mật khẩu phải chứa ít nhất 1 chữ số, và 1 chữ hoa, và chữ thường, và có ít nhất 8 ký tự"),
    body('confirmPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.newPassword) {
            throw new Error("Mật khẩu không khớp");
        }
        return true;
    }),
    (req, res, next) => {
        let message = getErrorMessage(req);
        console.log('message', message);
        if (message) {
            return res.render('writer-login', { messageWriterAuth: message, layout: 'writer-login-layout' });
        }
        next();
    },
    controllers.changePassword);

router.get('/news/:id', authController.isLoggedIn, controllers.showUpdateNews);

router.post('/news/:id',
    authController.isLoggedIn,
    upload.array('image', 2),
    body('title').trim().notEmpty().withMessage("Cần phải nhập tiêu đề cho bài báo"),
    body('tag').trim().notEmpty().withMessage('Cần phải nhập tag cho bài báo'),
    body('categoryId').notEmpty().withMessage('Cần phải chọn chuyên mục cho bài báo'),
    body('youtubePath').trim().notEmpty().withMessage('Cần phải nhập link youtube cho bài báo'),
    body('abstract').trim().notEmpty().withMessage('Cần phải nhập nội dung tóm tắt cho bài báo'),
    body('content').trim().notEmpty().withMessage('Cần phải nhập nội dung cho bài báo'),
    body('youtubePath').custom(
        (youtubePath, { req }) => {
            // if (youtubePath && youtubePath.length > 0 && !isValidUrl(youtubePath)) {
            //     throw new Error("Link youtube không hợp lệ");
            // }
            return true;
        }
    ), (req, res, next) => {
        const message = getErrorMessage(req);
        if (message) {
            req.flash('createFail', message);
            return res.redirect(`/edit/news/${req.params.id}`)
        }
        next();
    },
    controllers.updateNews);
module.exports = router;

const isValidUrl = urlString => {
    try {
        return Boolean(new URL(urlString));
    }
    catch (e) {
        return false;
    }
}
