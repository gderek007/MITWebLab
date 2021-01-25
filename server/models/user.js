const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  google_id: String,
  name: String,
  user_nickname: String,
  rating: Number,
  image_id: String,
	based: String,
  email: String,
  facebook_name: String,
  events_interested: [String],
  events_attending: [String]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
