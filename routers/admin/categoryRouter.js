'use strict';

const controllers = require('../../controllers/admin/categoryController');
const subCategoryControllers = require('../../controllers/admin/subCategoryController');
const router = require('express').Router();

router.get('/', controllers.show);
router.post('/', controllers.add);
router.put('/', controllers.update);
router.delete('/', controllers.delete);
router.get('/:id', subCategoryControllers.show);
router.post('/subCategory', subCategoryControllers.add);
router.put('/subCategory', subCategoryControllers.update);
router.delete('/subCategory', subCategoryControllers.delete);
module.exports = router;