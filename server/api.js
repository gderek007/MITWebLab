/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Event = require("./models/event");
const Comment = require("./models/comment");


// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/addevent", (req, res) => {
  const newEvent = new Event({
    host: req.user.name,
    host_id: req.user._id,
    nameEvent: req.body.nameEvent,
    start: req.body.start,
    end: req.body.end,
    address: req.body.address,
    link: req.body.link,
    online_event: req.body.online_event,
    description: req.body.description,
    interested: req.body.interested,
    attending: req.body.attending,
    lat: req.body.lat,
    lng: req.body.lng,
  });
  
  newEvent.save().then((event) => res.send(event)).catch((error) => console.log(error));
  console.log("Posted Event");
});

router.get("/events", (req, res) => { 
    Event.find().then((event) => {
    res.send(event);
  });
});

router.post("/comment", (req, res) => {
  const newComment = new Comment({
    creator_name: req.user.name,
    creator_id: req.user._id,
    content: req.body.content,
    parent: req.body.parent,
  });

  newComment.save().then((comment) => res.send(comment)).catch((error) => console.log(error));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user);
    console.log(user._id);
  });
});

router.post("/userevents", (req,res) => {
  console.log("Posting for userevents");
  User.updateOne({_id: req.user}, {$set : 
    {"events_interested": req.body.events_interested,
    "events_attending": req.body.events_attending
    } 
  }).then((page) => {res.send(page)});
});

router.post("/interested", (req, res) => {
  console.log("Posting for userevents");
  Event.updateOne({_id: req.body.eventId}, {$inc : 
    {"interested": req.body.amount}
  }).then((page) => {res.send(page)});
});

router.post("/attending", (req, res) => {
  console.log("Posting for userevents");
  Event.updateOne({_id: req.body.eventId}, {$inc : 
    {"attending": req.body.amount}
  }).then((page) => {res.send(page)});
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
