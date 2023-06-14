'use stricts';

const controllers = {};
const models = require('../../models');

controllers.login = (req, res) => {
    res.render('admin-login', { layout: 'admin-login' });
}

controllers.showCategory = (req, res) => {
    res.render('admin-category', { layout: 'admin-layout', type_name: 'category', inCategory: "#0d6efd" });
}


controllers.showPost = (req, res) => {
    res.render('admin-Post', { layout: 'admin-layout', inPost: "#0d6efd", type_name: 'post' });
}

controllers.showUser = (req, res) => {
    res.render('admin-user', { layout: 'admin-layout', inUser: "#0d6efd", type_name: 'user' });
}

controllers.showAssignWork = (req, res) => {
    res.render('admin-assign-work', { layout: 'admin-layout', inAS: "#0d6efd", type_name: 'assign-work' });
}

controllers.showRenewAccount = (req, res) => {
    res.render('admin-renew-account', { layout: 'admin-layout', inRA: "#0d6efd", type_name: 'renew-account' });
}

module.exports = controllers;