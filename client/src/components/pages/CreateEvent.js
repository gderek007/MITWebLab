import React, { Component } from "react";

import "./CreateEvent.css";
import { post } from "../../utilities";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import "react-datetime/css/react-datetime.css";
import DateTimePicker from "react-datetime-picker";

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

    // handleChangeAddress = (event) => {
    //   this.setState({
    //     address: event.target.value,
    //   });
    // };

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
        lat: this.state.lat,
        lng: this.state.lng,
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

    _suggestionSelect = (address, lat, lng, text) => {
      this.setState({
        address: address,
        lat: lat,
        lng: lng
      });
    }

    render() {
      return (
        <form>  

          <label>
            <input type="name" 
            onChange={this.handleChangeEvent.bind(this)} 
            value={this.state.eventName} 
            placeholder = {"Event Name"}/>
          </label>
  
          <label>
            {/* <input type="date" 
            onChange={this.handleChangeStart.bind(this)} 
            value={this.state.start} 
            placeholder = {"Start Time"}/> */}
            <DateTimePicker
              onChange={this.handleChangeStart.bind(this)} 
              value={this.state.start}
            />
          </label>

          <label>
            {/* <input type="date" 
            onChange={this.handleChangeEnd.bind(this)} 
            value={this.state.end} 
            placeholder = {"End Time"}/> */}
            <DateTimePicker
              onChange={this.handleChangeEnd.bind(this)} 
              value={this.state.end}
            />
          </label>

          <label>
            Online?
              <input type="checkbox" 
              checked={this.state.online_event}
              onChange={this.handleChangeOnline}
              />
          </label>

          <label>
            <input type="link" 
            onChange={this.handleChangeLink.bind(this)} 
            value={this.state.link}
            placeholder = {"Link"} />
          </label>

          <label>
          <MapboxAutocomplete publicKey = {API_TOKEN}
            inputClass='form-control search'
            onSuggestionSelect={this._suggestionSelect}
            country='us'
            resetSearch={false}/>
          </label>

          <label>
            <input type="description" 
            onChange={this.handleChangeDescription.bind(this)} 
            value={this.state.description}
            placeholder = {"Description"} />
          </label>

          <button type="submit" onClick = {this.addEvent}>Submit</button>
        </form>
      );
    }
  }

export default CreateEvent; 
