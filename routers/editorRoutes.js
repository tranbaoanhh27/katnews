var router = require('express').Router();

router.get('/', (req, res) => {
    res.send("hello it is subdomain of editor");
})

module.exports = router;