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
    date: req.body.date,
    address: req.body.address,
    description: req.body.description,
    interested: req.body.interested,
    attending: req.body.attending,
  });
  
  newEvent.save().then((event) => res.send(event)).catch((error) => console.log(error));
  console.log("Posted");
});

router.get("/event", (req, res) => { 
  Event.find({ date: req.query.date }).then((event) => {
    res.send(event);
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
