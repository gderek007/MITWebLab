const mongoose = require("mongoose");

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
