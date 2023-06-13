'use strict';

const router = require('express').Router();
const controllers = require('../../controllers/admin/authContrller');
const { body, getErrorMessage } = require('../../controllers/validator');

router.get('/login', controllers.show);
router.post('/login',
    body('email').trim().notEmpty().withMessage('Email không được để trống!').isEmail().withMessage('Sai email!'),
    body('password').trim().notEmpty().withMessage('Mật khẩu không được để trống!'),
    (req, res, next) => {
        const message = getErrorMessage(req);
        if (message) {
            res.render('admin-login', { layout: 'admin-login', adminLoginMessage: message });
        }
        next();
    },
    controllers.login
);

router.get('/logout', controllers.logout);
router.use(controllers.adminIsLoggedIn);

module.exports = router;