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

class GoogleMapComponent extends Component {
  state = { directions: [] };
  componentDidMount() {
    this.props.setRef(this.gEl);
  }

  onMarkerClicked = each => () => {
    console.log("marker cicked: ", each);
    console.log(
      "wapoitns: ",
      this.props.assignedPaths &&
        this.props.assignedPaths.paths.map(eachPath => {
          return eachPath.bs.map(eachBusiness => {
            return {
              lat: eachBusiness.location.latitude,
              lng: eachBusiness.location.longitude
            };
          });
        })
    );

    const DirectionsService = new google.maps.DirectionsService();
    let waypoints =
      this.props.assignedPaths &&
      this.props.assignedPaths.paths.map(eachPath => {
        return eachPath.bs.map(eachBusiness => {
          return {
            location: new google.maps.LatLng(
              eachBusiness.location.latitude,
              eachBusiness.location.longitude
            )
          };
        });
      });

    console.log("actual wayping: ", waypoints);

    // waypoints = [
    //   { location: new google.maps.LatLng(27.719697, 85.331191) },
    //   { location: new google.maps.LatLng(27.729697, 85.331191) },
    //   { location: new google.maps.LatLng(27.739697, 85.331191) },
    //   { location: new google.maps.LatLng(27.739697, 85.331191) },
    //   { location: new google.maps.LatLng(27.739697, 85.331191) }
    // ];

    console.log("actual wayping 2: ", waypoints);

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(
          each.Location.Latitude,
          each.Location.Longitude
        ),
        destination: new google.maps.LatLng(27.719697, 85.331191),
        waypoints: waypoints[0],
        optimizeWaypoints: false,

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
    console.log("assigned patha: ", this.props.assignedPaths);

    return (
      <GoogleMap
        ref={ref => (this.gEl = ref)}
        defaultZoom={15}
        defaultCenter={{ lat: 27.7172453, lng: 85.32391758465576 }}
        onClick={({ latLng }) => this.props.onClick({ latLng })}
      >
        {this.renderMarkers()}
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

  getFormattedData = assignedPaths => {
    console.log("assinged: ", assignedPaths && assignedPaths.id);
    const a =
      assignedPaths &&
      assignedPaths.paths.map(eachPath => {
        return eachPath.bs.map(eachBusiness => {
          return { lat: eachBusiness.latitude, lng: eachBusiness.longitude };
        });
      });

    console.log("aaa: ", a);
  };

  render() {
    const MyMapComponent = this.state.MyMapComponent;
    return (
      <div>
        {MyMapComponent && (
          <MyMapComponent
            setRef={ref => (this.googleMapEl = ref)}
            position={this.props.position}
            assignedPaths={this.props.assignedPaths}
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
