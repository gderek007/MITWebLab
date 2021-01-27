import React, { Component } from "react";
import GoingInterested from "./GoingInterested";

import "./SingleEvent.css";

/**
 * SingleEvent is a component that renders an event
 *
 * Proptypes
 * @param {string} userId
 * @param {string} eventObj
 */

class SingleEvent extends Component {
    constructor(props) {
      super(props);
    }

    formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "numeric"}
      return new Date(dateString).toLocaleDateString(undefined, options) + " "
    }

    isHost = (eventObj, userId) => {
      return (eventObj.host_Id === userId)
    }

    render() {
      return (
      <div className = "Card-event">
        <div className = "Card-eventTitle " >
        {this.props.eventObj.nameEvent + " "}
          <div className = "Card-eventUser u-inlineBlock">
          By: {this.props.eventObj.host}
          </div>
        </div>
        
        <div className = "u-textLeft">
          Starting on {this.formatDate(this.props.eventObj.start)}, 
          finishing on {this.formatDate(this.props.eventObj.end)}.
        </div>
        {this.props.eventObj.link ? (
        <div className = "u-textLeft">
          Link: {this.props.eventObj.link}
        </div>) : (
        <div className = "u-textLeft">
          Address: {this.props.eventObj.address}
        </div>)}
        {this.props.eventObj.isOnline ? (
          <div>
            This is an online event.
          </div> ) : (<> </>)}
        { (this.props.eventObj.host_id === this.props.userId) ? (
          <p> You are hosting this event.</p>
        ) : (
          <GoingInterested 
            userId = {this.props.userId}
            eventObj = {this.props.eventObj} /> )}
        <p>
        {this.props.eventObj.description}
        </p>
      </div>
      );
    }
}

export default SingleEvent

