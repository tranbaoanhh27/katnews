'use strict';
const controller = require('../../controllers/user/newsController');

const router = require('express').Router();

router.get('/', controller.showNewsList);
router.get('/:newsId', controller.showNewsDetails);

module.exports = router;