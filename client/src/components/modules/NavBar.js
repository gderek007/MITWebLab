import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "823259936339-2eouvi1d9c3apa96icuc7f5vdlincdk9.apps.googleusercontent.com";

class NavBar extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
        <nav className="NavBar-container">
            <div className="NavBar-title u-inlineBlock">Eventinder</div>
            <div className="NavBar-linkContainer u-inlineBlock">
            <Link to="/" className="NavBar-link">
                Portal
            </Link>
            <Link to="/" className="NavBar-link">
                Map
            </Link>
            <Link to="/" className="NavBar-link">
                Friends
            </Link>
            <Link to="/" className="NavBar-link">
                Profile
            </Link>
            <Link to="/" className="NavBar-link">
                Add Event
            </Link>
            {/* {this.props.userId && (
                <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
                Profile
                </Link>
            )} */}
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
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
