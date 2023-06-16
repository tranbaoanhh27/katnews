"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const DEFAULT_CONTENT = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tempore eius
        ipsum voluptates voluptas. Dolores quia deserunt, aliquid eum optio iusto excepturi
        beatae tempore. Minima dolores itaque mollitia tempora ipsam?`;
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
        });

        await queryInterface.bulkInsert("Comments", comments, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Comments', null, {});
    },
};
