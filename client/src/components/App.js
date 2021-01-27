import React, { Component } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import CreateEvent from "./pages/CreateEvent.js";
import Map from "./modules/Map.js";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Timetable from "./pages/Timetable.js";
import Profile from "./pages/Profile.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      user: null,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registerd in the database, and currently logged in.
        this.setState({ userId: user._id, user: user });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id , user: user});
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined, user: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <div className="App-container">
          <Router>
            {/* 
            Add <Component path = "" props />
            <Feed path="/" userId={this.state.userId} />
            <Profile path="/profile/:userId"/>*/}
            <Profile path="/profile/:userId"/>
            <Timetable path = "/timetable" userId={this.state.userId} user={this.state.user}/>
            <CreateEvent path = "/addevent" />
            <Home path = "/" />
            <Map path = "/map" />
            <NotFound default />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
