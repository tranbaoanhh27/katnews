var router = require('express').Router();
const controllers = require('../../controllers/admin/adminController')

router.get('/', controllers.login);
router.get('/category', controllers.showCategory);
router.get('/tag', controllers.showTag);
router.get('/post', controllers.showPost);
router.get('/user', controllers.showUser);
router.get('/renew-account', controllers.showRenewAccount);
router.get('/assign-work', controllers.showAssignWork);

module.exports = router;