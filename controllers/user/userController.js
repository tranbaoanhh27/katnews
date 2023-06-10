'use strict';
const sequelize = require('sequelize');
const models = require('../../models');

const articleColors = ["#13005A", "#00337C", "#1C82AD", "#03C988", "#116A7B"];

const queryWeeklyTopNews = async () => {
    let news = await models.News.findAll({
        attributes: [ 'id', 'title', 'largeImagePath', 'updatedAt' ],
        where: { isDraft: false },
        include: [{
            model: models.SubCategory,
            attributes: ['name', 'id']
        }, {
            model: models.Writer,
            attributes: ['pseudonym']
        }],
        order: [[ 'weeklyViewsCount', 'DESC' ]],
        limit: 3
    });
    let colorIndex = 0;
    news.forEach(element => {
        let updatedDate = new Date(element.updatedAt);
        element.updatedAtString = updatedDate.toLocaleString('vi-VN');
        element.badgeColor = articleColors[colorIndex % articleColors.length];
        colorIndex++;
    });
    return news;
}

const controller = {};

controller.showHomePage = async (request, response) => {
    const weeklyTopThree = await queryWeeklyTopNews();
    response.locals.weeklyTopThree = weeklyTopThree;

    response.render('home');
};

module.exports = controller;