"use strict";
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const writers = [
            { email: "writer1@gmail.com", password: bcrypt.hashSync('P@ssW0rd', 8), fullName: "Nguyễn Nhà Báo Một", avatarPath: "/images/default-writer-avatar.jpeg", pseudonym: "Trông Anh Ngược" },
            { email: "writer2@gmail.com", password: bcrypt.hashSync('P@ssW0rd', 8), fullName: "Nguyễn Nhà Báo Hai", avatarPath: "/images/default-writer-avatar.jpeg", pseudonym: "Trương Anh Ngọc" },
            { email: "writer3@gmail.com", password: bcrypt.hashSync('P@ssW0rd', 8), fullName: "Nguyễn Nhà Báo Ba", avatarPath: "/images/default-writer-avatar.jpeg", pseudonym: "Flex Đại Sư" },
            { email: "writer4@gmail.com", password: bcrypt.hashSync('P@ssW0rd', 8), fullName: "Nguyễn Nhà Báo Bốn", avatarPath: "/images/default-writer-avatar.jpeg", pseudonym: "Mở ngoặc đại sư" },
            { email: "writer5@gmail.com", password: bcrypt.hashSync('P@ssW0rd', 8), fullName: "Nguyễn Nhà Báo Năm", avatarPath: "/images/default-writer-avatar.jpeg", pseudonym: "Kí giả Italia" }
        ];

        writers.forEach((item) => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
        });

        await queryInterface.bulkInsert("Writers", writers, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Writers', null, {});
    },
};
