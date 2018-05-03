import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { Container, Row, Col, Input, Button } from "reactstrap";

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
        <Container>
          <Row className="mb-3">
            <Col xs="12" md="6">
              <Input
                value={this.state.address}
                onChange={event =>
                  this.setState({ address: event.target.value })
                }
              />
            </Col>
            <Col xs="12" md="2">
              <Button
                color="primary"
                onClick={() => {
                  let geocoder = new window.google.maps.Geocoder();
                  geocoder.geocode(
                    { address: this.state.address },
                    (results, status) => {
                      //console.log(results, status[0]);
                      if (status === "OK") {
                        const location = results[0].geometry.location;
                        this.setState({
                          position: { lat: location.lat(), lng: location.lng() }
                        });
                      }
                    }
                  );
                }}
              >
                Find in map!
              </Button>
            </Col>
          </Row>
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
        </Container>
      </div>
    );
  }
}

export default Dashboard;
