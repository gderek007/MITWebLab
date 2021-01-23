import React, { Component } from "react";
import NewPostInput from "./NewPostInput.js";
import "./NewPostInput.css";
import { post } from "../../utilities";
/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
class NewComment extends Component {
  constructor(props) {
    super(props);
  }

  addComment = (value) => {
    const body = { parent: this.props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      this.props.addNewComment(comment);
    });
  };

  render() {
    return <NewPostInput defaultText="New Comment" onSubmit={this.addComment} />;
  }
}

export default NewComment;