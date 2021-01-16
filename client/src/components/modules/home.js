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
                    <div>
                        {/*Todo: I need a class for all the buttons */}
                        <div>
                            {/*Todo: Button linking to Login*/}
                        </div>
                        <div>
                            {/*Todo: Button linking to event map*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}

export default Home