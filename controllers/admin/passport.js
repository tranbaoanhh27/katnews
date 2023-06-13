'use strict';

// Import libraries
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const models = require('../../models');

// ham nay duoc goi khi xac thuc nguoi dung thanh cong va luu thong tin admin 
passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

// ham duoc goi boi passport.session de lay thong tin admin tu csdl va dua vao req.admin
passport.deserializeUser(async (id, done) => {
    try {
        const admin = await models.Administrator.findOne({
            where: { id }
        });
        done(null, admin);
    } catch (error) {
        done(error, null);
    }
});


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
        if (!req.admin) {

            // Try query the admin from database to check email existence
            const admin = await models.Administrator.findOne({ where: { email } });

            // If admin doesn't exist, return error message
            if (!admin)
                return done(null, false, req.flash('adminLoginMessage',
                    'Địa chỉ email không liên kết với bất kì tài khoản nào!'
                ));


            // If password is wrong, return error message
            // const passwordMatch = bcrypt.compareSync(password, admin.password);
            const passwordMatch = password == admin.password;
            if (!passwordMatch)
                return done(null, false, req.flash(
                    'adminLoginMessage',
                    'Sai mật khẩu!'
                ));

            // Ok, login successfully
            return done(null, admin);
        }
        // If admin logged in, skip login step
        done(null, req.admin);

    } catch (error) {
        done(error);
    }
}));

module.exports = passport;