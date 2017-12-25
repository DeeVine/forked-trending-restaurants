const db = require ("../models");

module.exports = {
	findAll: function(req, res) {
    	db.Restaurants
			.find(req.query)
			.sort({ date: -1 })
			.then(dbModel =>{
				res.json(dbModel)
				// console.log(dbModel);
			})
			.catch(err => res.status(422).json(err));
	},
	testQuery: function(req, res) {
    	db.Restaurants
			.find({ 
				name: req.params.name
			})
			.sort({ date: -1 })
			.then(dbModel =>{
				res.json(dbModel)
				console.log(dbModel);
			})
			.catch(err => res.status(422).json(err));
	}
};