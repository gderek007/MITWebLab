const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    event_name: String,
    creator_id: String,
    creator_name: String,
    start: String,
    end: String,
    timezone: String,
    venue: String,
    event_url: String,
    summary: String,
    Image_id: String,
    rate: Number,
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);
