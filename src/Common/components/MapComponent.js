/* global google */

import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { GOOGLE_MAPS_URL } from "../utils/API";

const pathCoordinates = [
  { lat: 27.7192453, lng: 85.3263975 },
  { lat: 27.7152453, lng: 85.32639491 },
  { lat: 27.7172453, lng: 85.323913975 },
  { lat: 27.7172455, lng: 85.32645 },
  { lat: 27.7172455, lng: 85.32877 }
];

class GoogleMapComponent extends Component {
  componentDidMount() {
    this.props.setRef(this.gEl);

    const DirectionsService = new google.maps.DirectionsService();
  }

  onMarkerClicked = each => () => {
    console.log("marker cicked: ", each.Id);
  };

  renderMarkers = () =>
    this.props.position.length
      ? this.props.position.map(each => (
          <Marker
            key={each.Id}
            position={{
              lat: each.Location.Latitude,
              lng: each.Location.Longitude
            }}
            draggable={false}
            onClick={this.onMarkerClicked(each)}
            onDragEnd={this.props.onDragEnd}
          />
        ))
      : null;

  render() {
    return (
      <GoogleMap
        ref={ref => (this.gEl = ref)}
        defaultZoom={15}
        defaultCenter={{ lat: 27.7172453, lng: 85.32391758465576 }}
        onClick={({ latLng }) => this.props.onClick({ latLng })}
      >
        {this.renderMarkers()}
        <DirectionsRenderer directions={pathCoordinates} />
      </GoogleMap>
    );
  }
}

class MapComponent extends Component {
  state = { MyMapComponent: null };
  componentDidMount() {
    this.setState({
      MyMapComponent: withScriptjs(withGoogleMap(GoogleMapComponent))
    });
  }
  render() {
    const MyMapComponent = this.state.MyMapComponent;
    return (
      <div>
        {MyMapComponent && (
          <MyMapComponent
            setRef={ref => (this.googleMapEl = ref)}
            position={this.props.position}
            onClick={this.props.onClick}
            onDragEnd={this.props.onDragEnd}
            googleMapURL={GOOGLE_MAPS_URL}
            loadingElement={
              this.props.loadingElement || <div style={{ height: `100%` }} />
            }
            containerElement={
              this.props.containerElement || <div style={{ height: `400px` }} />
            }
            mapElement={
              this.props.mapElement || <div style={{ height: `100%` }} />
            }
          />
        )}
      </div>
    );
  }
}
export default MapComponent;
