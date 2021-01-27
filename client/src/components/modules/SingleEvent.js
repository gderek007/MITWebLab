import React, { Component } from "react";
import "./SingleEvent.css";
import GoingInterested from "./GoingInterested";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} userId
 * @param {string} eventObj
 * @param {string} ishost
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
        {this.props.ishost ? (<> </>) : (
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

