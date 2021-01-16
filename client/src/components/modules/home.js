import React, {Component} from "react";

import "./home.css";

class Home extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="home-bodycontainer">
                {/*Todo: I need a container for all of these*/}
                <h1 className="home-title">
                    {/*Todo: I need a class for title */}
                    Create a party!
                </h1>
                <h2 className="home-subtitle">
                    {/*Todo: I need a class for subtitle */}
                    Join! Have Fun!
                </h2>
                <digv>
                    {/*Todo: I need a class for all the buttons */}
                    <div>
                        {/*Todo: Button linking to Login*/}
                    </div>
                    <div>
                        {/*Todo: Button linking to event map*/}
                    </div>
                </div>
            </div>
        )
    } 
}

export default Home