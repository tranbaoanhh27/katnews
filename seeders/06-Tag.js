"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const tags = [
            { name: "Demo Tag 1" },
            { name: "Demo Tag 2" },
            { name: "Demo Tag 3" },
            { name: "Demo Tag 4" },
            { name: "Demo Tag 5" },
        ]

        tags.forEach((item) => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            item.isDeleted = false;
        });

        await queryInterface.bulkInsert("Tags", tags, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Tags', null, {});
    },
};
