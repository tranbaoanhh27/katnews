'use strict';

// Import libraries
const passport = require('passport');
const passportLocal = require('passport-local');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const models = require('../models');
const braintreeHelper = require('./braintree');

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
            done(null, id);

        } else if (request.session.subdomains.includes('writer')) {
            // TODO: query logged-in writer and return
            // const writer = await models.Writer.findOne({
            //     where: { id }
            // });
            done(null, id);

        } else {
            const user = await models.User.findOne({
                attributes: ['id', 'password', 'premiumExpiredTime', 'braintreeCustomerId'],
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
        
        // Create a customer on Braintree Vault
        let customerId = null;
        const result = await braintreeHelper.createBraintreeVaultCustomer(email);
        customerId = result.customer.id;
        
        // Create an user in database
        user = await models.User.create({
            fullName: request.body.fullName,
            email: email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
            braintreeCustomerId: customerId
        });

        done(null, false, request.flash('registerMessage', 'Đăng ký tài khoản thành công!<br/>Hãy chuyển đến trang <a href="/auth/login">Đăng nhập</a>!'));
    } catch (error) {
        done(error);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_AUTH_REDIRECT_URL,
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        // If already logged in, return authenticated user
        if (request.user) return done(null, request.user);

        // Check if Google user has email
        if (!profile.emails || !profile.emails[0]) throw "GOOGLE_USER_NO_EMAIL";

        const email = profile.emails[0].value;

        // Try querying user with the same email address
        const user = await models.User.findOne({ where: { email }});

        // If exists user with the same email, update user's googleUid, then return
        if (user) {
            await user.update({
                googleUid: profile.id
            });
            return done(null, user);
        }

        // If doesn't exists any user with that email address
        // create new user

        // Create a customer on Braintree Vault
        let customerId = null;
        const result = await braintreeHelper.createBraintreeVaultCustomer(email);
        customerId = result.customer.id;

        const avatarPath = (profile.photos && profile.photos[0]) ? profile.photos[0].value : null;
        const createdUser = await models.User.create({
            email: email,
            password: bcrypt.hashSync(accessToken, bcrypt.genSaltSync(8)),
            fullName: profile.displayName,
            avatarPath: avatarPath,
            googleUid: profile.id,
            braintreeCustomerId: customerId
        });

        return done(null, createdUser);
    } catch (error) {
        done(error);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_AUTH_REDIRECT_URL,
    profileFields: ['id', 'displayName', 'photos', 'email'],
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        // If already logged in, return authenticated user
        if (request.user) return done(null, request.user);

        // Check if Facebook user has email
        if (!profile.emails || !profile.emails[0]) throw "FACEBOOK_USER_NO_EMAIL";

        const email = profile.emails[0].value;

        // Try querying user with the same email address
        const user = await models.User.findOne({ where: { email }});

        // If exists user with the same email, update user's facebookUid, then return
        if (user) {
            await user.update({
                facebookUid: profile.id
            });
            return done(null, user);
        }

        // If doesn't exists any user with that email address
        // create new user

        // Create a customer on Braintree Vault
        let customerId = null;
        const result = await braintreeHelper.createBraintreeVaultCustomer(email);
        customerId = result.customer.id;

        const avatarPath = (profile.photos && profile.photos[0]) ? profile.photos[0].value : null;
        const createdUser = await models.User.create({
            email: email,
            password: bcrypt.hashSync(accessToken || refreshToken.access_token || profile.emails[0].value, bcrypt.genSaltSync(8)),
            fullName: profile.displayName,
            avatarPath: avatarPath,
            facebookUid: profile.id,
            braintreeCustomerId: customerId
        });

        return done(null, createdUser);
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


passport.use('writer-local-login', new passportLocal(
    {
        usernameField: "email",
        passwordField: 'password',
        passReqToCallback: true,
    },
    async function verify(req, email, password, cb) {
        const user = await models.Writer.findOne({ where: { email } });
        console.log('user', user)
        if (!user) {
            return cb(null, false, req.flash('messageWriterLogin', "Tên đăng nhập không tồn tại"));
        }
        bcrypt.compare(password, user.password, (err, result) => {
            console.log("result", result)
            if (err) {
                return cb(null, false, req.flash('messageWriterLogin', "Mật khẩu không chính xác"));
            }
            if (result) {
                console.log("sucess")
                return cb(null, user);
            } else {
                return cb(null, false, req.flash('messageWriterLogin', "Mật khẩu không chính xác"));
            }
        })
    }
))

passport.use('editor-local-login', new passportLocal(
    {
        usernameField: "email",
        passwordField: 'password',
        passReqToCallback: true,
    },
    async function verify(req, email, password, cb) {
        console.log("editor authen")
        const user = await models.Editor.findOne({ where: {email: email } });
        console.log('user', user)
        if (!user) {
            return cb(null, false, req.flash('messageEditorLogin', "Tên đăng nhập không tồn tại"));
        }
        bcrypt.compare(password, user.password, (err, result) => {
            console.log("result", result)
            if (err) {
                return cb(null, false, req.flash('messageEditorLogin', "Mật khẩu không chính xác"));
            }
            if (result) {
                console.log("sucess")
                return cb(null, user);
            } else {
                return cb(null, false, req.flash('messageEditorLogin', "Mật khẩu không chính xác"));
            }
        })
    }
))

module.exports = passport;