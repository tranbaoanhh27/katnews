'use strict';

const router = require('express').Router();
const controller = require('../../controllers/admin/postController');

router.get('/', controller.show);
router.put('/', controller.update);
router.delete('/', controller.delete);


module.exports = router;