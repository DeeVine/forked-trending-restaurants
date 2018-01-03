const router = require("express").Router();
const restaurantController = require("../../controllers/restaurantController.js");

router.route("/")
	.get(restaurantController.findAll)
	.post(restaurantController.postNewRestaurant);

router.route("/:name")
	.get(restaurantController.nameQuery);

router.route("/id/:id")
	.get(restaurantController.returnDetails);

router.route('/filter/:type')
	.get(restaurantController.filterSearch);

module.exports = router;