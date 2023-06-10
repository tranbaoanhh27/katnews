"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const statusUpdates = [];
        
        for (let newsId = 1; newsId <= 8; newsId++) {
            statusUpdates.push({
                status: "approved",
                reasonReject: null,
                newsId: newsId,
                editorId: 1
            });
        }

        for (let newsId = 9; newsId <= 16; newsId++) {
            statusUpdates.push({
                status: "approved",
                reasonReject: null,
                newsId: newsId,
                editorId: 2
            });
        }

        for (let newsId = 17; newsId <= 24; newsId++) {
            statusUpdates.push({
                status: "approved",
                reasonReject: null,
                newsId: newsId,
                editorId: 3
            });
        }

        for (let newsId = 25; newsId <= 32; newsId++) {
            statusUpdates.push({
                status: "approved",
                reasonReject: null,
                newsId: newsId,
                editorId: 4
            });
        }

        statusUpdates.forEach((item) => {
            item.publishDate = Sequelize.literal("NOW()");
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
        });

        await queryInterface.bulkInsert("NewsStatuses", statusUpdates, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('NewsStatuses', null, {});
    },
};
