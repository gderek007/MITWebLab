import React, { Component } from "react";

import { get } from "../../utilities";
import EventList from "../modules/EventList.js";

import "./Timetable.css";

class Timetable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        events: [],
        eventsAttending: this.props.eventsAttending,
        eventsInterested: this.props.eventsInterested,

      };
    }

    componentDidMount() {
      document.title = "Timetable";
      get("/api/events").then((eventObjs) => {
        let reversedEventObjs = eventObjs.reverse();
        reversedEventObjs.map((eventObj) => {
          this.setState({ events: this.state.events.concat([eventObj]) });
        });
      });
    }

    render() {
      return (
        <div className="timetable-container">
          <div className="timetable-left">
            <EventList 
                userId={this.props.userId} 
                user={this.props.user}
                events={this.state.events}
                ishost={Boolean(false)}
                null_msg={"There is no events! Come and create one!"}
            />
          </div>
          <div className="timetable-right">
            <p> List of Filters </p>
          </div>
        </div>
      );
    }
}

export default Timetable