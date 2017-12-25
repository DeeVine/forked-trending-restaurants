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

  name: {
    type: String,
  },

  location: {
    type: Object,
  },

  categories: {
    type: Array,
  },

  price: {
    type: String,
  },

  reviews: {
    type: Array,
  },

  yelpImg: {
    type: String,
  },

  phone: {
    type: String,
  },

  fbId: {
    type: String,
  },

  yelpURL: {
    type: String,
  },

  rating: {
    type: Array,
  },

  star_rating: {
    type: Array,
  },

  checkins: {
    type: Array,
  },

  rating_count: {
    type: Array,
  }

});

// This creates our model from the above schema, using mongoose's model method
var Restaurants = mongoose.model("all_restaurants", RestaurantsSchema);

// Export the Article model
module.exports = Restaurants;