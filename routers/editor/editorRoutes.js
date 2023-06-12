var router = require('express').Router();

router.get('/', (req, res) => {
    console.log('Editor subdomain...');
    res.send("hello it is subdomain of editor");
})

module.exports = router;