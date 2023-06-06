var router = require('express').Router();
const controllers = require('../../controllers/writer/writerController')
router.get('/', (req, res) => {
    res.send("hello it is subdomain of writer");
})

router.get('/login',  controllers.showLoginPage);
router.get('/register', controllers.showRegisterPage);
router.get('/otp', controllers.showOtpPage);
router.get('/forgotPassword', controllers.showForgotPasswordPage);
router.get('/listNews', controllers.showListNews);
router.get('/edit', controllers.showEditPage);
router.get('/information', controllers.showInformationPage);
router.get('/changePassword', controllers.showChangePasswordPage);
router.get('/savedNews', controllers.showSavedNews);
module.exports = router;