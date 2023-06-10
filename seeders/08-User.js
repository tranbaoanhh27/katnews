"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                email: "katnewsuser1@gmail.com",
                password: "P@ssW0rd",
                fullName: "Katnews User",
                birthdate: new Date("2002-01-01"),
                premiumExpiredTime: null,
                avatarPath: "/images/default-writer-avatar.jpeg",
                tokenFacebook: null,
                tokenGmail: null,
            }
        ];

        users.forEach(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
        });

        await queryInterface.bulkInsert("Users", users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
