import React, {Component} from "react";

import "./home.css";

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
                        <p style={{color: 'white'}}> Hi guys! </p>
                    </div>
                </div>
            </div>
        )
    } 
}

export default Home