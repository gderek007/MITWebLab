import React, { Component } from "react";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} content of the comment
 * @param {string} creator_id 
 * @param {string} creator_name
 */
class SingleComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <Link to={`/profile/${this.props.creator_id}`} className="u-link u-bold">
          {this.props.creator_name}
        </Link> */}
        <span> {this.props.creator_name + " | " + this.props.content} </span>
      </div>
    );
  }
}

export default SingleComment;
