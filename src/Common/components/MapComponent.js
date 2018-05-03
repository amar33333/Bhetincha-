import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { GOOGLE_MAPS_URL } from "../utils/API";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 27.7172453, lng: 85.32391758465576 }}
      // center={props.position}
      onClick={({ latLng }) => props.onClick({ latLng })}
      // onClick={() => console.log("click")}
    >
      <Marker position={props.position} draggable onDragEnd={props.onDragEnd} />
    </GoogleMap>
  ))
);

const MapComponent = props => (
  <MyMapComponent
    position={props.position}
    onClick={props.onClick}
    onDragEnd={props.onDragEnd}
    googleMapURL={GOOGLE_MAPS_URL}
    loadingElement={props.loadingElement || <div style={{ height: `100%` }} />}
    containerElement={
      props.containerElement || <div style={{ height: `400px` }} />
    }
    mapElement={props.mapElement || <div style={{ height: `100%` }} />}
  />
);

export default MapComponent;
