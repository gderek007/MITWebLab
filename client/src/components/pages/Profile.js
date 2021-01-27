import React, { Component } from "react";
import { get, post } from "../../utilities";
import "./Profile.css";
import EventList from "../modules/EventList.js";
import ProfileLeft from "../modules/ProfileLeft.js";
import EditProfileLeft from "../modules/EditProfileLeft.js";

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
  
  render() {
    let host_event = this.state.events.filter(event => event.host_id === this.props.userId);
    let attend_event = this.state.events.filter(event => this.state.user.events_attending.includes(event._id));
    let interest_event = this.state.events.filter(event => this.state.user.events_interested.includes(event._id));

    if (!this.state.user) {
        return <div> Loading! </div>;
      };

    return (
      <div className="profile-container">
        {/* <div className="profile-left">
            <div className="profile-left-names">
                <h1 className="profile-nomargin"> {this.state.user.name} </h1>
                <h3 className="profile-nomargin"> {this.state.user.user_nickname} </h3>
                <p className="profile-nomargin"> Rating: {this.state.user.rating} / 10 </p>
            </div>
            <div className="profile-left-details">
                <p className="profile-nomargin"> Based in: {this.state.user.based} </p>
                <p className="profile-nomargin"> Email: {this.state.user.email} </p>
                <p className="profile-nomargin"> Facebook Name: {this.state.user.facebook_name} </p>
            </div>
        </div> */}
        <div className="profile-left">
          <div>
          { this.state.edit ? ( <>
            <p> editing </p>
            <EditProfileLeft user={this.state.user} onclick={this.onClick}/>
            </>
          ) :
            (<ProfileLeft user={this.state.user} onclick={this.onClick}/>)
          }
          </div>
        </div>
        <div className="profile-right">
          <div>
            <h2> Events you are Hosting! </h2>
              <EventList 
                userId={this.props.userId} 
                events={host_event}
                ishost={Boolean(true)}
                null_msg={"You haven't hosted any events"}
              />
          </div>
          <div>
            <h2>Events you are Attending!</h2>
            <EventList 
                userId={this.props.userId} 
                events={attend_event}
                ishost={Boolean(false)}
                null_msg={"You haven't attended any events"}
              />
            </div>
          <div>
            <h2>Events you are Interested in 🤔</h2>
            <EventList 
                userId={this.props.userId} 
                events={interest_event}
                ishost={Boolean(false)}
                null_msg={"Seems like your wishlist is empty"}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;