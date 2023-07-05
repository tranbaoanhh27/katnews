'use strict';

const router = require('express').Router();
const controller = require('../../controllers/admin/postController');

router.get('/', controller.show);
router.get('/:newsId', controller.showPostDetails);
router.put('/', controller.update);
router.delete('/', controller.delete);
router.delete('/comment', controller.deleteComment);


module.exports = router;