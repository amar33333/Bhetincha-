import React, { Component } from "react";
// import logo from "./logo.svg";
// import { Image } from "semantic-ui-react";
import { Container, Icon } from "semantic-ui-react";
import { Row, Col } from "reactstrap";
import moment from "moment";

const DEVELOPER = "Tech Kunja";
const OWNER = "Bhetincha.com";

class Footer extends Component {
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
                <span>
                  <Icon name="facebook f" size="large" circular inverted />
                </span>
                <span>
                  <Icon name="twitter" size="large" circular inverted />
                </span>
                <span>
                  <Icon name="google plus" size="large" circular inverted />
                </span>
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
        <Container>
          <div className="footer-bottom mt-3 pt-3">
            <p>
              &copy; {moment().year()}, {OWNER}. All rights reserved | Powered
              by{" "}
              <a
                href="http://techkunja.com.np"
                rel="noopener noreferrer"
                target="_blank"
                className="footer-link"
              >
                {" "}
                {DEVELOPER}
              </a>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

export default Footer;
