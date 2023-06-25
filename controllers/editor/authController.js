'use strict'

const controllers = {}


controllers.isLoggedIn = (req, res, next)=> {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next();
    }
 
    res.redirect('/')
}

controllers.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
}

module.exports = controllers;
