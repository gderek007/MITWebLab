import React, { Component } from "react";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import Card from "../modules/Card.js";
import "./Profile.css";

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

  loadCreatedEvent = () => {
    get("/api/events").then((events) => {
      this.setState({
        events: events,
      });
    });
  }

  componentDidMount() {
    document.title = "Profile Page";
    this.getUserData();
    this.loadCreatedEvent();
    // .then(console.log(this.state.user))
    //
  }
  
  render() {
    let events_attend = null;
    let events_host = this.state.events.filter(event => event.host_id === this.props.userId);
    let eventsList_attend = null;
    let eventsList_host = null;

    if (!this.state.user) {
        return <div> Loading! </div>;
      };

      if (events_host.length !==0) {
        eventsList_host = events_host.map((eventObj) => (
          <Card
            key={`Card_${eventObj._id}`}
            _id={eventObj._id}
            host={eventObj.host}
            hostID={eventObj.host_id}
            nameEvent = {eventObj.nameEvent}
            start = {eventObj.start}
            end = {eventObj.end}
            address = {eventObj.address}
            link = {eventObj.link}
            online_event = {eventObj.online_event}
            description = {eventObj.description}
            interested = {eventObj.interested}
            attending = {eventObj.attending}
            userId = {this.props.userId}
          />
        ));
      } else {
        eventsList_host = <div>You haven't host any event!</div>;
      }
    
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
            <h1> Contents you are hosting! </h1>
              <div>
                {eventsList_host}
              </div>
            <h1> Contents you are attending! </h1>
        </div>
      </div>
    );
  }
}

export default Profile;