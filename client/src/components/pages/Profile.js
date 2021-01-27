import React, { Component } from "react";
import EventList from "../modules/EventList.js";
import SocialTime from "../modules/SocialTime.js";
import ProfileLeft from "../modules/ProfileLeft.js";
import EditProfileLeft from "../modules/EditProfileLeft.js";

import "./Profile.css";

import { get } from "../../utilities";

/**
 * Component to render profile page
 *
 * Proptypes
 * @param {string} userId
 */

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: undefined,
        events: [],
        edit: Boolean(false),
      };
  }

  getUserData = () => {
    get("/api/user", {userId: this.props.userId}).then((user) => this.setState({ user: user }));
  };

  getEventsData = () => {
    get("/api/events").then((event) => this.setState({events: event}))
  };

  componentDidMount() {
    document.title = "Profile Page";
    this.getUserData();    
    this.getEventsData();
  }

  onClick = () => {
    console.log("Clicked");
    if (this.state.edit) {
      this.setState({edit: Boolean(false)});
    } else {
      this.setState({edit: Boolean(true)});
    }
  }
  
  currentDate(d){
    d = new Date(d);
      var day = d.getDay(),
          diff = d.getDate() ; 
      return new Date(d.setDate(diff));
  }

  upcomingEvents(events){
    const today = this.currentDate(new Date());
    let upcoming = events.filter((e) => (new Date(e.start) >= today) )
    return upcoming;
  }

  pastEvents(events){
    const today = this.currentDate(new Date());
    let upcoming = events.filter((e) => (new Date(e.start) < today) )
    return upcoming;
  }

  render() {
    if (!this.state.user) {
        return <div> Loading! </div>;
      }
    else {    
      let host_event = (this.state.events.filter(event => event.host_id === this.props.userId));
      let attend_event = (this.state.user.events_attending.filter(event => event.host_id !== this.props.userId));
      let interest_event = (this.state.user.events_interested.filter(event => event.host_id !== this.props.userId));
      return (
        <div className="profile-container">
          <div className="profile-left">
            <div>
              { this.state.edit ? ( <>
                <p> Now editing your profile. </p>
                <EditProfileLeft user={this.state.user} onclick={this.onClick}/>
                </>
              ) :
              (<ProfileLeft user={this.state.user} onclick={this.onClick}/>)
              }
            </div>
          </div>
        <div className="profile-right">
          <div>
            <SocialTime
            user={this.state.user}
            hostEvents={host_event}
            eventsAttending={attend_event}
            eventsInterested={interest_event}
            />
          </div>
          <div>
            <h2> Events you are Hosting! </h2>
            <div className = "childDiv">
              <EventList 
                user={this.state.user}
                userId={this.props.userId} 
                events={this.upcomingEvents(host_event)}
                null_msg={"You haven't hosted any events"}
                isUserProfile={Boolean(true)}
              />
            </div>
          </div>
          <div>
            <h2>Events you are Attending!</h2>
            <div className = "childDiv">
              <EventList 
                user={this.state.user}
                userId={this.props.userId} 
                events={this.upcomingEvents(attend_event)}
                null_msg={"You haven't attended any events"}
                isUserProfile={Boolean(false)}
              />
            </div>
          </div>
          <div>
            <h2>Events you are Interested in 🤔</h2>
            <div className = "childDiv">
              <EventList 
                user={this.state.user}
                userId={this.props.userId} 
                events={this.upcomingEvents(interest_event)}
                null_msg={"Seems like your wishlist is empty"}
                isUserProfile={Boolean(false)}
              />
            </div>
          </div>
          <div>
            <h2>Your Past Events</h2>
            <div className = "childDiv">
              <EventList 
                user={this.state.user}
                userId={this.props.userId} 
                events={this.pastEvents(attend_event.concat(host_event))}
                ishost={Boolean(false)}
                null_msg={"Seems like your wishlist is empty"}
                isUserProfile={Boolean(false)}
              />
            </div>
          </div>
        </div>
      </div>
    );}
  }
}

export default Profile;