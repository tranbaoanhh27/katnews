"use strict";

const router = require("express").Router();
const controller = require("../../controllers/user/authController");
const passport = require("../../controllers/passport");
const { body, getErrorMessage } = require("../../controllers/validator");

router.get("/login", controller.showLoginPage);
router.post(
    "/login",
    body("email").trim().notEmpty().withMessage("Email is required!").isEmail().withMessage("Invalid email address!"),
    body("password").trim().notEmpty().withMessage("Password is required!"),
    (request, response, next) => {
        const message = getErrorMessage(request);
        if (message) return response.render("user-sign-in", { loginMessage: message });
        next();
    },
    controller.login
);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/redirect", controller.googleOAuthRedirect);

router.get('/facebook', passport.authenticate("facebook", { scope: ['email', 'public_profile'] }));
router.get('/facebook/redirect', controller.facebookOAuthRedirect);

router.get("/logout", controller.logout);

router.get("/register", controller.showSignUpPage);
router.post(
    "/register",
    body("fullName").trim().notEmpty().withMessage("Vui lòng không để trống họ và tên!"),
    body("email").trim().notEmpty().withMessage("Vui lòng không bỏ trống địa chỉ email!").isEmail().withMessage("Địa chỉ email không hợp lệ!"),
    body("password")
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
        .withMessage("Mật khẩu phải có ít nhất 8 kí tự, trong đó phải có ít nhất một kí tự số, một kí tự in hoa, và một kí tự in thường!"),
    body("passwordconfirm").custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.password) throw new Error("Mật khẩu không khớp!");
        return true;
    }),
    (request, response, next) => {
        const message = getErrorMessage(request);
        if (message)
            return response.render("user-sign-up", {
                registerMessage: message,
            });
        next();
    },
    controller.register
);

router.get("/forgot-password/enter-otp", (request, response) => {
    return response.render("user-enter-otp", {
        pageTitle: "Nhập mã OTP",
        email: request.query.email,
        successMessage: request.query.successMessage,
    });
});

router.get("/forgot-password", controller.showForgotPasswordPage);
router.post("/forgot-password", controller.showEnterOTPPage);
router.post("/new-password", controller.showEnterNewPasswordPage);

router.post(
    "/reset-password",
    body("newPassword")
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
        .withMessage("Mật khẩu phải có ít nhất 8 kí tự, trong đó phải có ít nhất một kí tự số, một kí tự in hoa, và một kí tự in thường!"),
    body("newPasswordConfirm").custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.newPassword) throw new Error("Mật khẩu không khớp!");
        return true;
    }),
    (request, response, next) => {
        const message = getErrorMessage(request);
        if (message) {
            response.locals.pageTitle = "Đặt lại mật khẩu";
            response.locals.userId = request.body.userId;
            response.locals.errorMessage = message;
            response.render("user-enter-new-password");
        }
        next();
    },
    controller.resetPassword
);

router.use(controller.isLoggedIn);

module.exports = router;
