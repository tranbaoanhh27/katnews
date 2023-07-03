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
    response.locals.successMessage = request.flash('successMessage');
    response.locals.errorMessage = request.flash('errorMessage');
    response.locals.currencyIsoCode = 'USD';
    
    const SEVEN_DAYS_MILLIS = 7 * 24 * 60 * 60 * 1000;
    let millisToExtends = SEVEN_DAYS_MILLIS;
    let newExpiredTime = new Date(); newExpiredTime.setDate(newExpiredTime.getDate() + 7);
    
    if (request.user && request.user.premiumExpiredTime)
        millisToExtends = newExpiredTime - new Date(request.user.premiumExpiredTime);
    if (millisToExtends > SEVEN_DAYS_MILLIS) millisToExtends = SEVEN_DAYS_MILLIS;

    const amount = (millisToExtends / SEVEN_DAYS_MILLIS).toFixed(2);
    
    response.locals.amount = amount;
    response.locals.shouldExtends = amount > 0;
    response.locals.newPremiumExpiredTime = newExpiredTime;
    response.locals.newPremiumExpiredTimeString = newExpiredTime.toLocaleString('vi-VN');
    response.render("user-account-premium");
};

controller.beginPaymentTransaction = (request, response) => {

    // Create transaction
    const { braintreeGateway } = require('../../index');
    braintreeGateway.transaction.sale({
        amount: request.body.amount,
        paymentMethodNonce: request.body.payment_method_nonce,
        deviceData: request.body.payment_device_data,
        options: {
            submitForSettlement: true,
            storeInVaultOnSuccess: true
        }
    }, async (err, result) => {
        let successMessage = null, errorMessage = null;
        if (result.success) {
            successMessage = `Bạn đã thanh toán thành công số tiền ${result.transaction.amount}${result.transaction.currencyIsoCode} để gia hạn tài khoản Premium!`;
            request.flash('successMessage', successMessage);
            
            // Update new premium expired time for user
            const user = await models.User.findOne({ where: { id: request.user.id }});
            if (user) await user.update({ premiumExpiredTime: new Date(request.body.newPremiumExpiredTime) });
        }
        else request.flash('errorMessage', result.message);
        response.redirect('/account/premium');
    });    
}

module.exports = controller;
