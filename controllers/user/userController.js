'use strict';
const sequelize = require('sequelize');
const models = require('../../models');

const articleColors = ["#E98733", "#CA335C", "#70AFBE", "#7D618F", "#0CA9A8"];

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

const queryTopViewedNews = async () => {
    let news = await models.News.findAll({
        attributes: [ 'id', 'title', 'tinyImagePath', 'updatedAt' ],
        where: { isDraft: false },
        include: [{
            model: models.SubCategory,
            attributes: ['name']
        }],
        order: [[ 'totalViewsCount', 'DESC' ]],
        limit: 10
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

const queryLatestNews = async () => {
    let news = await models.News.findAll({
        attributes: [ 'id', 'title', 'tinyImagePath', 'updatedAt' ],
        where: { isDraft: false },
        include: [{
            model: models.SubCategory,
            attributes: ['name']
        }],
        order: [[ 'updatedAt', 'DESC' ]],
        limit: 10
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

    const topTenMostViews = await queryTopViewedNews();
    response.locals.twoMostViews = topTenMostViews.slice(0, 2);
    response.locals.fourMostViews = topTenMostViews.slice(2, 6);
    response.locals.nextFourMostViews = topTenMostViews.slice(6, 10);

    const topTenLatest = await queryLatestNews();
    response.locals.twoLatest = topTenLatest.slice(0, 2);
    response.locals.fourLatest = topTenLatest.slice(2, 6);
    response.locals.nextFourLatest = topTenLatest.slice(6, 10);

    response.render('home');
};

module.exports = controller;