var router = require('express').Router();
const controllers = require('../../controllers/writer/writerController')
const passport = require('../../controllers/writer/passport')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/',  controllers.showLoginPage);
router.get('/register', controllers.showRegisterPage);
router.get('/otp', controllers.showOtpPage);
router.get('/forgotPassword', controllers.showForgotPasswordPage);
router.get('/listNews', controllers.showListNews);

router.get('/information', controllers.showInformationPage);
router.get('/changePassword', controllers.showChangePasswordPage);
router.get('/savedNews', controllers.showSavedNews);

router.post('/writer/editInformation', controllers.editInformation);
router.post('/writer/editAvatar', upload.single('avatar') , controllers.editAvatar);

module.exports = router;