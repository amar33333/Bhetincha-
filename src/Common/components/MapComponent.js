import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { GOOGLE_MAPS_URL } from "../utils/API";

class GoogleMapComponent extends Component {
  componentDidMount() {
    this.props.setRef(this.gEl);
  }
  render() {
    return (
      <GoogleMap
        ref={ref => (this.gEl = ref)}
        defaultZoom={15}
        defaultCenter={{ lat: 27.7172453, lng: 85.32391758465576 }}
        onClick={({ latLng }) => this.props.onClick({ latLng })}
      >
        <Marker
          position={this.props.position}
          draggable
          onDragEnd={this.props.onDragEnd}
        />
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
