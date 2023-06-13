'use strict';
const passport = require('./passport');
const controller = {};

controller.show = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('admin-login', { layout: 'admin-login', adminLoginMessage: req.flash('adminLoginMessage'), reqUrl: req.query.reqUrl });
}

controller.login = (req, res, next) => {
    let keepSignedIn = req.body.keepSignedInAdmin;
    let reqUrl = req.body.resUrl ? req.body.reqUrl : '/';
    passport.authenticate("admin-local-login", (error, admin) => {
        if (error) return next(error);
        if (!admin) return res.redirect(`/auth/login?reqUrl=${req.originalUrl}`);
        req.logIn(admin, (error) => {
            if (error) return next(error);
            const oneDayInMillis = 24 * 60 * 60 * 1000;
            req.session.cookie.maxAge = keepSignedIn ? oneDayInMillis : null;
            return res.redirect(reqUrl);
        });
    })(req, res, next);
}

controller.logout = (request, response, next) => {
    request.logout((error) => {
        if (error) return next(error);
        response.redirect("/auth/login");
    });
}

controller.adminIsLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(`/auth/login?reqUrl=${req.originalUrl}`);
};

module.exports = controller;