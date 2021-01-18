const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  google_id: String,
  user_name: String,
  user_nickname: String,
  rating: Number,
  image_id: String,
	based: String,
	email: String,
 	facebook_name: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
