'use strict';

const helper = {};

helper.isPremium = (user) => {
    if (!user || !user.premiumExpiredTime) return false;
    const today = new Date();
    const expiredDay = new Date(user.premiumExpiredTime);
    return today < expiredDay;
}

helper.generateOTP = () => {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    return otp;
}

module.exports = helper;