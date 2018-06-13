import React, { Component } from "react";
import { connect } from "react-redux";
import "../../minisite.css";
import MapComponent from "../../../../../Common/components/MapComponent";
import withRepics from "../../../../../config/withRepics";
import businessReducers from "../../../../../Business/reducers";

import { MAIN_URL } from "../../config/MINISITE_API";
import { CustomModal } from "../../../../../Common/components";

import { Col, Row, Container } from "reactstrap";
import { Divider, Card, Button } from "semantic-ui-react";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 27.7172453, lng: 85.32391758465576 }
    };
  }

  render() {
    const description = [
      "Amy is a violinist with 2 years experience in the wedding industry.",
      "She enjoys the outdoors and currently resides in upstate New York."
    ].join(" ");
    console.log("Contact props:", this.props);
    return (
      <div>
        <div>
          <MapComponent
            ref={ref => (this.mapEl = ref)}
            position={this.state.position}
            onClick={this.onChangeLatLng}
            onDragEnd={this.onChangeLatLng}
          />
        </div>
        <Container>
          <Row className="mt-5 mb-4">
            <Col sm="12">
              <h2 className="text-center">
                we're always listening. Contact us Now!
              </h2>
            </Col>
          </Row>
          <Row className="mt-5 mb-5">
            <Col sm="3">
              <Card>
                <Card.Content header="Head Office" />
                <Card.Content>
                  <p>Hattiban, Lalitpur, Nepal</p>
                  <p>Opposite of LA</p>
                  <p>
                    <i className="fa fa-user" /> <strong>Samip Subedi</strong>
                  </p>
                  <p>
                    <i className="fa fa-phone"> 9806622311</i>
                  </p>
                  <Button primary>Contact Now</Button>
                </Card.Content>
                {/* <Card.Content extra>
                  <Icon name="user" />
                  4 Friends
                </Card.Content> */}
              </Card>
            </Col>
            <Col sm="3">
              <Card>
                <Card.Content header="Head Office" />
                <Card.Content>
                  <p>Hattiban, Lalitpur, Nepal</p>
                  <p>Opposite of LA</p>
                  <p>
                    <i className="fa fa-user" /> <strong>Samip Subedi</strong>
                  </p>
                  <p>
                    <i className="fa fa-phone"> 9806622311</i>
                  </p>
                  <Button primary>Contact Now</Button>
                </Card.Content>
                {/* <Card.Content extra>
                  <Icon name="user" />
                  4 Friends
                </Card.Content> */}
              </Card>
            </Col>
            <Col sm="3">
              <Card>
                <Card.Content header="Head Office" />
                <Card.Content>
                  <p>Hattiban, Lalitpur, Nepal</p>
                  <p>Opposite of LA</p>
                  <p>
                    <i className="fa fa-user" /> <strong>Samip Subedi</strong>
                  </p>
                  <p>
                    <i className="fa fa-phone"> 9806622311</i>
                  </p>
                  <Button primary>Contact Now</Button>
                </Card.Content>
                {/* <Card.Content extra>
                  <Icon name="user" />
                  4 Friends
                </Card.Content> */}
              </Card>
            </Col>
            <Col sm="3">
              <Card>
                <Card.Content header="Head Office" />
                <Card.Content>
                  <p>Hattiban, Lalitpur, Nepal</p>
                  <p>Opposite of LA</p>
                  <p>
                    <i className="fa fa-user" /> <strong>Samip Subedi</strong>
                  </p>
                  <p>
                    <i className="fa fa-phone"> 9806622311</i>
                  </p>
                  <Button primary>Contact Now</Button>
                </Card.Content>
                {/* <Card.Content extra>
                  <Icon name="user" />
                  4 Friends
                </Card.Content> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRepics("BusinessContainer", businessReducers)(
  connect(({ BusinessContainer: { business_reducer } }) => ({
    business_reducer
  }))(Contact)
);
