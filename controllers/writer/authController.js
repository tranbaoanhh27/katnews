'use strict'

const controllers = {};
const models = require('../../models');
const bcrypt = require('bcrypt');

// logout
controllers.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
}

controllers.signup = async (req, res, next) => {
    try{
        const user = await models.Writer.findOne({ where: {email: req.body.email } })
        if (user){  
            req.flash("messageWriterSignup", "Tên đăng nhập đã tồn tại")
            res.redirect("/register");
            next();
        }else{
            const writer = await models.Writer.create({
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 8),
                fullName: req.body.fullName
            });
        
            if (writer){
                req.flash("messageWriterSignupSuccess", "Đã đăng ký thành công");
                res.redirect("/");
                next();
            }else{
                req.flash("messageWriterSignup", "Đăng ký thất bại");
                res.redirect("/register");
                next();
            }    
        }
    }catch(error){
        res.redirect('/');
    }   
}

// middleware check authenticated
controllers.isLoggedIn = (req, res, next)=> {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}

module.exports = controllers;
