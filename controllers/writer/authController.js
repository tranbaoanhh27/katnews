'use strict'

const controllers = {};
const models = require('../../models');
controllers.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    })
}
const bcrypt = require('bcrypt');

controllers.signup = async (req, res, next) => {
    if (req.body.password !== req.body.confirmPassword) {
        req.flash("messageWriterSignup", "2 password khong giong nhau");
        res.redirect("/register");
        next();
    }
    const user = await models.Writer.findOne({ where: {email: req.body.email } })
    console.log('user signup', user);
    if (user){  
        req.flash("messageWriterSignup", "Tên đăng nhập đã tồn tại")
        res.redirect("/register");
        next();
    }else{
        console.log("hash password", await bcrypt.hash(req.body.password, 8))
        const writer = await models.Writer.create({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 8)
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
     
}

controllers.isLoggedIn = (req, res, next)=> {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next();
    }
 
    res.redirect('/')
}

module.exports = controllers;
