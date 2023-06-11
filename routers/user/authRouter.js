'use strict';

const router = require('express').Router();
const controller = require('../../controllers/user/authController');

router.get('/login', controller.showLoginPage);
router.get('/logout', controller.logout)
router.get('/register', controller.showSignUpPage);
router.get('/forgot-password', controller.showForgotPasswordPage);
router.post('/forgot-password', controller.showEnterOTPPage);
router.post('/new-password', controller.showEnterNewPasswordPage);
router.post('/reset-password', controller.resetPassword);

module.exports = router;