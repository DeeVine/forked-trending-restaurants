var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var RestaurantsSchema = new Schema({
  // `title` is required and of type String
  yelpId: {
    type: String,
  },

  reviews: {
    type: Array,
  },

  price: {
    type: String,
  },

  rating: {
    type: Number,
  },

  yelpURL: {
    type: String,
  },

  categories: {
    type: Array,
  },

  phone: {
    type: String,
  }

});

// This creates our model from the above schema, using mongoose's model method
var Restaurants = mongoose.model("yelprestaurants", RestaurantsSchema);

// Export the Article model
module.exports = Restaurants;