import React, { Component } from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";

import MapComponent from "../../../Common/components/MapComponent";

class Dashboard extends Component {
  state = {
    position: { lat: 27.7172453, lng: 85.32391758465576 },
    address: "Kathmandu"
  };

  onChangeLatLng = ({ latLng }) =>
    this.setState({ position: { lat: latLng.lat(), lng: latLng.lng() } });

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
                      if (status === "OK") {
                        const location = results[0].geometry.location;
                        this.setState({
                          position: { lat: location.lat(), lng: location.lng() }
                        });
                      } else {
                        console.log(
                          "Location not found in map. Select Manually"
                        );
                      }
                    }
                  );
                }}
              >
                Find in map!
              </Button>
            </Col>
          </Row>
          <MapComponent
            position={this.state.position}
            onClick={this.onChangeLatLng}
            onDragEnd={this.onChangeLatLng}
          />
        </Container>
      </div>
    );
  }
}

export default Dashboard;
