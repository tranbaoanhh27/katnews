'use strict';

const controller = {};

controller.middleware = (request, response, next) => {
    response.locals.authenticatedUser = {
        premiumRemainingDays: 4,
        fullName: "Tran Bao Anh",
        email: "tranbaoanh@gmail.com",
        birthdate: new Date("2002-04-27"),
    };
    next();
}

controller.show = (request, response) => {
    response.locals.accountPage = true;
    response.render('user-account');
}

controller.showChangePasswordPage = (request, response) => {
    response.locals.changePasswordPage = true;
    response.render('user-change-password');
}

controller.showPremiumPage = (request, response) => {
    response.locals.premiumPage = true;
    response.render('user-account-premium');
}

module.exports = controller;