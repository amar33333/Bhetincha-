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
  state = { directions: [] };

  componentDidMount() {
    this.props.setRef(this.gEl);

    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(27.709686, 85.326621),
        destination: new google.maps.LatLng(27.719697, 85.331191),
        waypoints: [
          { location: new google.maps.LatLng(27.7172453, 85.32391758465576) },
          { location: new google.maps.LatLng(27.717555, 85.34491758465576) }
        ],
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("directions: ", result);
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
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
        //onClick={({ latLng }) => this.props.onClick({ latLng })}
      >
        {/* {this.renderMarkers()} */}
        <DirectionsRenderer directions={this.state.directions} />
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
