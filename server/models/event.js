const mongoose = require("mongoose");

//define a event schema for the database
const EventSchema = new mongoose.Schema({
  host: String,
  host_id: String,
  nameEvent: String,
  date: Date,
  address: String,
  description: String,
  interested: Number,
  attending: Number,
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);
