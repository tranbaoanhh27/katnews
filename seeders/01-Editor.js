"use strict";
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const editors = [
            {
                email: "editor1@gmail.com",
                password: bcrypt.hashSync('P@ssW0rd', 8),
                fullName: "Nguyễn Kiểm Duyệt Một",
                avatarPath: "/images/default-writer-avatar.jpeg",
                isApproved: true,
            },
            {
                email: "editor2@gmail.com",
                password: bcrypt.hashSync('P@ssW0rd', 8),
                fullName: "Nguyễn Kiểm Duyệt Hai",
                avatarPath: "/images/default-writer-avatar.jpeg",
                isApproved: true,
            },
            {
                email: "editor3@gmail.com",
                password: bcrypt.hashSync('P@ssW0rd', 8),
                fullName: "Nguyễn Kiểm Duyệt Ba",
                avatarPath: "/images/default-writer-avatar.jpeg",
                isApproved: true,
            },
            {
                email: "editor4@gmail.com",
                password: bcrypt.hashSync('P@ssW0rd', 8),
                fullName: "Nguyễn Kiểm Duyệt Bốn",
                avatarPath: "/images/default-writer-avatar.jpeg",
                isApproved: true,
            },
        ];

        editors.forEach((item) => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            item.isDeleted = false;
        });

        await queryInterface.bulkInsert("Editors", editors, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Editors", null, {});
    },
};
