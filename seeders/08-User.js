"use strict";
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                email: "katnewsuser1@gmail.com",
                password: bcrypt.hashSync('P@ssW0rd', 8),
                fullName: "Katnews User",
                birthdate: new Date("2002-01-01"),
                premiumExpiredTime: null,
                avatarPath: "/images/default-writer-avatar.jpeg",
                facebookUid: null,
                googleUid: null,
            }
        ];

        users.forEach(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            item.isDeleted = false;
            item.braintreeCustomerId = null;
        });

        await queryInterface.bulkInsert("Users", users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
