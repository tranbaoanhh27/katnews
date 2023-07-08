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

router.get('/', controller.show);
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
    controller.updateAccountInfo
);
router.post('/uploadAvatarImage', multerUpload.single('avatar'), controller.updateAvatar);

router.get('/change-password', controller.showChangePasswordPage);

router.post('/change-password',
    body('currentPassword').notEmpty().withMessage('Vui lòng nhập mật khẩu hiện tại!'),
    body('newPassword').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Mật khẩu phải có ít nhất 8 kí tự, trong đó phải có ít nhất một kí tự số, một kí tự in hoa, và một kí tự in thường!'),
    body('newPasswordConfirm').custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.newPassword) throw new Error('Mật khẩu không khớp!');
        return true;
    }),
    (request, response, next) => {
        const message = getErrorMessage(request);
        if (message) return response.render('user-change-password', { errorMessage: message });
        next();
    },
    controller.updateAccountPassword,
    controller.showChangePasswordPage
)

router.get('/premium', controller.showPremiumPage);

router.post('/premium', controller.beginPaymentTransaction)

module.exports = router;