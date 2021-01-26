import React, { Component } from "react";
import "./Profile.css";

class ProfileLeft extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
          <>
            <div className="profile-left-names">
                <h1 className="profile-nomargin"> {this.props.user.name} </h1>
                <h3 className="profile-nomargin"> {this.props.user.user_nickname} </h3>
                <p className="profile-nomargin"> Rating: {this.props.user.rating} / 10 </p>
            </div>
            <div className="profile-left-details">
                <p className="profile-nomargin"> Based in: {this.props.user.based} </p>
                <p className="profile-nomargin"> Email: {this.props.user.email} </p>
                <p className="profile-nomargin"> Facebook: {this.props.user.facebook_name} </p>
            </div>
        </>
      );
    }
  }
  
  export default ProfileLeft;