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

const calculateDistance = (lat1, long1, lat2, long2) => {
  // radians
  lat1 = (lat1 * 2.0 * Math.PI) / 60.0 / 360.0;
  long1 = (long1 * 2.0 * Math.PI) / 60.0 / 360.0;
  lat2 = (lat2 * 2.0 * Math.PI) / 60.0 / 360.0;
  long2 = (long2 * 2.0 * Math.PI) / 60.0 / 360.0;

  // use to different earth axis length
  const a = 6378137.0; // Earth Major Axis (WGS84)
  const b = 6356752.3142; // Minor Axis
  const f = (a - b) / a; // "Flattening"
  const e = 2.0 * f - f * f; // "Eccentricity"

  let beta = a / Math.sqrt(1.0 - e * Math.sin(lat1) * Math.sin(lat1));
  let cos = Math.cos(lat1);
  let x = beta * cos * Math.cos(long1);
  let y = beta * cos * Math.sin(long1);
  let z = beta * (1 - e) * Math.sin(lat1);

  beta = a / Math.sqrt(1.0 - e * Math.sin(lat2) * Math.sin(lat2));
  cos = Math.cos(lat2);
  x -= beta * cos * Math.cos(long2);
  y -= beta * cos * Math.sin(long2);
  z -= beta * (1 - e) * Math.sin(lat2);

  return Math.sqrt(x * x + y * y + z * z) / 1000;
};

const image = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";

class GoogleMapComponent extends Component {
  state = { directions: "", selectedSalesUser: "" };
  componentDidMount() {
    this.props.setRef(this.gEl);
  }
  static getDerivedStateFromProps = nextProps => {
    console.log("derived state crom props: ", nextProps);
    return nextProps.selectedSalesUser
      ? {
          selectedSalesUser: nextProps.selectedSalesUser
        }
      : "";
  };

  onMarkerClicked = each => () => {
    console.log("marker clicked: ", each);
    this.setState({ selectedSalesUser: each }, () =>
      console.log("sate: ", this.state)
    );
    this.props.setSalesUserFromMapMarker({
      mongo_id: each.id,
      username: each.username
    });
  };

  renderMarkers = () =>
    this.props.position.length
      ? this.props.position.map(each => (
          <Marker
            key={each.id}
            position={{
              lat: each.location.latitude,
              lng: each.location.longitude
            }}
            icon={each.status === "Online" ? image : null}
            draggable={false}
            onClick={this.onMarkerClicked(each)}
            onDragEnd={this.props.onDragEnd}
          />
        ))
      : null;

  directionRenderer = () => {
    const DirectionsService = new google.maps.DirectionsService();
    console.log("active path: ", this.props.activePath);

    // let waypoints = this.props.assignedPaths.paths.map(eachPath => {
    //   return eachPath.bs.map(eachBusiness => {
    //     return {
    //       location: new google.maps.LatLng(
    //         eachBusiness.location.latitude,
    //         eachBusiness.location.longitude
    //       )
    //     };
    //   });
    // });

    let waypoints = this.props.activePath
      ? this.props.activePath.bs.map(eachBusiness => {
          return {
            location: new google.maps.LatLng(
              eachBusiness.location.latitude,
              eachBusiness.location.longitude
            )
            //stopover: false
          };
        })
      : [];

    const destination = {};
    let max = 0;
    this.props.activePath &&
      this.props.activePath.bs.forEach(business => {
        const latitude = this.state.selectedSalesUser
          ? this.state.selectedSalesUser.location.latitude
          : "";
        const longitude = this.state.selectedSalesUser
          ? this.state.selectedSalesUser.location.longitude
          : "";

        const dist = calculateDistance(
          latitude,
          longitude,
          parseFloat(business.location.latitude),
          parseFloat(business.location.longitude)
        );
        if (dist > max) {
          max = dist;
          destination.latitude = business.location.latitude;
          destination.longitude = business.location.longitude;
        }
      });

    console.log("destinaton: ", destination, waypoints);

    // waypoints = [
    //   { location: new google.maps.LatLng(27.719697, 85.331191) },
    //   { location: new google.maps.LatLng(27.729697, 85.331191) },
    //   { location: new google.maps.LatLng(27.739697, 85.331191) },
    //   { location: new google.maps.LatLng(27.739697, 85.331191) },
    //   { location: new google.maps.LatLng(27.739697, 85.331191) }
    // ];

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(
          this.state.selectedSalesUser
            ? this.state.selectedSalesUser.location.latitude
            : "",
          this.state.selectedSalesUser
            ? this.state.selectedSalesUser.location.longitude
            : ""
        ),
        destination: new google.maps.LatLng(
          destination.latitude,
          destination.longitude
        ),
        waypoints: waypoints,
        optimizeWaypoints: true,

        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("directions: ", result);
          this.setState({
            directions: result
          });
        } else {
          // console.error(`error fetching directions ${result}`);
        }
      }
    );

    return <DirectionsRenderer directions={this.state.directions} />;
  };

  render() {
    console.log("assigned patha: ", this.state);

    return (
      <GoogleMap
        ref={ref => (this.gEl = ref)}
        defaultZoom={15}
        defaultCenter={{ lat: 27.6999572, lng: 85.3275043 }}
        //onClick={({ latLng }) => this.props.onClick({ latLng })}
      >
        {this.renderMarkers()}
        {this.state.selectedSalesUser && this.directionRenderer()}
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
            setSalesUserFromMapMarker={this.props.setSalesUserFromMapMarker}
            activePath={this.props.activePath}
            selectedSalesUser={this.props.selectedSalesUser}
          />
        )}
      </div>
    );
  }
}
export default MapComponent;
