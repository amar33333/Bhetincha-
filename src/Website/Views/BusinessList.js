import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Media,
  Card,
  CardBody,
  CardFooter,
  Badge
} from "reactstrap";

import avatar from "../../static/img/avatar.jpg";

class BusinessList extends Component {
  render() {
    return (
      <div className="body-wrapper">
        <Container fluid>
          <Row style={{ marginTop: 20 }}>
            <Col xs="12" md="8">
              <Card>
                <CardBody>
                  <Media>
                    <Media left href="#">
                      <Media
                        object
                        // data-src={avatar}
                        src={avatar}
                        className="result-page__thumbnail"
                        alt="Generic placeholder image"
                      />
                    </Media>
                    <Media body>
                      <Media heading className="result-header__text">
                        Samsung J7
                      </Media>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel
                      metus scelerisque ante sollicitudin commodo. Cras purus
                      odio, vestibulum in vulputate at, tempus viverra turpis.
                      Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                      lacinia congue felis in faucibus.
                    </Media>
                  </Media>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col sm="1">
                      <i className="fa fa-thumbs-up" />
                    </Col>
                    <Col sm="2">
                      <i className="fa fa-unlock" /> Claim
                    </Col>
                    <Col sm="3">
                      <i className="fa fa-list" /> Improve Listing
                    </Col>
                    <Col sm="2">
                      <i className="fa fa-eye" /> 222
                    </Col>
                    <Col sm="2">
                      <i className="fa fa-search" /> 5555
                    </Col>
                    <Col sm="2">
                      <i className="fa fa-star" /> 4.5
                    </Col>
                  </Row>
                </CardFooter>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0719ece0",
                    // opacity: 0.5,
                    padding: 10,
                    color: "white",
                    top: 0,
                    right: 0
                  }}
                >
                  Product
                </div>
              </Card>
              <Card>
                <CardBody>
                  <Media>
                    <Media left href="#">
                      <Media
                        object
                        // data-src={avatar}
                        src={avatar}
                        className="result-page__thumbnail"
                        alt="Generic placeholder image"
                      />
                    </Media>
                    <Media body>
                      <Media heading className="result-header__text">
                        Tech Kunja{" "}
                        <i
                          className="fa fa-check-circle"
                          style={{ color: "green" }}
                        />
                      </Media>
                      <i className="fa fa-map-marker" /> Hattiban, lalitpur,
                      Nepal <br />
                      <div
                        className="fa-stack fa-sm"
                        style={{ color: "#0719ece0" }}
                      >
                        <i className="fa fa-circle-thin fa-stack-2x" />
                        <i className="fa fa-phone fa-stack-1x" />
                      </div>
                      <div
                        className="fa-stack fa-sm"
                        style={{ color: "#0719ece0" }}
                      >
                        <i className="fa fa-circle-thin fa-stack-2x" />
                        <i className="fa fa-envelope fa-stack-1x" />
                      </div>
                      <div
                        className="fa-stack fa-sm"
                        style={{ color: "#0719ece0" }}
                      >
                        <i className="fa fa-circle-thin fa-stack-2x" />
                        <i className="fa fa-globe fa-stack-1x" />
                      </div>
                    </Media>
                  </Media>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col sm="1">
                      <i className="fa fa-thumbs-up" />
                      <Badge color="warning" pill>
                        23
                      </Badge>
                    </Col>
                    <Col
                      sm="2"
                      style={{ cursor: "pointer" }}
                      onClick={() => console.log("Claimed")}
                    >
                      <i className="fa fa-unlock" /> Claim
                    </Col>
                    <Col sm="3">
                      <i className="fa fa-list" /> Improve Listing
                    </Col>
                    <Col sm="2">
                      <i className="fa fa-eye" /> 222
                    </Col>
                    <Col sm="2">
                      <i className="fa fa-search" /> 5555
                    </Col>
                    <Col sm="2">
                      <i className="fa fa-star" /> 4.5
                    </Col>
                  </Row>
                </CardFooter>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0719ece0",
                    // opacity: 0.5,
                    padding: 10,
                    color: "white",
                    top: 0,
                    right: 0
                  }}
                >
                  Business
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(({ auth: { cookies } }) => ({
  cookies
}))(BusinessList);
