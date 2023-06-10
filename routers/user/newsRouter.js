'use strict';
const controller = require('../../controllers/user/newsController');

const router = require('express').Router();

router.get('/', controller.showNewsList);

module.exports = router;