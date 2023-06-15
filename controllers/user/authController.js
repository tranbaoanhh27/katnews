'use strict';
const passport = require('../passport');

const controller = {};

controller.showLoginPage = (request, response) => {
    response.render('user-sign-in', {
        loginMessage: request.flash('loginMessage'),
        reqUrl: request.query.reqUrl
    });
}

controller.login = (request, response, next) => {
    const saveAccount = request.body.keepSignedIn;
    console.log('saveAccount', saveAccount);
    const requestUrl = request.body.reqUrl
        ? request.body.reqUrl
        : "/account";
    passport.authenticate("user-local-login", (error, user) => {
        if (error) return next(error);
        if (!user) return response.redirect(`/auth/login?reqUrl=${requestUrl}`);
        request.logIn(user, (error) => {
            if (error) return next(error);
            const oneDayInMillis = 24 * 60 * 60 * 1000;
            request.session.cookie.maxAge = saveAccount ? oneDayInMillis : null;
            return response.redirect(requestUrl);
        });
    })(request, response, next);
};

controller.showSignUpPage = (request, response) => {
    response.render('user-sign-up', {
        registerMessage: request.flash('registerMessage')
    });
}

controller.register = (request, response, next) => {
    const reqUrl = request.body.reqUrl
        ? request.body.reqUrl
        : "/account";
    passport.authenticate("user-local-register", (error, user) => {
        if (error) return next(error);
        if (!user) return response.redirect(`/auth/register?reqUrl=${reqUrl}`);
        request.logIn(user, (error) => {
            if (error) return next(error);
            response.redirect(reqUrl);
        });
    })(request, response, next);
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

controller.logout = (request, response, next) => {
    request.logout((error) => {
        if (error) return next(error);
        response.redirect("/");
    });
}

controller.isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) return next();
    response.redirect(`/auth/login?reqUrl=${request.originalUrl}`);
};

module.exports = controller;