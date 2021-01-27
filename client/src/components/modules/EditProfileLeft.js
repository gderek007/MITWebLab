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

      statetobody = (state) => {
        let new_name = this.state.name;
        let new_user_nickname = this.state.user_nickname;
        let new_based = this.state.based;
        let new_email = this.state.email;
        let new_facebook_name = this.state.facebook_name;

        if (!new_name) {new_name = this.props.user.name};
        if (!new_user_nickname) {new_user_nickname = this.props.user.user_nickname};
        if (!new_based) {new_based = this.props.user.based};
        if (!new_email) {new_email = this.props.user.email};
        if (!new_facebook_name) {new_facebook_name = this.props.user.facebook_name};

        return {
          name: new_name, 
          user_nickname: new_user_nickname,
          based: new_based,
          email: new_email, 
          facebook_name: new_facebook_name,
        }
      }

     onSubmit = () => {
      const body = this.statetobody(this.state);
        
      post("/api/userupdate", body).then((event) => {
        this.setState({
          name: "",
          user_nickname: "",
          based: "",
          email: "",
          facebook_name: "",
        });
      }).catch((e) => console.log(e));
    }

     // TODO: Rendering
     render() {
         return (
           <>
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
            <div className="profile-left-boxes">
              <button type="submit" onClick={this.onSubmit}> Submit </button>
            </div>
          </>
         )
     }
 }

 export default EditProfileLeft;