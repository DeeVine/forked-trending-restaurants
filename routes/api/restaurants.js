const router = require("express").Router();
const restaurantController = require("../../controllers/restaurantController.js");

router.route("/")
	.get(restaurantController.findAll);

router.route("/test")
	.get(restaurantController.testQuery);

module.exports = router;