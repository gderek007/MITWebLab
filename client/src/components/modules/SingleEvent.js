import React, { Component } from "react";
import "./SingleEvent.css";
import GoingInterested from "./GoingInterested";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} host
 * @param {string} hostId
 * @param {string} nameEvent 
 * @param {Date} start
 * @param {Date} end
 * @param {string} address
 * @param {string} link
 * @param {string} isOnline (online_event)
 * @param {string} description
 * @param {number} interested
 * @param {number} attending
 */

class SingleEvent extends Component {
    constructor(props) {
      super(props);
    }

    formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric", weekday: "short", hour: "numeric", minute: "numeric"}
      return new Date(dateString).toLocaleDateString(undefined, options) + " "
    }

    render() {
      return (
      <div className = "Card-event">
        <div className = "Card-eventTitle " >
        {this.props.nameEvent + " "}
          <div className = "Card-eventUser u-inlineBlock">
          By: {this.props.host}
          </div>
        </div>
        
        <div className = "u-textLeft">
          Starting on {this.formatDate(this.props.start)}, 
          finishing on {this.formatDate(this.props.end)}.
        </div>
        <div className = "u-textLeft">
          Link: {this.props.link}
        </div>
        <div className = "u-textLeft">
          Address: {this.props.address}
        </div>
        {this.props.isOnline ? (
          <div>
            This is an online event.
          </div> ) : (<> </>)}
        <GoingInterested 
          interested = {this.props.interested}
          attending = {this.props.attending}
          userId = {this.props.userId}
          eventId = {this.props._id}/>
        <p>
        {this.props.description}
        </p>
      </div>
      );
    }
}

export default SingleEvent

