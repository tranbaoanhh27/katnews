'use strict'

const router = require('express').Router();
const controllers = require('../../controllers/editor/editController');
const authController = require('../../controllers/editor/authController');

router.post('/accept/:id', authController.isLoggedIn, controllers.accept);
router.get('/accept/:id', authController.isLoggedIn, controllers.showAccept);
router.get('/reject/:id', authController.isLoggedIn, controllers.showReject);
router.post('/reject/:id', authController.isLoggedIn, controllers.reject);
module.exports = router;