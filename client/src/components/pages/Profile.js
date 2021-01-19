import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Profile.css";

/**
 * Component to render profile page
 *
 * Proptypes
 * @param {string} user object with user_id and user_name
 * @param {string} event filtered by user who created the events
 */

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-left">
            <span> Hey there </span>
        </div>
        <div className="profile-right">
            <span> Here is a test. </span>
        </div>
      </div>
    );
  }
}

export default Profile;