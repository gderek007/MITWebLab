import React, { Component } from "react";

import Card from "../modules/Card";
import { get } from "../../utilities";

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
      let hasEvents;
      let cardList = null;
      let eventsList = null;
      if(this.state.eventsAttending){
        hasEvents = this.state.eventsAttending.length !== 0;
        eventsList = this.state.eventsAttending;
        console.log(hasEvents);
      }
      else if (this.state.eventsInterested) {
        hasEvents = this.state.eventsInterested.length !== 0;
        eventsList = this.state.eventsInterested;
      }
      else{
        hasEvents = this.state.events.length !== 0;
        eventsList = this.state.events;
      }
      
      
      if (hasEvents) {
        cardList = eventsList.map((eventObj) => (
          <Card
            key={`Card_${eventObj._id}`}
            userId = {this.props.userId}
            eventObj = {eventObj}
          />
        ));
      } else {
        cardList = <div>No events!</div>;
      }
      return (
        <div className="timetable-container">
          <div className="timetable-left">
            {cardList}
          </div>
          <div className="timetable-right">
            <p> Filters </p>
          </div>
        </div>
      );
    }
}

export default Timetable