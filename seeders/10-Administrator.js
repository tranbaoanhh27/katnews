"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const admins = [
            {
                email: "katnewsadmin1@gmail.com",
                password: "P@ssW0rd",
                fullName: "Katnews Admin",
            }
        ];

        admins.forEach(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
        });

        await queryInterface.bulkInsert("Administrators", admins, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Administrators', null, {});
    },
};
