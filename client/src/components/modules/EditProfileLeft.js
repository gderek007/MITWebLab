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
             user_nickname: "",
             based: "",
             email: "",
             facebook_name: "",
         }
     }

     // TODO: Handle Change Function
     handleChangeName = (name) => {
        this.setState({
          name: name.target.value,
        });
      };

      handleChangeNickName = (nickName) => {
        this.setState({
          user_nickname: nickName.target.value,
        });
      };

      handleChangeBased = (based) => {
        this.setState({
          based: based.target.value,
        });
      };

      handleChangeEmail = (email) => {
        this.setState({
          email: email.target.value,
        });
      };

      handleChangeFacebook = (facebook) => {
        this.setState({
          facebook_name: facebook.target.value,
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
                <label>
                    <input type="nickname" 
                    onChange={this.handleChangeNickName.bind(this)} 
                    value={this.state.user_nickname} 
                    placeholder = {this.props.user.user_nickname}/>
                </label>
                <label>
                    <input type="based" 
                    onChange={this.handleChangeBased.bind(this)} 
                    value={this.state.based} 
                    placeholder = {this.props.user.based}/>
                </label>
                <label>
                    <input type="email" 
                    onChange={this.handleChangeEmail.bind(this)} 
                    value={this.state.email} 
                    placeholder = {this.props.user.email}/>
                </label>
                <label>
                    <input type="facebook" 
                    onChange={this.handleChangeFacebook.bind(this)} 
                    value={this.state.facebook_name} 
                    placeholder = {this.props.user.facebook_name}/>
                </label>
            </form>
         )
     }
 }

 export default EditProfileLeft;