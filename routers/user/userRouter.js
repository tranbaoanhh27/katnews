var router = require("express").Router();
const userController = require("../../controllers/user/userController");

router.get("/", userController.showHomePage);

module.exports = router;
