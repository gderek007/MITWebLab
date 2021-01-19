import React, { Component } from "react";
import { get } from "../../utilities";

import "./Card.css";
import SingleEvent from "./SingleEvent.js";
class Card extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      get("/api/comment", { parent: this.props._id }).then((comments) => {
        this.setState({
          comments: comments,
        });
      });
    }

    addNewComment = (commentObj) => {
      this.setState({
        comments: this.state.comments.concat([commentObj]),
      });
    };

    render() {
      return (
        <div className="Card-container">
          <SingleEvent 
          creator_name={this.props.creator_name}
          creator_id={this.props.creator_id}
          nameEvent = {this.props.nameEvent}
          date = {this.props.date}
          address = {this.props.address}
          description = {this.props.description}
          interested = {this.props.interested}
          attending = {this.props.attending}
          />
          
        </div>
      );
    }
}

export default Card