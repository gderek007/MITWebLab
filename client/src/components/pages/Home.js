import React, {Component} from "react";
import { Link } from "@reach/router";

import "./Home.css";

class Home extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="home-container">
                <div className="home-bodycontainer">
                    <h1 className="home-title">
                        Create a party!
                    </h1>
                    <h2 className="home-subtitle">
                        Join! Have Fun!
                    </h2>
                    <div className="home-buttoncontainer">
                        <Link to="/timetable" className="home-button1">
                            Event Timetable
                        </Link>
                        {this.props.userId ? (
                        <Link to={`/profile/${this.props.userId}`} className="home-button2">
                            Your Profile
                        </Link>
                        ) : (
                        <Link to="/map" className="home-button2">
                            {/* Can I do a login button here? */}
                            Event Map
                        </Link>
                        )}
                    </div>
                </div>
            </div>
        )
    } 
}

export default Home