'use strict';

const controller = {};

controller.showNewsList = (request, response) => {
    response.render('user-news-list');
}

controller.showNewsDetails = (request, response) => {
    response.render('user-news-details');
}

module.exports = controller;