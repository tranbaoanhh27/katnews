'use strict'
const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const router = express.Router();
const controllers = require('../../controllers/writer/editController')

router.post('/news',upload.array('image', 2), controllers.createNews);
router.get('/', controllers.showEditPage);

module.exports = router;