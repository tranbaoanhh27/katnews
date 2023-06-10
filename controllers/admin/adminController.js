'use stricts';

const controllers = {};

controllers.showCategory = (req, res) => {
    res.render('admin-category-managemant');
}

module.exports = controllers;