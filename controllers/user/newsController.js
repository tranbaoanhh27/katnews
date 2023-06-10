'use strict';

const controller = {};

controller.showNewsList = (request, response) => {
    response.render('user-news-list');
}

module.exports = controller;