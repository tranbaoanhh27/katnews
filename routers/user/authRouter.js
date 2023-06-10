'use strict';

const router = require('express').Router();
const controller = require('../../controllers/user/authController');

router.get('/login', controller.showLoginPage);
router.get('/sign-up', controller.showSignUpPage);
router.get('/forgot-password', controller.showForgotPasswordPage);

module.exports = router;