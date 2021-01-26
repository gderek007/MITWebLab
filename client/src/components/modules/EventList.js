import React, { Component } from "react";
import Card from "./Card.js";

/**
 * EventList is a component that renders 
 * the list of all events card or null message.
 *
 * Proptypes
 * @param {string} userId
 * @param {string} events
 * @param {string} ishost
 * @param {string} null_msg
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
              key={`SingleEvent_${eventObj._id}`}
              eventObj = {eventObj}
              userId = {this.props.userId}
              ishost = {this.props.ishost}
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