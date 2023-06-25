'use strict'

const router = require('express').Router();
const passport = require('../../controllers/passport');
const authController = require('../../controllers/editor/authController');

router.post('/login', passport.authenticate('editor-local-login', {
    successRedirect: '/listNews',
    failureRedirect: '/'
}));

router.get('/logout', authController.isLoggedIn, authController.logout);


module.exports = router;