var router = require('express').Router();

router.get('/', (req, res) => {
    res.send("hello it is subdomain of writer");
})

module.exports = router;