import React, { Component } from "react";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import DateTimePicker from "react-datetime-picker";
import {post} from "../../utilities";
import "../pages/Profile.css";
import "./EditProfileLeft.css";

const API_TOKEN = "pk.eyJ1IjoibXBlcmF6YTA3MTQiLCJhIjoiY2trM2wxaXcyMTRwaTJ4cGpiaXQ3bjltNiJ9.a8AxmhpMBO7jfrD3s190Yg";

/**
 * EditEvent is a component in profile allowing people to 
 * change their personel.
 *
 * Proptypes
 * @param {event} eventObj
 */

 class EditEvent extends Component {
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
  
      statetobody = (state) => {
        // eventName: "",
        // start: null,
        // end: null,
        // online_event: false,
        // address: "",
        // lat: "",
        // lng: "",
        // link: "",
        // description: "",
        let new_eventName = this.state.eventName;
        let new_start = this.state.start;
        let new_end = this.state.end;
        let new_online_event = this.state.online_event;
        let new_address = this.state.address;
        let new_lat = this.state.lat;
        let new_lng = this.state.lng;
        let new_link = this.state.link;
        let new_description = this.state.description;

        if (!new_eventName) {new_eventName = this.props.eventObj.nameEvent};
        if (!new_start) {new_start = this.props.eventObj.start};
        if (!new_end) {new_end = this.props.eventObj.end};
        if (!new_address) {new_address = this.props.eventObj.address};
        if (!new_lat) {new_lat = this.props.eventObj.new_lat};
        if (!new_lng) {new_lng = this.props.eventObj.new_lng};
        if (!new_link) {new_link = this.props.eventObj.new_link};
        if (!new_description) {new_description = this.props.eventObj.description};

        if(new Date(new_start) > new Date(new_end)){
            throw "Start date cannot be greater than end date!";}

        return {
            event_id: this.props.eventObj._id,
            nameEvent: new_eventName, 
            start: new_start,
            end: new_end,
            online_event: new_online_event, 
            address: new_address, 
            lat: new_lat,
            lng: new_lng,
            link: new_link,
            description: new_description, 
        }
      }

      updateEvent = () => {
        const body = this.statetobody(this.state)
          
        post("/api/updateevent", body).then((event) => {
          if(!(new Date(body.start) > new Date(body.end))){
          this.setState({
            eventName: "",
            start: null,
            end: null,
            online_event: false,
            address: "",
            lat: "",
            lng: "",
            link: "",
            description: "",
          });};
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
              <DateTimePicker
                onChange={this.handleChangeStart.bind(this)} 
                value={this.state.start}
              />
            </label>
  
            <label>
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
              placeholder='Address'
              resetSearch={false}/>
            </label>
  
            <label>
              <input type="description" 
              onChange={this.handleChangeDescription.bind(this)} 
              value={this.state.description}
              placeholder = {"Description"} />
            </label>
  
            <button type="submit" onClick = {this.updateEvent}>Submit</button>
          </form>
        );
      }  
 }

 export default EditEvent;