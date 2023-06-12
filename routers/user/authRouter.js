'use strict';

const router = require('express').Router();
const controller = require('../../controllers/user/authController');
const { body, getErrorMessage } = require('../../controllers/validator');

router.get('/login', controller.showLoginPage);
router.post('/login',
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid email address!'),
    body('password').trim().notEmpty().withMessage('Password is required!'),
    (request, response, next) => {
        const message = getErrorMessage(request);
        if (message) return response.render('user-sign-in', { loginMessage: message });
        next();
    },
    controller.login,
)

router.get('/logout', controller.logout)
router.get('/register', controller.showSignUpPage);
router.get('/forgot-password', controller.showForgotPasswordPage);
router.post('/forgot-password', controller.showEnterOTPPage);
router.post('/new-password', controller.showEnterNewPasswordPage);
router.post('/reset-password', controller.resetPassword);

router.use(controller.isLoggedIn);

module.exports = router;