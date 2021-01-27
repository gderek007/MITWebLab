import React, { Component } from "react";
import Comment from "../../../../server/models/comment.js";

import SingleEvent from "./SingleEvent.js";
import SingleComment from "./SingleComment.js";

import "./Card.css";

import {get, post} from "../../utilities";

/**
 * Card is a component that renders 
 * the events card containing all details of events.
 *
 * Proptypes
 * @param {string} event_Id
 * @param {string} key
 * @param {string} eventObj
 * @param {string} userId
 * @param {string} user
 * @param {Boolean} isUserProfile
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

    addComment() {
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
          <SingleEvent 
            userId = {this.props.userId}
            eventObj = {this.props.eventObj}
            isUserProfile= {this.props.isUserProfile}
          />
          <div>
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