var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var RestaurantsSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String,
  },
  // `link` is required and of type String
  location: {
    type: String,
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  id: {
    type: String,
  }
});

// This creates our model from the above schema, using mongoose's model method
var Restaurants = mongoose.model("Restaurants", RestaurantsSchema);

// Export the Article model
module.exports = Restaurants;