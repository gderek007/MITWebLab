const mongoose = require("mongoose");

// old eventschema
// const EventSchema = new mongoose.Schema({
//     host: String,
//     host_id: String,
//     nameEvent: String,
//     date: Date,
//     address: String,
//     description: String,
//     interested: Number,
//     attending: Number,
// });

const EventSchema = new mongoose.Schema({
    host: String,
    host_id: String,
    nameEvent: String,
    start: Date,
    end: Date,
    address: String,
    link: String,
    online_event: Boolean,
    description: String,
    // interested: Array,
    // attending: Array,
    interested: Number,
    attending: Number,
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);
