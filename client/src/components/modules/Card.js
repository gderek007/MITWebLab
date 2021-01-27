import React, { Component } from "react";
import {get, post} from "../../utilities";
import Comment from "../../../../server/models/comment.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Card.css";
import SingleEvent from "./SingleEvent.js";
import SingleComment from "./SingleComment.js";

/**
 * Card is a component that renders 
 * the events card containing all details of events.
 *
 * Proptypes
 * @param {string} event_Id
 * @param {string} key
 * @param {string} eventObj
 * @param {string} userId
 * @param {string} ishost (hard coded for now)
 */

class Card extends Component {
    constructor(props) {
      super(props);
      this.state = {
        comments: [],
        content:'',
        attending: false,
        going: false,
      };
    }

    componentDidMount() {
      get("/api/comment", { parent: this.props.event_Id }).then((comment) => {
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
      const body = {content: this.state.content, parent:this.props.event_Id };
      const newComment = new Comment({
        creator_name: this.props.user.name,
        creator_id: this.props.userId,
        content: this.state.content,
        parent: this.props.event_Id,
      });

      post("/api/comment", body).then((event) => {
        this.setState({
          comments: [newComment].concat(this.state.comments),
          content: '',
        });
      }).catch((e) => console.log(e));
    }

    render() {
      let comments = this.state.comments;
      let hasComments = this.state.comments.length !== 0;
      return (
        <div className="Card-container tooltip" >
            {/* <span className="tooltiptext tooltip-inner" data-html="true">{hasComments ? this.makeCommentsReadable() : "No comments"}</span> */}
          <SingleEvent 
            userId = {this.props.userId}
            eventObj = {this.props.eventObj}
            ishost = {this.props.ishost}
          />
          <div>
            {/* this.makeCommentsReadable() */}
            {comments.map((comment) => (
              <SingleComment
                key={`SingleComment_${comment._id}`}
                _id={comment._id}
                creator_name={comment.creator_name}
                creator_id={comment.creator_id}
                content={comment.content}
              />
          ))}
          </div>
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