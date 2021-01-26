import React, { Component } from "react";

import Card from "../modules/Card";
import { get } from "../../utilities";

import "./Timetable.css";

class Timetable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        events: [],
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
      let eventsList = null;
      const hasEvents = this.state.events.length !== 0;
      
      if (hasEvents) {
        eventsList = this.state.events.map((eventObj) => (
          <Card
            key={`Card_${eventObj._id}`}
            _id={eventObj._id}
            host={eventObj.host}
            hostID={eventObj.host_id}
            nameEvent = {eventObj.nameEvent}
            start = {eventObj.start}
            end = {eventObj.end}
            address = {eventObj.address}
            link = {eventObj.link}
            online_event = {eventObj.online_event}
            description = {eventObj.description}
            interested = {eventObj.interested}
            attending = {eventObj.attending}
            userId = {this.props.userId}
            eventObj = {eventObj}
          />
        ));
      } else {
        eventsList = <div>No events!</div>;
      }
      return (
        <div className="timetable-container">
          <div className="timetable-left">
            {eventsList}
          </div>
          <div className="timetable-right">
            <p> Filters </p>
          </div>
        </div>
      );
    }
}

export default Timetable