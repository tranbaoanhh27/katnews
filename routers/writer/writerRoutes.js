var router = require('express').Router();
const controllers = require('../../controllers/writer/writerController')
const passport = require('../../controllers/writer/passport')
router.get('/',  controllers.showLoginPage);
router.get('/register', controllers.showRegisterPage);
router.get('/otp', controllers.showOtpPage);
router.get('/forgotPassword', controllers.showForgotPasswordPage);
router.get('/listNews', controllers.showListNews);
router.get('/edit', controllers.showEditPage);
router.get('/information', controllers.showInformationPage);
router.get('/changePassword', controllers.showChangePasswordPage);
router.get('/savedNews', controllers.showSavedNews);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/listNews',
    failureRedirect: '/'
}))
module.exports = router;