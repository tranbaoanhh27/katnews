'use strict';

const controller = {};

controller.showLoginPage = (request, response) => {
    response.render('user-sign-in');
}

controller.showSignUpPage = (request, response) => {}

controller.showForgotPasswordPage = (request, response) => {}

controller.showEnterOTPPage = (request, response) => {}

controller.showEnterNewPasswordPage = (request, response) => {}

module.exports = controller;