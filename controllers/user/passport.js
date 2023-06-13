'use strict';

// Import libraries
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const models = require('../../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await models.User.findOne({
            attributes: ['id', 'fullName', 'birthdate', 'email', 'avatarPath', 'premiumExpiredTime'],
            where: { id }
        });
        done(null, user);
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
            // const passwordMatch = bcrypt.compareSync(password, user.password);
            const passwordMatch = password == user.password;
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

module.exports = passport;