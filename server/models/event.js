const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    // event_name: String,
    nameEvent: String,
    // creator_id: String,
    // creator_name: String,
    host: String,
    host_id: String,
    // start: String,
    // end: String,
    // timezone: String,
    date: Date,
    // venue: String,
    address: String,
    event_url: String,
    // summary: String,
    description: String,
    Image_id: String,
    rate: Number,
    interested: Number,
    attending: Number,
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);
