"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const categories = [
            { name: "Thời sự", editorId: 1 },
            { name: "Thể thao", editorId: 2 },
            { name: "Kinh tế", editorId: 3 },
            { name: "Sức khỏe", editorId: 4 },
        ];

        categories.forEach((item) => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            item.isDeleted = false;
        });

        await queryInterface.bulkInsert("Categories", categories, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
