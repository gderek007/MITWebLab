import React, {Component} from "react";
import ReactMapGL, {Marker, Popup, LinearInterpolator, FlyToInterpolator} from "react-map-gl";
import { get } from "../../utilities";

import "./Map.css";

const API_TOKEN = "pk.eyJ1IjoibXBlcmF6YTA3MTQiLCJhIjoiY2trM2wxaXcyMTRwaTJ4cGpiaXQ3bjltNiJ9.a8AxmhpMBO7jfrD3s190Yg";
const MIT_LAT = 42.35531356439811;
const MIT_LNG = -71.09148101699134;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: MIT_LAT, 
        longitude: MIT_LNG,
        zoom: 14,
        width: "99vw",
        height: "89vh",
      },
      events: [],
      selectedEvent: null,
    };
  }

  componentDidMount() {
    get("/api/events").then((eventObjs) => {
      let reversedEventObjs = eventObjs.reverse();
      reversedEventObjs.map((eventObj) => {
        this.setState({ events: this.state.events.concat([eventObj]) });
      });
    });
  }
  
  render() {
    
    return ( 
    <div>
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
            <div>
              <h1>{this.state.selectedEvent.nameEvent}</h1>
              <h3>{this.state.selectedEvent.interested} Interested</h3>
              <h2>{this.state.selectedEvent.address}</h2>
              <p>{this.state.selectedEvent.description}</p>
            </div>
          </Popup>
        ): null}
      </ReactMapGL>
    </div>
    );
  }
}

export default Map;