"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const editors = [
            {
                email: "editor1@gmail.com",
                password: "P@ssW0rd",
                fullName: "Nguyễn Kiểm Duyệt Một",
                avatarPath: "/images/default-writer-avatar.jpeg",
            },
            {
                email: "editor2@gmail.com",
                password: "P@ssW0rd",
                fullName: "Nguyễn Kiểm Duyệt Hai",
                avatarPath: "/images/default-writer-avatar.jpeg",
            },
            {
                email: "editor3@gmail.com",
                password: "P@ssW0rd",
                fullName: "Nguyễn Kiểm Duyệt Ba",
                avatarPath: "/images/default-writer-avatar.jpeg",
            },
            {
                email: "editor4@gmail.com",
                password: "P@ssW0rd",
                fullName: "Nguyễn Kiểm Duyệt Bốn",
                avatarPath: "/images/default-writer-avatar.jpeg",
            },
        ];

        editors.forEach((item) => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
        });

        await queryInterface.bulkInsert("Editors", editors, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Editors", null, {});
    },
};