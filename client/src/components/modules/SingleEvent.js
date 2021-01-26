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
        {this.props.eventObj.nameEvent + " "}
          <div className = "Card-eventUser u-inlineBlock">
          By: {this.props.eventObj.host}
          </div>
        </div>
        
        <div className = "u-textLeft">
          Starting on {this.formatDate(this.props.eventObj.start)}, 
          finishing on {this.formatDate(this.props.eventObj.end)}.
        </div>
        <div className = "u-textLeft">
          Link: {this.props.eventObj.link}
        </div>
        <div className = "u-textLeft">
          Address: {this.props.eventObj.address}
        </div>
        {this.props.eventObj.isOnline ? (
          <div>
            This is an online event.
          </div> ) : (<> </>)}
        <GoingInterested 
          userId = {this.props.userId}
          eventObj = {this.props.eventObj}/>
        <p>
        {this.props.eventObj.description}
        </p>
      </div>
      );
    }
}

export default SingleEvent

