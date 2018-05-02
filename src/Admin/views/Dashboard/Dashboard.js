import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={props.position}
      center={props.position}
    >
      <Marker position={props.position} draggable onDragEnd={props.onDragEnd} />
    </GoogleMap>
  ))
);

class Dashboard extends Component {
  state = {
    position: { lat: 27.7172453, lng: 85.32391758465576 },
    address: "Kathmandu"
  };

  render() {
    return (
      <div className="animated fadeIn">
        Hello Dashboard
        <input
          value={this.state.address}
          onChange={event => this.setState({ address: event.target.value })}
        />
        <button
          onClick={() => {
            let geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
              { address: this.state.address },
              (results, status) => {
                //console.log(results, status[0]);
                const location = results[0].geometry.location;
                status === "OK" &&
                  this.setState({
                    position: { lat: location.lat(), lng: location.lng() }
                  });
              }
            );
          }}
        >
          Find in map!
        </button>
        <MyMapComponent
          position={this.state.position}
          onDragEnd={({ latLng }) => {
            this.setState({
              position: { lat: latLng.lat(), lng: latLng.lng() }
            });
            console.log(latLng.lat(), latLng.lng());
          }}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDuyvcH5Rr55zHXmJFjuQ30jd_edLi1HbQ"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Dashboard;
