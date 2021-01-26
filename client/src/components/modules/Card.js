import React, { Component } from "react";
import {get, post} from "../../utilities";
import Comment from "../../../../server/models/comment.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Card.css";
import SingleEvent from "./SingleEvent.js";

class Card extends Component {
    constructor(props) {
      super(props);
      this.state = {
        comments: [],
        content:'',
        attending: false,
        going:false,
      };
    }

    componentDidMount() {
      get("/api/comment", { parent: this.props._id }).then((comment) => {
        this.setState({
          comments: comment,
        });
      });
    }

    handleChangeComment = (event) => {
      this.setState({
        content: event.target.value,
      });
    };

    makeCommentsReadable() {
      let comments = this.state.comments;
      let creator = "";
      for (let index = 0; index < comments.length; index++) {
        const element = comments[index];
        creator += element.creator_name + ": " + element.content + "\n";
      }
      return creator;
    }

    addComment = () => {
      const body = {content: this.state.content, parent:this.props._id };
      const newComment = new Comment({
        // creator_name: this.props.creatorName,
        // creator_id: this.props.creatorID,
        content: this.state.content,
        parent: this.props._id,
      });

      post("/api/comment", body).then((event) => {
        this.setState({
          comments: [newComment].concat(this.state.comments),
          content: '',
        });
      }).catch((e) => console.log(e));
    }

    render() {
      let hasComments = this.state.comments.length !== 0;
      return (
        <div className="Card-container tooltip" >
            <span className="tooltiptext tooltip-inner" data-html="true">{hasComments ? this.makeCommentsReadable() : "No comments"}</span>
          <SingleEvent 
            host = {this.props.host}
            hostId = {this.props.hostId}
            nameEvent = {this.props.nameEvent}
            start = {this.props.start}
            end = {this.props.end}
            address = {this.props.address}
            link = {this.props.link}
            isOnline = {this.props.online_event}
            description = {this.props.description}
            interested = {this.props.interested}
            attending = {this.props.attending}
            userId = {this.props.userId}
            _id = {this.props._id}
          />
          {this.props.userId ? (
            <label>
              Comment
              <input type="name" onChange={this.handleChangeComment.bind(this)} value={this.state.content}/>
              <button type="submit" onClick = {this.addComment}>Submit</button>
            </label>) : (<div> </div>)}
        </div>
        );
      }
    }

export default Card