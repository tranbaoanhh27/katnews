"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const newsTags = [];
        for (let newsId = 1; newsId < 33; newsId++) {
            const tagIds = [1, 2, 3, 4, 5];
            for (let i = 0; i < 3; i++) {
                const tagId = tagIds[Math.floor(Math.random() * tagIds.length)];
                const index = tagIds.indexOf(tagId);
                tagIds.splice(index, 1);
                newsTags.push({ newsId, tagId });
            }
        }

        newsTags.forEach((item) => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
        });

        await queryInterface.bulkInsert("NewsTag", newsTags, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('NewsTag', null, {});
    },
};
