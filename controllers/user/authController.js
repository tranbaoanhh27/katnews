'use strict';

const controller = {};

controller.showLoginPage = (request, response) => {
    response.render('user-sign-in');
}

controller.showSignUpPage = (request, response) => {
    response.render('user-sign-up');
}

controller.showForgotPasswordPage = (request, response) => {
    response.render('user-forgot-password');
}

controller.showEnterOTPPage = (request, response) => {
    const email = request.body.email;
    response.locals.email = email;
    response.render('user-enter-otp');
}

controller.showEnterNewPasswordPage = (request, response) => {
    const otp = request.body.otp;
    response.render('user-enter-new-password');
}

controller.resetPassword = (request, response) => {
    response.redirect('/auth/login');
}

controller.logout = (request, response) => {
    response.locals.isLoggedIn = false;
    response.redirect('/');
}

module.exports = controller;