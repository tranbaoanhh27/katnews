'use strict';

const router = require('express').Router();
const multer = require('multer');
const controller = require('../../controllers/user/accountController');
const authController = require('../../controllers/user/authController');
const { body, getErrorMessage } = require('../../controllers/validator');

const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

// Middleware require user logged-in
router.use(authController.isLoggedIn);

router.get('/', controller.middleware, controller.show);
router.post('/',
    body('email').trim().notEmpty().withMessage('Email không được để trống!').isEmail().withMessage('Email không đúng!'),
    body('fullName').trim().notEmpty().withMessage('Họ và tên không được để trống!'),
    (request, response, next) => {
        const message = getErrorMessage(request);
        if (message) {
            response.locals.errorMessage = message;
            controller.middleware,
            controller.show
        }
        next();
    },
    controller.updateAccountInfo,
    controller.middleware,
    controller.show
);
router.post('/uploadAvatarImage', multerUpload.single('avatar'), controller.updateAvatar);
router.get('/change-password', controller.middleware, controller.showChangePasswordPage);
router.get('/premium', controller.middleware, controller.showPremiumPage);

module.exports = router;