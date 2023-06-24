'use strict'

var router = require('express').Router();
const controllers = require('../../controllers/writer/writerController');
const authController = require('../../controllers/writer/authController');
const passport = require('../../controllers/writer/passport');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/',  controllers.showLoginPage);
router.get('/register', controllers.showRegisterPage);
router.get('/otp', controllers.showOtpPage);

router.get('/forgotPassword',authController.isLoggedIn, controllers.showForgotPasswordPage);
router.get('/listNews', authController.isLoggedIn, controllers.showListNews);
router.get('/information',authController.isLoggedIn, controllers.showInformationPage);
router.get('/changePassword',authController.isLoggedIn, controllers.showChangePasswordPage);

router.post('/writer/editInformation',
    authController.isLoggedIn,
    controllers.editInformation);

router.post('/writer/editAvatar',
    authController.isLoggedIn,
    upload.single('avatar') ,
    controllers.editAvatar);

module.exports = router;