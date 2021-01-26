import React, { Component } from "react";
import {post} from "../../utilities";
import "../pages/Profile.css";
import "./EditProfileLeft.css";

/**
 * EditProfileLeft is a component in profile allowing people to 
 * change their personel.
 *
 * Proptypes
 * @param {user} user
 */

 class EditProfileLeft extends Component {
     constructor(props) {
         super(props);
         this.state = {
             name: "",
         }
     }

     // TODO: Handle Change Function
     handleChangeName = (name) => {
        this.setState({
          name: name.target.value,
        });
      };

     // Updating User Details

     // TODO: Rendering
     render() {
         return (
             <form>
                 <label>
                    <input type="name" 
                    onChange={this.handleChangeName.bind(this)} 
                    value={this.state.name} 
                    placeholder = {this.props.user.name}/>
                </label>
            </form>
         )
     }
 }

 export default EditProfileLeft;