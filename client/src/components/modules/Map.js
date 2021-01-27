import React, {Component} from "react";
import ReactMapGL, {Marker, Popup, LinearInterpolator, FlyToInterpolator} from "react-map-gl";
import { get } from "../../utilities";
import EventList from "./EventList.js";

import "./Map.css";

const API_TOKEN = "pk.eyJ1IjoibXBlcmF6YTA3MTQiLCJhIjoiY2trM2wxaXcyMTRwaTJ4cGpiaXQ3bjltNiJ9.a8AxmhpMBO7jfrD3s190Yg";
const MIT_LAT = 42.35531356439811;
const MIT_LNG = -71.09148101699134;

class Map extends Component {
  constructor(props) {
    super(props);
    const today = this.currentDate(new Date());
    this.state = {
      viewport: {
        latitude: MIT_LAT, 
        longitude: MIT_LNG,
        zoom: 14,
        width: "100vw",
        height: "100vh",
      },
      events: [],
      virtualEvents: [],
      selectedEvent: null,
    };
  }

  componentDidMount() {
    get("/api/events").then((eventObjs) => {
      let reversedEventObjs = eventObjs.reverse();
      reversedEventObjs.map(eventObj => {
        if (eventObj.online_event) {
          this.setState({ virtualEvents: this.state.virtualEvents.concat([eventObj]) });
        } else {
          this.setState({ events: this.state.events.concat([eventObj]) });
        }
      });
    });
  }

  currentDate(d){
    d = new Date(d);
      var day = d.getDay(),
          diff = d.getDate() ; 
      return new Date(d.setDate(diff));
  }

  upcomingEvents(){
    let upcoming = this.state.events.filter((e) => (new Date(e.start) >= this.state.today) )
    return upcoming;
  }

  toggleOverlay() {
    let overlayDiv = document.querySelector(".overlay");
    console.log(overlayDiv.style.opacity);
    if (overlayDiv.style.opacity === '0')
      overlayDiv.style.opacity = 1;
    else
      overlayDiv.style.opacity = 0;
  }
  
  render() {
    return ( 
    <div>

      <div className="map">
      <ReactMapGL {...this.state.viewport} 
        mapboxApiAccessToken={API_TOKEN}
        mapStyle="mapbox://styles/mperaza0714/ckk3lrmmk0yyb17nzlv8s29er"
        onViewportChange={viewport => this.setState({viewport})}
      >
        
        {this.state.events.map(eventObj => (
          <Marker 
            key={eventObj._id} 
            latitude={eventObj.lat} 
            longitude={eventObj.lng}
          >
            <button 
              className="marker-btn" 
              onClick={(e) => {
                e.preventDefault();
                const markerViewport = {
                    ...this.state.viewport,
                    longitude: eventObj.lng,
                    latitude: eventObj.lat + .002,
                    zoom: 15,
                    transitionDuration: 1000,
                    transitionInterpolator: new FlyToInterpolator(),
                };
                this.setState({viewport: markerViewport});
                this.setState({selectedEvent: eventObj});
              }}
            >
              <img src="https://web.mit.edu/graphicidentity/images/examples/tim-the-beaver-do-1.png" />
            </button>
          </Marker>
        ))}

        {this.state.selectedEvent ? (
          <Popup 
            latitude={this.state.selectedEvent.lat}
            longitude={this.state.selectedEvent.lng}
            onClose={() => {
              this.setState({selectedEvent: null});
              const resetViewport = {
                ...this.state.viewport,
                longitude: MIT_LNG,
                latitude: MIT_LAT,
                zoom: 14,
                transitionDuration: 1000,
                transitionInterpolator: new FlyToInterpolator(),
            };
            this.setState({viewport: resetViewport});
            }}
          >
            <div className = "parentDiv">
              <h1>{this.state.selectedEvent.nameEvent}</h1>
              <h3>{this.state.selectedEvent.interested} Interested</h3>
              <h2>{this.state.selectedEvent.address}</h2>
              <p>{this.state.selectedEvent.description}</p>
            </div>
          </Popup>
        ): null}
      </ReactMapGL>
      </div>

      <div>
          <button
            className="virtual-btn"
            onClick={ (e) => {
              let overlayDiv = document.querySelector(".overlay");
              console.log(overlayDiv.style.zIndex);
              if (overlayDiv.style.zIndex === '-1')
                overlayDiv.style.zIndex = 90;
              else
                overlayDiv.style.zIndex = -1;
            }}
          >
            <h3>Show Virtual Events</h3>
          </button>
      </div>

      <div
        className="overlay"
      >
        <h1>Overlay</h1>
        <div className = "childDiv">
            <EventList 
              user={this.props.user}
              userId={this.props.userId} 
              events={this.upcomingEvents()}
              ishost={Boolean(false)}
              null_msg={"No virtual events"}
            />
        </div>
      </div>

    </div>
    );
  }
}

export default Map;