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
      document.title = "Time Table";
      console.log("event request");
      get("/api/events").then((eventObjs) => {
        let reversedEventObjs = eventObjs.reverse();
        reversedEventObjs.map((eventObj) => {
          console.log(eventObj);
          this.setState({ events: this.state.events.concat([eventObj]) });
        });
      });
      console.log("event request done");
    }

    render() {
      let eventsList = null;
      const hasEvents = this.state.events.length !== 0;
      
      if (hasEvents) {
        eventsList = this.state.events.map((eventObj) => (
          <Card
            key={`Card_${eventObj._id}`}
            _id={eventObj._id}
            creator_name={eventObj.host}
            creator_id={eventObj.host_id}
            nameEvent = {eventObj.nameEvent}
            date = {eventObj.date}
            address = {eventObj.address}
            description = {eventObj.description}
            interested = {eventObj.interested}
            attending = {eventObj.attending}
          />
        ));
      } else {
        eventsList = <div>No events!</div>;
      }
      return (
        <>
          {eventsList}
        </>
      );
    }
}

export default Timetable