"use strict";
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const admins = [
            {
                email: "katnewsadmin1@gmail.com",
                password: bcrypt.hashSync('P@ssW0rd', 8),
                fullName: "Katnews Admin",
            }
        ];

        admins.forEach(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            item.isDeleted = false;
        });

        await queryInterface.bulkInsert("Administrators", admins, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Administrators', null, {});
    },
};
