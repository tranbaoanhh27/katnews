var router = require("express").Router();
const indexController = require("../../controllers/user/indexController");

router.get("/", indexController.showHomePage);

module.exports = router;
