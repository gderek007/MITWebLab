import React, { Component } from "react";

import { get } from "../../utilities";
import "../../utilities.css";

import EventList from "../modules/EventList.js";

import "./Timetable.css";

class Timetable extends Component {
    constructor(props) {
      super(props);
      const today = this.currentDate(new Date());
      this.state = {
        events: [],
        eventsAttending: this.props.eventsAttending,
        eventsInterested: this.props.eventsInterested,
        today: today,

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

    currentDate(d){
      d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() ; 
        return new Date(d.setDate(diff));
    }

    upcomingEvents(){
      let upcoming = this.state.events.filter((e) => (new Date(e.start) >= this.state.today) )
      return upcoming;
    }

    render() {
      return (
        <div className="timetable-container ">
          <div className="timetable-left parentDiv">
            <EventList 
                userId={this.props.userId} 
                user={this.props.user}
                events={this.upcomingEvents()}
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