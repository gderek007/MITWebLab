import React, { Component } from "react";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} creator_name
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

    render() {
      return (
      <div className = "Card-event">
        <p>
        {this.props.creatorName}
        {this.props.nameEvent}
        {this.props.date}
        {this.props.address}
        {this.props.description}
        {this.props.interested}
        {this.props.attending}
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

