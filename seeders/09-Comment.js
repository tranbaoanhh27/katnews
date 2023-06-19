"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const DEFAULT_CONTENT = `Comment này là từ database!`;
        const comments = [
            {
                content: DEFAULT_CONTENT,
                userId: 1,
                newsId: 1,
            },
            {
                content: DEFAULT_CONTENT,
                userId: 1,
                newsId: 1,
            },
            {
                content: DEFAULT_CONTENT,
                userId: 1,
                newsId: 1,
            },
            {
                content: DEFAULT_CONTENT,
                userId: 1,
                newsId: 1,
            },
            {
                content: DEFAULT_CONTENT,
                userId: 1,
                newsId: 1,
            },
            {
                content: DEFAULT_CONTENT,
                userId: 1,
                newsId: 2,
            },
            {
                content: DEFAULT_CONTENT,
                userId: 1,
                newsId: 3,
            },
            {
                content: DEFAULT_CONTENT,
                userId: 1,
                newsId: 4,
            }
        ];

        comments.forEach(item => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            item.isDeleted = false;
        });

        await queryInterface.bulkInsert("Comments", comments, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Comments', null, {});
    },
};
