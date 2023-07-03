'use strict';

const router = require('express').Router();
const controller = require('../../controllers/admin/userController');


//subscribers
router.get('/subscriber-admin', controller.showSubscriber);
router.put('/subscriber-admin', controller.updateSubscribers);
router.delete('/subscriber-admin', controller.deleteSubscribers);

//writer
router.get('/writer-admin', controller.showWriter);
router.delete('/writer-admin', controller.deleteWriter);
router.get('/countNewsOfWriter', controller.countNewsOfWriter);

//editor
router.get('/editor-admin', controller.showEditor);
router.put('/editor-admin', controller.updateEditor);
router.delete('/editor-admin', controller.deleteEditor);


module.exports = router;