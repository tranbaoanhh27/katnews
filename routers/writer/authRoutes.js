'use strict'

const express = require('express');
const router = express.Router();
const passport = require('../../controllers/passport')
const controllers = require('../../controllers/writer/authController');
const {body, getErrorMessage} = require('../../controllers/validator');

router.post('/login',
    body('email').trim().notEmpty().withMessage("Email cần được điền").isEmail().withMessage("Email không hợp lệ"),
    body('password').trim().notEmpty().withMessage("Password cần được nhập"),
    (req, res, next) => {
        let message = getErrorMessage(req);
        console.log('message', message);
        if (message) {
            return res.render('writer-login',{messageWriterAuth: message, layout: 'writer-login-layout'});
        }
        next();
    },  passport.authenticate('writer-local-login', {
    successRedirect: '/listNews',
    failureRedirect: '/'
}))
router.post('/signup',
    body('email').trim().notEmpty().withMessage("Email cần được nhập").isEmail().withMessage("Email không hợp lệ"),
    body('fullName').trim().notEmpty().withMessage("Tên đăng nhập cần được nhập"),
    body('password').trim().notEmpty().withMessage("Password cần được nhập"),
    body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("Mật khẩu phải chứa ít nhất 1 chữ số, và 1 chữ hoa, và chữ thường, và có ít nhất 8 ký tự"),
    body('confirmPassword').custom((confirmPassword, {req})=>{
        if(confirmPassword != req.body.password){
            throw new Error("Password không khớp");
        }
        return true;
    }),
    (req, res, next) => {
        let message = getErrorMessage(req);
        if (message) {
            return res.render('writer-register', {layout: 'writer-login-layout', messageWriterSignup: message});
        }
        next();
    },
    controllers.signup);
router.get('/logout', controllers.isLoggedIn, controllers.logout);
module.exports = router;