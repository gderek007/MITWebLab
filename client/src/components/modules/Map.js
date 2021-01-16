import React, { Component } from "react";
import { Link } from "@reach/router";

let map, popup, Popup;

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <html>
            <head>
                <title>Custom Popups</title>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
                <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZDH_kk-zuEnSH3m_SNGSrByNF7LItii0&callback=initMap&libraries=&v=weekly"
                defer
                ></script>
                <link rel="stylesheet" type="text/css" href="./style.css" />
                <script src="./index.js"></script>
            </head>
            <body>
                <div id="map"></div>
                <div id="content">Hello world!</div>
            </body>
            </html>
        );
    }
}

/** Initializes the map and the custom popup. */
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.9, lng: 151.1 },
    zoom: 10,
  });

  /**
   * A customized popup on the map.
   */
  class Popup extends google.maps.OverlayView {
    constructor(position, content) {
      super();
      this.position = position;
      content.classList.add("popup-bubble");
      // This zero-height div is positioned at the bottom of the bubble.
      const bubbleAnchor = document.createElement("div");
      bubbleAnchor.classList.add("popup-bubble-anchor");
      bubbleAnchor.appendChild(content);
      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement("div");
      this.containerDiv.classList.add("popup-container");
      this.containerDiv.appendChild(bubbleAnchor);
      // Optionally stop clicks, etc., from bubbling up to the map.
      Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    /** Called when the popup is added to the map. */
    onAdd() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    }
    /** Called when the popup is removed from the map. */
    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }
    /** Called each frame when the popup needs to draw itself. */
    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position
      );
      // Hide the popup when it is far out of view.
      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? "block"
          : "none";

      if (display === "block") {
        this.containerDiv.style.left = divPosition.x + "px";
        this.containerDiv.style.top = divPosition.y + "px";
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }
  popup = new Popup(
    new google.maps.LatLng(-33.866, 151.196),
    document.getElementById("content")
  );
  popup.setMap(map);
}