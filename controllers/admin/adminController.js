'use stricts';

const controllers = {};

controllers.login = (req, res) => {
    res.render('admin-login', { layout: 'admin-login' });
}

controllers.showCategory = (req, res) => {
    res.render('admin-category', { layout: 'admin-layout', type_name: 'category' });
}

controllers.showTag = (req, res) => {
    res.render('admin-Tag', { layout: 'admin-layout', type_name: 'tag' });
}

controllers.showPost = (req, res) => {
    res.render('admin-Post', { layout: 'admin-layout', type_name: 'post' });
}

controllers.showUser = (req, res) => {
    res.render('admin-user', { layout: 'admin-layout', type_name: 'user' });
}

controllers.showAssignWork = (req, res) => {
    res.render('admin-assign-work', { layout: 'admin-layout', type_name: 'assign-work' });
}

controllers.showRenewAccount = (req, res) => {
    res.render('admin-renew-account', { layout: 'admin-layout', type_name: 'renew-account' });
}

module.exports = controllers;