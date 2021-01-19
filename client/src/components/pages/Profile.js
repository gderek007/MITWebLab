import React, { Component } from "react";
import { get } from "../../utilities";
import { Link } from "@reach/router";
// import Card from "../modules/Card";
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
    get("/api/event", {host_id: this.props.userId}).then((events) => {
      this.setState({
        events: events,
      });
    });
  }

  componentDidMount() {
    document.title = "Profile Page";
    this.getUserData();  
    //this.loadCreatedEvent()
  }
  
  render() {
    if (!this.state.user) {
        return <div> Loading! </div>;
      };
    return (
      <div className="profile-container">
        <div className="profile-left">
            <h1> {this.state.user.name} </h1>
            <h2> {this.state.user.user_nickname} </h2>
            <p> Rating: {this.state.user.rating} / 10 </p>
        </div>
        <div className="profile-right">
            <span> Here is a test. </span>
        </div>
      </div>
    );
  }
}

export default Profile;