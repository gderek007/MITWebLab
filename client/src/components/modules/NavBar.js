import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const googleID = "823259936339-2eouvi1d9c3apa96icuc7f5vdlincdk9.apps.googleusercontent.com";
class NavBar extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
        <nav className="NavBar-container">
            <div className="NavBar-title u-inlineBlock">
            <Link to="/" className="NavBar-link">
                Eventinder
            </Link></div>
            
            <div className="NavBar-linkContainer u-inlineBlock">
            <Link to="/timetable" className="NavBar-link">
                Portal
            </Link>
            <Link to="/map" className="NavBar-link">
                Map
            </Link>
            {this.props.userId && (
            <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
              Profile
            </Link>
            )}
          {this.props.userId ? (
            <>
            {/* We won't implement the following for now:
            <Link to="/friends" className="NavBar-link">
              Friends
            </Link> */}
            <Link to="/addevent" className="NavBar-link">
              Add Event
            </Link>
            <GoogleLogout
              clientId={googleID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
            </>
          ) : (
            <GoogleLogin
              clientId={googleID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
        </nav>
        );
    }
}

export default NavBar;
