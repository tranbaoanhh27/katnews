"use strict";
const moment = require("moment");
const bcrypt = require('bcrypt');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { firebaseApp } = require('../../index');
const models = require("../../models");

const controller = {};

controller.middleware = async (request, response, next) => {
    response.locals.isLoggedIn = request.isAuthenticated();
    if (request.user) {
        const user = await models.User.findOne({
            attributes: [
                "premiumExpiredTime",
                "fullName",
                "email",
                "birthdate",
                'avatarPath',
            ],
            where: { id: request.user.id },
        });

        const premiumExpiredTimeString = user.premiumExpiredTime
            ? `Hết hạn vào ${new Date(user.premiumExpiredTime).toLocaleString(
                  "vi-VN"
              )}`
            : "Chưa đăng ký Premium";
        
        let isPremium = false;
        if (user.premiumExpiredTime) {
            const today = new Date();
            const expiredDate = new Date(user.premiumExpiredTime);
            isPremium = expiredDate > today;
        }

        response.locals.authenticatedUser = {
            premiumExpiredTimeString: premiumExpiredTimeString,
            isPremium: isPremium,
            fullName: user.fullName,
            email: user.email,
            avatarPath: user.avatarPath ? user.avatarPath : null,
            birthdate: user.birthdate
                ? moment(new Date(user.birthdate)).format("yyyy-MM-DD")
                : null,
        };
    }

    next();
};

controller.show = (request, response) => {
    response.locals.accountPage = true;
    response.locals.pageTitle = "Quản lí tài khoản";
    response.render("user-account");
};

controller.updateAccountInfo = async (request, response, next) => {
    let { fullName, email, birthdate } = request.body;

    fullName = fullName.trim();
    email = email.trim();
    birthdate = birthdate.trim();

    console.log("fullName", fullName);
    console.log("email", email);
    console.log("birthdate", birthdate);

    if (fullName !== "" && email !== "") {
        const user = await models.User.findOne({
            where: { id: request.user.id },
        });
        await user.update({
            fullName: fullName,
            email: email,
            birthdate: birthdate !== "" ? new Date(birthdate) : null,
        });
        response.locals.successMessage = "Cập nhập thông tin thành công!";
    }

    next();
};

controller.updateAvatar = async (request, response) => {

    // Upload image to firebase storage
    const fileExtension = request.file.originalname.split('.').pop();
    const firebaseStorage = getStorage(firebaseApp);
    const storageRef = ref(firebaseStorage, `user-avatar-images/${request.user.id}.${fileExtension}`);
    await uploadBytes(storageRef, request.file.buffer, { contentType: request.file.mimetype });
    const downloadUrl = await getDownloadURL(storageRef);

    // Update user's avatar path
    const user = await models.User.findOne({ where: { id: request.user.id }});
    await user.update({
        avatarPath: downloadUrl
    });
    
    response.redirect('/account');
}

controller.showChangePasswordPage = (request, response) => {
    response.locals.changePasswordPage = true;
    response.locals.pageTitle = "Đổi mật khẩu";
    response.render("user-change-password");
};

controller.updateAccountPassword = async (request, response, next) => {
    let { currentPassword, newPassword, newPasswordConfirm } = request.body;
    currentPassword = currentPassword.trim();
    newPassword = newPassword.trim();
    newPasswordConfirm = newPasswordConfirm.trim();

    // Check if user's entered password is correct
    if (bcrypt.compareSync(currentPassword, request.user.password)) {

        // Check if new password's confirmation matches
        if (newPassword === newPasswordConfirm) {
            const user = await models.User.findOne({ where: { id: request.user.id }});
            await user.update({ password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8)) });
            response.locals.successMessage = 'Cập nhật mật khẩu thành công!';

        } else response.locals.errorMessage = 'Xác nhận Mật khẩu mới không khớp!';
        
    } else response.locals.errorMessage = 'Sai mật khẩu hiện tại!';

    next();
}

controller.showPremiumPage = (request, response) => {
    response.locals.premiumPage = true;
    response.locals.pageTitle = "Gia hạn Premium";
    response.render("user-account-premium");
};

module.exports = controller;
