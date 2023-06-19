"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const subCategories = [
            // categoryId = 1 -> Thời sự
            { name: "Chính trị", categoryId: 1 },
            { name: "Pháp luật", categoryId: 1 },
            { name: "Dân sinh", categoryId: 1 },
            { name: "Quốc phòng", categoryId: 1 },

            // categoryId = 2 -> Thể thao
            { name: "Bóng đá Việt Nam", categoryId: 2 },
            { name: "Bóng đá Quốc tế", categoryId: 2 },
            { name: "Bóng rổ", categoryId: 2 },
            { name: "Thể thao khác", categoryId: 2 },

            // categoryId = 3 -> Kinh tế
            { name: "Ngân hàng", categoryId: 3 },
            { name: "Chứng khoán", categoryId: 3 },
            { name: "Doanh nghiệp", categoryId: 3 },
            { name: "Làm giàu", categoryId: 3 },

            // categoryId = 4 -> Sức khỏe
            { name: "Khỏe đẹp mỗi ngày", categoryId: 4 },
            { name: "Làm đẹp", categoryId: 4 },
            { name: "Y đức", categoryId: 4 },
            { name: "Giới tính", categoryId: 4 },
        ];

        subCategories.forEach((item) => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            item.isDeleted = false;
        });

        await queryInterface.bulkInsert("SubCategories", subCategories, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('SubCategories', null, {});
    },
};
