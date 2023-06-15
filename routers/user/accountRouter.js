'use strict';

const router = require('express').Router();
const controller = require('../../controllers/user/accountController');
const authController = require('../../controllers/user/authController');

// Middleware require user logged-in
router.use(authController.isLoggedIn);

router.get('/', controller.middleware, controller.show);
router.get('/change-password', controller.middleware, controller.showChangePasswordPage);
router.get('/premium', controller.middleware, controller.showPremiumPage);

module.exports = router;