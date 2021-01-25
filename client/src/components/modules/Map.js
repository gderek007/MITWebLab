import React, {Component} from "react";
import ReactMapGL, {Marker, Popup, LinearInterpolator, FlyToInterpolator} from "react-map-gl";
import { get } from "../../utilities";

import "./Map.css";

const API_TOKEN = "pk.eyJ1IjoibXBlcmF6YTA3MTQiLCJhIjoiY2trM2wxaXcyMTRwaTJ4cGpiaXQ3bjltNiJ9.a8AxmhpMBO7jfrD3s190Yg";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 42.35531356439811, 
        longitude: -71.09148101699134,
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
                const viewport = {
                    ...this.state.viewport,
                    longitude: eventObj.lng,
                    latitude: eventObj.lat,
                    zoom: 15,
                    transitionDuration: 1000,
                    transitionInterpolator: new FlyToInterpolator(),
                };
                this.setState({viewport});
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
            }}
          >
            <div>
              <h1>{this.state.selectedEvent.nameEvent}</h1>
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