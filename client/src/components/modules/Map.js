import React, {Component} from "react";
import ReactMapGL from "react-map-gl";

const API_TOKEN = "pk.eyJ1IjoibXBlcmF6YTA3MTQiLCJhIjoiY2trM2wxaXcyMTRwaTJ4cGpiaXQ3bjltNiJ9.a8AxmhpMBO7jfrD3s190Yg";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 42.35531356439811, 
        longitude: -71.09148101699134,
        zoom: 14,
        width: "100vw",
        height: "100vh",
      },
    };
  }

  render() {
    return ( 
    <div>
      <ReactMapGL {...this.state.viewport} 
      mapboxApiAccessToken={API_TOKEN}
      mapStyle="mapbox://styles/mperaza0714/ckk3lrmmk0yyb17nzlv8s29er"
      onViewportChange={viewport => this.setState({viewport})}
      >
        
      </ReactMapGL>
    </div>
    );
  }
}

export default Map;