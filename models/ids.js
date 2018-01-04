var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var IdsSchema = new Schema({
  // `title` is required and of type String
  yelpId: {
    type: String,
    unique: true,
    dropDups: true
  },

  fbId: {
    type: String,
    unique: true,
    dropDups: true
  }

});

// This creates our model from the above schema, using mongoose's model method
var Ids = mongoose.model("all_ids", IdsSchema);
// Export the Article model
module.exports = Ids;