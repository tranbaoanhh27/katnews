var router = require('express').Router();
const controllers = require('../../controllers/admin/adminController')

router.get('/', (req, res) => {
    res.send("hello it is subdomain of admin");
})

router.get('/category', controllers.showCategory);

module.exports = router;