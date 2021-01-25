import React, { Component } from "react";

import "./CreateEvent.css";
import { post } from "../../utilities";

class CreateEvent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        eventName: "",
        start: "",
        end: "",
        online_event: false,
        address: "",
        link: "",
        description: "",
      };
    }

    handleChangeEvent = (event) => {
      this.setState({
        eventName: event.target.value,
      });
    };

    handleChangeStart = (event) => {
      this.setState({
        start: event.target.value,
      });
    };

    handleChangeEnd = (event) => {
      this.setState({
        end: event.target.value,
      });
    };

    handleChangeOnline = (event) => {
      this.setState({
        online_event: event.target.checked,
      });
    };

    handleChangeLink = (event) => {
      this.setState({
        link: event.target.value,
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
      const body = {
        nameEvent: this.state.eventName, 
        start: this.state.start,
        end: this.state.end,
        online_event: this.state.online_event, 
        address: this.state.address, 
        link: this.state.link,
        description: this.state.description, 
        interested: 0, 
        attending: 1}
        
      post("/api/addevent", body).then((event) => {
        this.setState({
          eventName:"",
          start:"",
          end:"",
          online_event:false,
          address:"",
          link:"",
          description:"",
        });
      }).catch((e) => console.log(e));
    }

    render() {
      return (
        <form>  
          <label>
            Event Name
            <input type="name" 
            onChange={this.handleChangeEvent.bind(this)} 
            value={this.state.eventName} />
          </label>
  
          <label>
            Start Time
            <input type="date" 
            onChange={this.handleChangeStart.bind(this)} 
            value={this.state.start} />
          </label>

          <label>
            End Time
            <input type="date" 
            onChange={this.handleChangeEnd.bind(this)} 
            value={this.state.end} />
          </label>

          <label>
            Online?
              <input type="checkbox" 
              checked={this.state.online_event}
              onChange={this.handleChangeOnline}
              />
          </label>

          <label>
            Link
            <input type="link" 
            onChange={this.handleChangeLink.bind(this)} 
            value={this.state.link} />
          </label>

          <label>
            Address
            <input type="address" 
            onChange={this.handleChangeAddress.bind(this)} 
            value={this.state.address} />
          </label>

          <label>
            Description
            <input type="description" 
            onChange={this.handleChangeDescription.bind(this)} 
            value={this.state.description} />
          </label>

          <button type="submit" onClick = {this.addEvent}>Submit</button>
        </form>
      );
    }
  }

export default CreateEvent; 
