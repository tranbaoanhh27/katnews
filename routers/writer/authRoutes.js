'use strict'

const express = require('express');
const router = express.Router();
const passport = require('../../controllers/writer/passport')

router.post('/login', passport.authenticate('local', {
    successRedirect: '/listNews',
    failureRedirect: '/'
}))

router.get('/hello', (req, res)=> {
    res.send('hello')
})
module.exports = router;