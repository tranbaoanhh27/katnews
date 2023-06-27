'use strict'

const router = require('express').Router();
const controllers = require('../../controllers/editor/editorController')
const authControllers = require('../../controllers/editor/authController');
const { authenticate } = require('passport');


router.get('/', controllers.showLoginPage);
router.get('/listNews', authControllers.isLoggedIn, controllers.showListNews);
router.get('/detail/:id', authControllers.isLoggedIn, controllers.showDetail);
router.get('/information', authControllers.isLoggedIn, controllers.showInformation);
router.get('/works', authControllers.isLoggedIn, controllers.showWorks);
module.exports = router;