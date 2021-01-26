import React, { Component } from "react";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import Card from "../modules/Card.js";
import "./Profile.css";
import Timetable from "./Timetable";

/**
 * Component to render profile page
 *
 * Proptypes
 * @param {string} userId
 */

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: undefined,
        events: [],
      };
  }

  getUserData = () => {
    get("/api/user", {userId: this.props.userId}).then((user) => this.setState({ user: user }));
  };

  componentDidMount() {
    document.title = "Profile Page";
    this.getUserData();    
    // .then(console.log(this.state.user))
    //
  }
  
  render() {
    if (!this.state.user) {
        return <div> Loading! </div>;
      };
    return (
      <div className="profile-container">
        <div className="profile-left">
            <div className="profile-left-names">
                <h1 className="profile-nomargin"> {this.state.user.name} </h1>
                <h3 className="profile-nomargin"> {this.state.user.user_nickname} </h3>
                <p className="profile-nomargin"> Rating: {this.state.user.rating} / 10 </p>
            </div>
            <div className="profile-left-details">
                <p className="profile-nomargin"> Based in: {this.state.user.based} </p>
                <p className="profile-nomargin"> Email: {this.state.user.email} </p>
                <p className="profile-nomargin"> Facebook Name: {this.state.user.facebook_name} </p>
            </div>
        </div>
        <div className="profile-right">
          <div className="attending-events">
            <h2>Events you are Attending!</h2>
            
            <Timetable
            userId = {this.props.userId}
            eventsAttending = {this.state.user.events_attending}
            />
            </div>
          <div className="interested-events">
            <h2>Events you are Interested in 🤔</h2>
            
            <Timetable
            userId = {this.props.userId}
            eventsInterested = {this.state.user.events_interested}
            />
          </div>
            <span> </span>
        </div>
      </div>
      
    );
  }
}

export default Profile;