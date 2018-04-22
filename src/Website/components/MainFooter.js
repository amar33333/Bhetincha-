import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class BusinessFooter extends Component {
  render() {
    return (
      <div className="footer p-3">
        <Container>
          <Row>
            <Col xs="12" md="3">
              <h4>COMPANY</h4>
              <ul>
                <li>About Bhetincha</li>
                <li>Careers</li>
                <li>Contact Us</li>
              </ul>
            </Col>
            <Col xs="12" md="3">
              <h4>Resources</h4>
              <ul>
                <li>Help Center</li>
                <li>User Agreement</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col xs="12" md="3">
              <h4>Advertise</h4>
              <ul>
                <li>Advertise with us</li>
                <li>Book an appointment</li>
                <li>Find my business</li>
              </ul>
            </Col>
            <Col xs="12" md="3">
              <Row>
                <span class="fa-stack fa-lg footer_social__icon">
                  <i class="fa fa-circle-thin fa-stack-2x" />
                  <i class="fa fa-facebook fa-stack-1x" />
                </span>
                <span class="fa-stack fa-lg footer_social__icon">
                  <i class="fa fa-circle-thin fa-stack-2x" />
                  <i class="fa fa-twitter fa-stack-1x" />
                </span>
                <span class="fa-stack fa-lg footer_social__icon">
                  <i class="fa fa-circle-thin fa-stack-2x" />
                  <i class="fa fa-google-plus fa-stack-1x" />
                </span>
              </Row>
              <Row>
                <div className="toll-free">
                  <h4>Toll Free</h4>
                  <h3>
                    <a href="tel:16600102030">16600-10-20-30</a>
                  </h3>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default BusinessFooter;
