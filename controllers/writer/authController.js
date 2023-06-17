'use strict'

const controllers = {};

controllers.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
    
}

module.exports = controllers;
