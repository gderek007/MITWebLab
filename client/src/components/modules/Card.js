import React, { Component } from "react";
import { get } from "../../utilities";

import "./Card.css";
import SingleEvent from "./SingleEvent.js";
class Card extends Component {
    constructor(props) {
      super(props);
      this.state = {
        comments: [],
      };
    }

    componentDidMount() {
      get("/api/comment", { parent: this.props._id }).then((comment) => {
        this.setState({
          comments: comment,
        });
      });
    }

    makeCommentsReadable() {
      let comments = this.state.comments;
      let creator = "";
      for (let index = 0; index < comments.length; index++) {
        const element = comments[index];
        creator += element.creator_name + ": " + element.content + "\n";
      }
      return creator;
    }

    render() {
      let hasComments = this.state.comments.length !== 0;
      // if (hasComments){
      return (
        <div className="Card-container tooltip" >
            <span className="tooltiptext tooltip-inner" data-html="true">{hasComments ? this.makeCommentsReadable() : "No comments"}</span>
          <SingleEvent 
            creatorName={this.props.creatorName}
            creatorId={this.props.creatorId}
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