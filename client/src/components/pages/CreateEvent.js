import React, { Component } from "react";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import DateTimePicker from "react-datetime-picker";

import "./CreateEvent.css";
import "react-datetime/css/react-datetime.css";

import { post } from "../../utilities";

const API_TOKEN = "pk.eyJ1IjoibXBlcmF6YTA3MTQiLCJhIjoiY2trM2wxaXcyMTRwaTJ4cGpiaXQ3bjltNiJ9.a8AxmhpMBO7jfrD3s190Yg";

class CreateEvent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        eventName: "",
        start: null,
        end: null,
        online_event: false,
        address: "",
        lat: "",
        lng: "",
        link: "",
        description: "",
      };
    }

    handleChangeEvent = (event) => {
      this.setState({
        eventName: event.target.value,
      });
    };

    handleChangeStart = (value) => {
      this.setState({
        start: value,
      });
    };

    handleChangeEnd = (value) => {
      this.setState({
        end: value,
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
    
    handleChangeAddress(address,lat,lng) {
      this.setState({
        address: address,
        lat: lat,
        lng: lng
      });
    }

    handleChangeDescription = (event) => {
      this.setState({
        description: event.target.value,
      });
    };

    addEvent = () => {
      let condition1 = (this.state.address === "" && this.state.link === "");
      let condition2 = (new Date(this.state.start) > new Date(this.state.end));
      if(condition1){
        window.alert("Your event must have a link or address!!");
        return;
      }
      else if(condition2){
        window.alert("Start date cannot be greater than end date!");
        return;
      }

      const body = {
        host: this.props.user.name,
        host_id: this.props.user._id,
        nameEvent: this.state.eventName, 
        start: this.state.start,
        end: this.state.end,
        online_event: this.state.online_event, 
        address: this.state.address, 
        lat: this.state.lat,
        lng: this.state.lng,
        link: this.state.link,
        description: this.state.description, 
        interested: 0, 
        attending: 1}
        
      post("/api/addevent", body).then((event) => {
        if(!condition1 || !condition2){
        this.setState({
          eventName:"",
          start:"",
          end:"",
          online_event:false,
          address:"",
          link:"",
          description:"",
        });
      }
      }).catch((e) => console.log(e));
    }

    _suggestionSelect = (address, lat, lng, text) => {
      this.setState({
        address: address,
        lat: lat,
        lng: lng
      });
    }

    render() {
      return (
        <div className="CreateEvent-container">
        <h1> Let's get started! </h1>
        <form className="CreateEvent-form"> 
          <div className="CreateEvent-form CreateEvent-div">
          <label className="CreateEvent-label">
            Name of Events: 
          </label>
          <input type="name" 
            onChange={this.handleChangeEvent.bind(this)} 
            value={this.state.eventName} 
            placeholder = {"Event Name"} required
            className="CreateEvent-input"
            />
          </div>
  
          <div className="CreateEvent-form CreateEvent-div">
          <label className="CreateEvent-label">
            Start Time: 
          </label>
          <div className="CreateEvent-input">
          <DateTimePicker
              onChange={this.handleChangeStart.bind(this)} 
              value={this.state.start}
              required
            />
          </div>
          </div>

          <div className="CreateEvent-form CreateEvent-div">
          <label className="CreateEvent-label">
            End Time:   
          </label>
          <div className="CreateEvent-input">
          <DateTimePicker
              onChange={this.handleChangeEnd.bind(this)} 
              value={this.state.end}
              required
            />
          </div>
          </div>

          <div className="CreateEvent-form CreateEvent-div">
          <label className="CreateEvent-label">
            Online?
          </label>
          <input type="checkbox" 
              checked={this.state.online_event}
              onChange={this.handleChangeOnline}
              className="CreateEvent-input"
              />
          </div>

          <div className="CreateEvent-form CreateEvent-div">
          <label className="CreateEvent-label">
            Link:
          </label>
          <input type="link" 
            onChange={this.handleChangeLink.bind(this)} 
            value={this.state.link}
            placeholder = {"Link"} 
            className="CreateEvent-input"
            />
          </div>

          <div className="CreateEvent-form CreateEvent-div">
          <label className="CreateEvent-label">
            Address:
          </label>
          <div className="CreateEvent-input">
          <MapboxAutocomplete publicKey = {API_TOKEN}
            inputClass='form-control search'
            onSuggestionSelect={this._suggestionSelect}
            country='us'
            placeholder='Address'
            resetSearch={false}/>
          </div>
          </div>

          <div className="CreateEvent-form CreateEvent-div">
          <label className="CreateEvent-label">
            Description:
          </label>
          <input type="description" 
            onChange={this.handleChangeDescription.bind(this)} 
            value={this.state.description}
            placeholder = {"Description"} 
            className="CreateEvent-input CreateEvent-description"
            required/>
          </div>
          <button type="submit" onClick = {this.addEvent}>Add an event!</button>
        </form>
        </div>
      );
    }
  }

export default CreateEvent; 
