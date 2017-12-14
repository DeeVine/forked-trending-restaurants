const db = require('../models');

module.exports = {

	findAll: function(req, res) {
		db.GoogleIds
			.find({})
			.then(dbModel => console.log(res))
			.catch(err => res.status(422).json(err))
	},

	create: function(req, res) {
		db.GoogleIds
			.create(req.body)
			.then(dbModel => console.log(res))
			.catch(err => res.status(422).json(err));
	}
};