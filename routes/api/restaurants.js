const router = require("express").Router();
const restaurantController = require("../../controllers/restaurantController.js");

router.route("/")
	.get(restaurantController.findAll);

module.exports = router;