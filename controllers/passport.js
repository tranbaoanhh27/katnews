'use strict';

// Import libraries
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const models = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (request, id, done) => {
    try {
        if (request.session.subdomains.includes('admin')) {
            const admin = await models.Administrator.findOne({
                where: { id }
            });
            done(null, admin);

        } else if (request.session.subdomains.includes('editor')) {
            // TODO: query logged-in editor and return
            done(error, null);

        } else if (request.session.subdomains.includes('writer')) {
            // TODO: query logged-in writer and return
            const user = request.session.passport.user;
            done(null, user);

        } else {
            const user = await models.User.findOne({
                attributes: ['id', 'fullName', 'birthdate', 'email', 'avatarPath', 'premiumExpiredTime'],
                where: { id }
            });
            done(null, user);
        }
    } catch (error) {
        done(error, null);
    }
});

passport.use('user-local-login', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (request, email, password, done) => {
    if (email) email = email.trim().toLowerCase();
    try {
        // If user did not login
        if (!request.user) {

            // Try query the user from database to check email existence
            const user = await models.User.findOne({ where: { email } });

            // If user doesn't exist, return error message
            if (!user)
                return done(null, false, request.flash(
                    'loginMessage',
                    'Địa chỉ email không liên kết với bất kì tài khoản nào!'
                ));

            // If password is wrong, return error message
            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (!passwordMatch)
                return done(null, false, request.flash(
                    'loginMessage',
                    'Sai mật khẩu!'
                ));

            // Ok, login successfully
            return done(null, user);
        }

        // If user logged in, skip login step
        done(null, request.user);

    } catch (error) {
        done(error);
    }
}));




passport.use('user-local-register', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (request, email, password, done) => {
    if (email) email = email.trim().toLowerCase();
    if (request.user) return done(null, request.user);
    try {
        let user = await models.User.findOne({ where: { email } });
        if (user) return done(null, false, request.flash('registerMessage', 'Địa chỉ email này đã được sử dụng!'));
        user = await models.User.create({
            fullName: request.body.fullName,
            email: email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
        });
        done(null, false, request.flash('registerMessage', 'Đăng ký tài khoản thành công!<br/>Hãy chuyển đến trang <a href="/auth/login">Đăng nhập</a>!'));
    } catch (error) {
        done(error);
    }
}));

// ham xac thuc admin khi dang nhap 
passport.use('admin-local-login', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // cho phep truyen req vao callback de kiem tra admin da dang nhap 
}, async (req, email, password, done) => {
    if (email) {
        email = email.toLowerCase(); // chuyen email sang ky tu thuong 
    }
    try {
        // If admin did not login
        if (!req.user) {

            // Try query the admin from database to check email existence
            const admin = await models.Administrator.findOne({ where: { email } });

            // If admin doesn't exist, return error message
            if (!admin)
                return done(null, false, req.flash('adminLoginMessage',
                    'Địa chỉ email không liên kết với bất kì tài khoản nào!'
                ));


            // If password is wrong, return error message
            const passwordMatch = bcrypt.compareSync(password, admin.password);
            // const passwordMatch = password == admin.password;
            if (!passwordMatch)
                return done(null, false, req.flash(
                    'adminLoginMessage',
                    'Sai mật khẩu!'
                ));

            // Ok, login successfully
            return done(null, admin);
        }
        // If admin logged in, skip login step
        done(null, req.user);

    } catch (error) {
        done(error);
    }
}));

module.exports = passport;