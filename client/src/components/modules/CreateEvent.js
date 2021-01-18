import React, { Component } from "react";

import "./CreateEvent.css";
import { post } from "../../utilities";

class CreateEvent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        eventName:"",
        date:"",
        address:"",
        description:"",
      };
    }

    handleChangeEvent = (event) => {
      this.setState({
        eventName: event.target.value,
      });
    };

    handleChangeDate = (event) => {
      this.setState({
        date: event.target.value,
      });
    };

    handleChangeAddress = (event) => {
      this.setState({
        address: event.target.value,
      });
    };

    handleChangeDescription = (event) => {
      this.setState({
        description: event.target.value,
      });
    };

    addEvent = () => {
      const body = {nameEvent: this.state.eventName, date:this.state.date, address:this.state.address, description:this.state.description, interested:0, attending:0}
      console.log(body);
      post("/api/addevent", body).then((event) => {
        console.log("posting");
      }).catch((e) => console.log(e));
    }

    render() {
      return (
        <form>  
          <label>
            Event Name
            <input type="name" onChange={this.handleChangeEvent.bind(this)} value={this.state.eventName} />
          </label>
  
          <label>
            address
            <input type="address" onChange={this.handleChangeAddress.bind(this)} value={this.state.address} />
          </label>
  
          <label>
            Date
            <input type="date" onChange={this.handleChangeDate.bind(this)} value={this.state.date} />
          </label>

          <label>
            Description
            <input type="description" onChange={this.handleChangeDescription.bind(this)} value={this.state.description} />
          </label>
  
          <button type="submit" onClick = {this.addEvent}>Submit</button>
        </form>
      );
    }
  }

export default CreateEvent; 
