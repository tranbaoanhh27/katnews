'use strict';
const controller = require('../../controllers/user/newsController');

const router = require('express').Router();

router.get('/', controller.showNewsList);
router.get('/search', controller.search);
router.get('/:newsId', controller.showNewsDetails);
router.post('/:newsId', controller.postComment);


module.exports = router;