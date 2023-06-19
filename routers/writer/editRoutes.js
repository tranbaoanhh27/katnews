'use strict'
const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const router = express.Router();
const controllers = require('../../controllers/writer/editController');
const authController = require('../../controllers/writer/authController');

router.post('/news',authController.isLoggedIn, upload.array('image', 2), controllers.createNews);
router.get('/',authController.isLoggedIn, controllers.showEditPage);
router.post('/password',authController.isLoggedIn, controllers.changePassword);

module.exports = router;