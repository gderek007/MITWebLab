import React, { Component } from "react";
import Card from "./Card.js";

/**
 * EventList is a component that renders 
 * the list of all events card or null message.
 *
 * Proptypes
 * @param {string} userId
 * @param {string} user
 * @param {string} events
 * @param {string} null_msg
 * @param {Boolean} isUserProfile
 */

class EventList extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
        let eventsList = null;
        if (this.props.events.length!==0) {
          eventsList = this.props.events.map((eventObj) => (
            <Card
              event_Id = {eventObj._id}
              key={`SingleEvent_${eventObj._id}`}
              eventObj = {eventObj}
              userId = {this.props.userId}
              user = {this.props.user}
              isUserProfile= {this.props.isUserProfile}
            />
          ));
        } else {
          eventsList = <div> {this.props.null_msg} </div>;
        }
      return (
        <div> {eventsList} </div>
      );
    }
  }
  
  export default EventList;