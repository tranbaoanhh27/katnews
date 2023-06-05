const express = require("express");
const { route } = require("./userRoutes");
const router = express.Router();
const controllers = require("../../controllers/user/newsController")


router.get('/', controllers.showAllNews)

module.exports = router