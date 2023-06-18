'use strict';

const helper = {};

helper.isPremium = (user) => {
    if (!user || !user.premiumExpiredTime) return false;
    const today = new Date();
    const expiredDay = new Date(user.premiumExpiredTime);
    return today < expiredDay;
}

module.exports = helper;