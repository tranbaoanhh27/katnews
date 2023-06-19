'use strict'

const express = require('express');
const router = express.Router();
const passport = require('../../controllers/passport')
const controllers = require('../../controllers/writer/authController');

router.post('/login', passport.authenticate('writer-local-login', {
    successRedirect: '/listNews',
    failureRedirect: '/'
}))
router.post('/signup', controllers.signup);
router.get('/logout', controllers.isLoggedIn, controllers.logout);
module.exports = router;