import React, {useState} from "react";
import ReactMapGL from "react-map-gl";

const API_TOKEN = "pk.eyJ1IjoibXBlcmF6YTA3MTQiLCJhIjoiY2trM2wxaXcyMTRwaTJ4cGpiaXQ3bjltNiJ9.a8AxmhpMBO7jfrD3s190Yg";

export default function Map() {
const [viewport, setViewport] = useState({
  latitude: 42.36025746273741,
  longitude: -71.09418145961277,
  zoom: 14,
  width: "100vw",
  height: "100vh",
});

  return <div>
    <ReactMapGL {...viewport} 
    mapboxApiAccessToken={API_TOKEN}
    mapStyle="mapbox://styles/mperaza0714/ckk3lrmmk0yyb17nzlv8s29er"
    onViewportChange={viewport => {
      setViewport(viewport);
    }}>
      
    </ReactMapGL>
  </div>
}
