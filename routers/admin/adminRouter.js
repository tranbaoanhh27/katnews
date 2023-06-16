'use strict';

let router = require('express').Router();
const controllers = require('../../controllers/admin/adminController');
const authController = require('../../controllers/admin/authContrller');
const tagController = require('../../controllers/admin/tagController');
const categoryController = require('../../controllers/admin/categoryController');

router.use(authController.adminIsLoggedIn);

// Middleware setup admin page's header
router.use((request, response, next) => {
    if (request.user) {
        response.locals.headerAdmin = request.user;
    }
    next();
});

router.get('/', categoryController.show);
// category 
router.use('/category', require('./categoryRouter'));

//tag
router.get('/tag', tagController.show);
router.post('/tag', tagController.add);
router.put('/tag', tagController.update);
router.delete('/tag', tagController.delete);

router.get('/post', controllers.showPost);
router.get('/user', controllers.showUser);
router.get('/renew-account', controllers.showRenewAccount);
router.get('/assign-work', controllers.showAssignWork);

module.exports = router;