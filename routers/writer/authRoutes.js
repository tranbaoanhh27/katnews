'use strict'

const express = require('express');
const router = express.Router();
const passport = require('../../controllers/writer/passport')
const controllers = require('../../controllers/writer/authController');
router.post('/login', passport.authenticate('local', {
    successRedirect: '/listNews',
    failureRedirect: '/'
}))

router.post('/signup', controllers.signup);

router.get('/logout', controllers.logout);
module.exports = router;