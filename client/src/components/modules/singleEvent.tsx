// import React, { Component } from "react";
// class SingleEvent extends Component {
//     constructor(props) {
//       super(props);
//     }

//     // render() {
//     // }
// }

// export default SingleEvent

export class SingleEvent {
  eventName: string;
  creatorId: string;
  creatorName: string;
  address: string;
  description: string;
  date: Date;
  interested: number;
  attending: number;

  constructor(eventName: string, creatorId: string, creatorName: string, 
              address:string, description:string, date: Date, 
              interested:number, attending:number) {
    this.eventName = eventName;
    this.creatorId = creatorId;
    this.creatorName = creatorName;
    this.address = address;
    this.description = description;
    this.date = date;
    this.interested = interested;
    this.attending = attending;
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
}

