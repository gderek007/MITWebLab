import React, { Component } from "react";
import { get,post } from "../../utilities";

import "./Card.css";

class GoingInterested extends Component {
    constructor(props) {
        super(props);
        this.state = {
          attending: this.props.attending,
          interested: this.props.interested,
          attendingPressed: true,
          interestedPressed: true,
          userId: this.props.userId,
          eventId: this.props.eventId,
          eventsAttending: [],
          eventsInterested: [],
          eventObj: this.props.eventObj,
        };
      }

    componentDidMount() {
        get("/api/user", { userId: this.props.userId }).then((user) => {
            user.events_attending.map((eventAtt) => {
                this.setState({ eventsAttending: this.state.eventsAttending.concat([eventAtt]) });
                });
            user.events_interested.map((eventInt) => {
                this.setState({ eventsInterested: this.state.eventsInterested.concat([eventInt]) });
                });
            }).catch((e)=>console.log(e));
    }

    checkerInterested(){
        let eventsInt = this.state.eventsInterested;
        const eventId = this.state.eventObj._id;
        let checker = eventsInt.filter(e => e._id === eventId);
        if(checker.length > 0){
            const index = eventsInt.indexOf(eventId);
            eventsInt.splice(index);
            this.decrementInterested();
        }
        else{
            this.incrementInterested();
        }
    }

    decrementInterested() {
        this.setState({
            interested: this.state.interested - 1,             
        }, (e) => {
            const body = {
                user: this.state.userId,
                events_interested: this.state.eventsInterested,
                events_attending: this.state.eventsAttending,
                eventObj: this.state.eventObj
            };
            post("api/userevents", body).then((dec) => {
                const body2 = {
                    eventId: this.state.eventId,
                    amount: -1,
                };
                post("api/interested", body2).then().catch((e) => console.log("Error"));
            }).catch((e) => console.log("Error"));
        });
    }

    incrementInterested() {
        this.setState({
            interested: this.state.interested + 1, 
            eventsInterested: this.state.eventsInterested.concat([this.state.eventObj]),
        }, (e) => {
            const body = {
                user: this.state.userId,
                events_interested: this.state.eventsInterested,
                events_attending: this.state.eventsAttending,
                eventObj: this.state.eventObj
            };
            post("api/userevents", body).then((inc) => {
                const body2 = {
                    eventId: this.state.eventId,
                    amount: 1,
                };
                post("api/interested", body2).then().catch((e) => console.log("Error"));
            }).catch((e) => console.log("Error"));
        });
    }

    checkerAttending(){
        let eventsAtt = this.state.eventsAttending;
        const eventId = this.state.eventObj._id;
        let checker = eventsAtt.filter(e => e._id === eventId);
        if(checker.length > 0){
            const index = eventsAtt.indexOf(eventId);
            eventsAtt.splice(index);
            this.decrementAttending();
        }
        else{
            this.incrementAttending();
        }
    }

    decrementAttending() {
        this.setState({
            attending: this.state.attending - 1,             
        }, (e) => {
            const body = {
                user: this.state.userId,
                events_interested: this.state.eventsInterested,
                events_attending: this.state.eventsAttending,
                eventObj: this.state.eventObj
            };
            post("api/userevents", body).then((dec) => {
                const body2 = {
                    eventId: this.state.eventId,
                    amount: -1,
                };
                post("api/attending", body2).then().catch((e) => console.log("Error"));
            }).catch((e) => console.log("Error"));
        });
    }

    incrementAttending() {
        this.setState({
            attending: this.state.attending + 1, 
            eventsAttending: this.state.eventsAttending.concat([this.state.eventObj]),
        }, (e) => {
            const body = {
                user: this.state.userId,
                events_interested: this.state.eventsInterested,
                events_attending: this.state.eventsAttending,
                eventObj: this.state.eventObj
            };
            post("api/userevents", body).then((inc) => {
                const body2 = {
                    eventId: this.state.eventId,
                    amount: 1,
                };
                post("api/attending", body2).then().catch((e) => console.log("Error"));
            }).catch((e) => console.log("Error"));
        });
    }

    render() {
        return (
        <p>     
            {" Interested: " + this.state.interested}
            {" Going: " + this.state.attending}  
            {this.props.userId ? (
            <label>
              <button type="submit" onClick = {this.checkerInterested.bind(this)}>Interested?</button>
                <button type="submit" onClick = {this.checkerAttending.bind(this)}>Attending?</button>
            </label>) : (<div> </div>)}            
        </p>
        )};
}

export default GoingInterested;
