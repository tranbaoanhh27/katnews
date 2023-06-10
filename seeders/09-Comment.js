"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const comments = [
            {
                content: "Great news!",
                userId: 1,
                newsId: 1,
            },
            {
                content: "Great news!",
                userId: 1,
                newsId: 2,
            },
            {
                content: "Great news!",
                userId: 1,
                newsId: 3,
            },
            {
                content: "Great news!",
                userId: 1,
                newsId: 4,
            }
        ];

        comments.forEach(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
        });

        await queryInterface.bulkInsert("Comments", comments, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Comments', null, {});
    },
};
