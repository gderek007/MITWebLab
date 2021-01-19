import React, { Component } from "react";
import "./SingleEvent.css";
/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} creatorName
 * @param {string} creator_id
 * @param {string} nameEvent 
 * @param {string} date
 * @param {string} address
 * @param {string} description
 * @param {number} interested
 * @param {number} attending
 */

class SingleEvent extends Component {
    constructor(props) {
      super(props);
    }

    incrementInterested() {
      this.interested += 1;
    }
  
    decrementInterested() {
      this.interested -= 1;
    }
  
    incrementAttending() {
      this.attending += 1;
    }
  
    decrementAttending() {
      this.attending -= 1;
    }

    formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options) + " "
    }

    render() {
      return (
      <div className = "Card-event">
        <div className = "Card-eventTitle " >
        {this.props.nameEvent + " "}
          <div className = "Card-eventUser u-inlineBlock ">
          By: {this.props.creatorName}
          </div>
        </div>
        
        <div className = "u-textLeft">
        {this.props.address + " on "}
        {this.formatDate(this.props.date)}
        {" Interested: " + this.props.interested}
        {" Going: " + this.props.attending}
        </div>
        <p>
        {this.props.description}
        </p>
        
      </div>
      );
    }
}

export default SingleEvent

// export class SingleEvent {
//   eventName: string;
//   creatorId: string;
//   creatorName: string;
//   address: string;
//   description: string;
//   date: Date;
//   interested: number;
//   attending: number;

//   constructor(eventName: string, creatorId: string, creatorName: string, 
//               address:string, description:string, date: Date, 
//               interested:number, attending:number) {
//     this.eventName = eventName;
//     this.creatorId = creatorId;
//     this.creatorName = creatorName;
//     this.address = address;
//     this.description = description;
//     this.date = date;
//     this.interested = interested;
//     this.attending = attending;
//   }


// }

