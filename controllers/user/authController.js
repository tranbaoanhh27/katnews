'use strict';
const passport = require('../passport');
const bcrypt = require('bcrypt');
const userHelper = require('../../public/javascript/userHelper');
const { sendResetPasswordMail } = require('../mail');
const models = require('../../models');

const controller = {};

controller.showLoginPage = (request, response) => {
    response.render('user-sign-in', {
        loginMessage: request.flash('loginMessage'),
        reqUrl: request.query.reqUrl,
        pageTitle: 'Đăng nhập'
    });
}

controller.login = (request, response, next) => {
    const saveAccount = request.body.keepSignedIn;
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
        registerMessage: request.flash('registerMessage'),
        pageTitle: "Đăng kí"
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
    response.locals.pageTitle = 'Quên mật khẩu';
    response.render('user-forgot-password');
}

controller.showEnterOTPPage = async (request, response) => {
    
    // Get email from request's body
    const email = request.body.email;

    // Check if user exists
    const user = await models.User.findOne({ where: { email }});
    if (!user) {
        response.locals.pageTitle = 'Quên mật khẩu';
        response.locals.errorMessage = `Không tồn tại tài khoản nào có địa chỉ email là ${email}`;
        return response.render('user-forgot-password')
    }

    // Delete any existing otp associated with that email in database
    const existingOtp = await models.OTP.findOne({ where: { email }});
    if (existingOtp) await existingOtp.destroy();

    // Generate & Send OTP to that email
    const otp = userHelper.generateOTP();
    const host = request.header("host");
    sendResetPasswordMail(host, otp, user)
        .then(async (result) => {
            console.log('Send email result', result);

            // Save the OTP to database
            await models.OTP.create({
                email: email,
                otp: bcrypt.hashSync(otp, bcrypt.genSaltSync(8))
            });

            // If it's resend OTP request
            let successMessage = null;
            if (request.body.resend === "true")
                successMessage = 'Chúng tôi đã gửi lại mã OTP! Vui lòng kiểm tra email!';

            // Redirect to enter-otp page (use redirect instead of render to prevent re-post on reload)
            const url = require('url');
            response.redirect(url.format({
                pathname: '/auth/forgot-password/enter-otp',
                query: {
                    "email": email,
                    "successMessage": successMessage
                }
            }));
        })
        .catch(error => {
            console.log('Send email error', error);
            response.locals.pageTitle = 'Quên mật khẩu';
            response.locals.errorMessage = `Có lỗi xảy ra khi gửi mã OTP đến địa chỉ ${email}, vui lòng kiểm tra lại địa chỉ email!`;
            return response.render('user-forgot-password');
        });
}

controller.showEnterNewPasswordPage = async (request, response) => {
    const { email, otp } = request.body;

    // Check if user exists
    const user = await models.User.findOne({ attributes: ['id'], where: { email }});
    if (!user) {
        response.locals.pageTitle = 'Quên mật khẩu';
        response.locals.errorMessage = `Không tồn tại tài khoản nào có địa chỉ email là ${email}`;
        return response.render('user-forgot-password');
    }

    // Check if OTP exists
    const existingOtp = await models.OTP.findOne({ where: { email }});
    if (!existingOtp) {
        response.locals.pageTitle = 'Quên mật khẩu';
        response.locals.errorMessage = `Có lỗi xảy ra khi xác thực OTP! Vui lòng thử lại`;
        return response.render('user-forgot-password');
    }

    // Check if OTP matches
    const OTPCorrect = bcrypt.compareSync(otp, existingOtp.otp);
    if (!OTPCorrect) {
        response.locals.email = email;
        response.locals.pageTitle = 'Nhập mã OTP';
        response.locals.errorMessage = 'Mã OTP không đúng! Vui lòng kiểm tra lại!';
        return response.render('user-enter-otp');
    }

    // Check if OTP not expired
    const FIVE_MINS = 5 * 60 * 1000;
    const OTPCreatedDate = new Date(existingOtp.createdAt);
    const today = new Date();
    if ((today - OTPCreatedDate) >= FIVE_MINS) {
        response.locals.pageTitle = 'Quên mật khẩu';
        response.locals.errorMessage = `Mã OTP đã hết hạn! Vui lòng thực hiện lại`;
        return response.render('user-forgot-password');
    }

    response.locals.pageTitle = 'Đặt lại mật khẩu';
    response.locals.userId = user.id;
    response.render('user-enter-new-password');
}

controller.resetPassword = async (request, response) => {
    const { userId, newPassword, newPasswordConfirm } = request.body;

    // Check if user exists
    const user = await models.User.findOne({ attributes: ['id'], where: { id: userId }});
    if (!user) {
        response.locals.pageTitle = 'Quên mật khẩu';
        response.locals.errorMessage = `Không tìm thấy tài khoản! Vui lòng thử lại`;
        return response.render('user-forgot-password');
    }

    // Check if password confirmation matches
    if (newPassword !== newPasswordConfirm) {
        response.locals.pageTitle = 'Đặt lại mật khẩu';
        response.locals.userId = user.id;
        response.locals.errorMessage = 'Xác nhận Mật khẩu mới không khớp! Vui lòng kiểm tra lại';
        return response.render('user-enter-new-password');
    }

    // Update password
    await user.update({
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8))
    });

    response.locals.pageTitle = 'Đặt lại mật khẩu';
    response.locals.successMessage = `<p>Đặt lại mật khẩu thành công!<br/>Hãy chuyển đến trang <a href="/auth/login" style="text-decoration: none !important">Đăng nhập</a></p>`
    response.render('user-enter-new-password');
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

controller.googleOAuthRedirect = (request, response, next) => {
    passport.authenticate("google", (error, user) => {
        if (error) return next(error);
        if (!user) return response.redirect(`/auth/login`);
        request.logIn(user, (error) => {
            if (error) return next(error);
            return response.redirect("/");
        });
    })(request, response, next);
}

controller.facebookOAuthRedirect = (request, response, next) => {
    passport.authenticate("facebook", (error, user) => {
        if (error) return next(error);
        if (!user) return response.redirect(`/auth/login`);
        request.logIn(user, (error) => {
            if (error) return next(error);
            return response.redirect("/");
        });
    })(request, response, next);
}

module.exports = controller;