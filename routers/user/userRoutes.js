var router = require('express').Router();
const userControllers = require('../../controllers/user/userControllers');

const handlebars = require('express-handlebars');



router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;