var router = require('express').Router();

router.get('/', (req, res) => {
    res.send("hello it is subdomain of admin");
})

module.exports = router;