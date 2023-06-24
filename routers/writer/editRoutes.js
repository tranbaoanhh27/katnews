'use strict'
const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const router = express.Router();
const controllers = require('../../controllers/writer/editController');
const authController = require('../../controllers/writer/authController');
const {body, getErrorMessage} = require('../../controllers/validator');
const models = require('../../models');
const bcrypt = require('bcrypt');

router.post('/news',authController.isLoggedIn, upload.array('image', 2), controllers.createNews);
router.get('/',authController.isLoggedIn, controllers.showEditPage);

router.post('/password',
    authController.isLoggedIn, 
    body('oldPassword').trim().notEmpty().withMessage("Cần phải nhập mật khẩu cũ"),
    body('oldPassword').custom(async (oldPassword, {req}) => {
        const writerId = req.user;
        const writer = await models.Writer.findOne({where: {id: writerId}});
        if (!bcrypt.compareSync(oldPassword, writer.password)){
            throw new Error("Không khớp với mật khẩu cũ")
        }
        return true;
    }),
    body('newPassword').trim().notEmpty().withMessage("Cần phải nhập mật khẩu mới"),
    body('newPassword').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("Mật khẩu phải chứa ít nhất 1 chữ số, và 1 chữ hoa, và chữ thường, và có ít nhất 8 ký tự"),
    body('confirmPassword').custom((confirmPassword, {req}) => {
        if (confirmPassword !== req.body.newPassword){
            throw new Error("Mật khẩu không khớp");
        }
        return true;
    }),
    controllers.changePassword);

router.get('/news/:id', authController.isLoggedIn, controllers.editNews);

router.post('/news/:id', authController.isLoggedIn, upload.array('image', 2), controllers.updateNews);
module.exports = router;