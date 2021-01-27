import React, { Component } from "react";
import "../pages/Profile.css";

/**
 * Profile Left is a component in profile displaying personal detail
 * of a user.
 *
 * Proptypes
 * @param {user} user
 */

class ProfileLeft extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
          <>
          <div>
            <div className="profile-left-names">
                <h1 className="profile-nomargin"> {this.props.user.name} </h1>
                <h3 className="profile-nomargin"> {this.props.user.user_nickname} </h3>
                {/* <p className="profile-nomargin"> Rating: {this.props.user.rating} / 10 </p> */}
            </div>
            <div className="profile-left-details">
                <p className="profile-nomargin"> Based in: {this.props.user.based} </p>
                <p className="profile-nomargin"> Email: {this.props.user.email} </p>
                <p className="profile-nomargin"> Facebook: {this.props.user.facebook_name} </p>
            </div>
          </div>
          <div className="profile-left-boxes">
            <button type="submit" onClick={this.props.onclick}> Edit Profile </button>
          </div>
        </>
      );
    }
  }
  
  export default ProfileLeft;