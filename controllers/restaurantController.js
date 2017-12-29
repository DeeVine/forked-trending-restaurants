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
			})
			.catch(err => res.status(422).json(err));
	},

	returnDetails: function(req, res) {
		db.Restaurants
			.find({
				_id: req.params.id
			})
			.then(dbModel => {
				res.json(dbModel)
			})
			.catch(err => res.status(422).json(err));
	},

	filterSearch: function(req, res) {
		if (req.params.type === 'price') {
			db.Restaurants
				.find({
					[req.params.type]: req.query.filter
				})
				.then(dbModel => {
					res.json(dbModel)
					console.log(res)
				})
				.catch(err => res.status(422).json(err));
		} else if (req.params.type === 'category') {
			console.log(req.query.filter)
			let animal = req.query.filter
			db.Restaurants
				.find({
					categories: {
						$elemMatch: {title: animal}
					}
				})
				.then(dbModel => {
					res.json(dbModel)
				})
				.catch(err => res.status(422).json(err));
		}

	}

// find by filter
// get difference in array
	// mean
	// avg for all restaurants
	// narrow down avg by filter
};