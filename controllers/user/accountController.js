'use strict';
const moment = require('moment')

const controller = {};

controller.middleware = (request, response, next) => {
    response.locals.authenticatedUser = {
        premiumRemainingDays: request.user.premiumExpiredTime ? 7 : 0,
        fullName: request.user.fullName,
        email: request.user.email,
        birthdate: moment(new Date(request.user.birthdate)).format('yyyy-MM-DD'),
    };
    next();
}

controller.show = (request, response) => {
    response.locals.accountPage = true;
    response.locals.pageTitle = 'Quản lí tài khoản';
    response.render('user-account');
}

controller.showChangePasswordPage = (request, response) => {
    response.locals.changePasswordPage = true;
    response.locals.pageTitle = 'Đổi mật khẩu';
    response.render('user-change-password');
}

controller.showPremiumPage = (request, response) => {
    response.locals.premiumPage = true;
    response.locals.pageTitle = 'Gia hạn Premium';
    response.render('user-account-premium');
}

module.exports = controller;