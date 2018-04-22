import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class BusinessFooter extends Component {
  render() {
    return (
      <div id="contact-us" className={`footer footer-${this.props.theme} p-3`}>
        <Container>
          <Row>
            <Col xs="12" md="4">
              <h4>Contact us</h4>
              <p className="m-0">
                <strong>Head Office</strong>
              </p>
              <p className="m-0">Tech Kunja Pvt. Ltd.</p>
              <p>Anamnagar, Kathmandu, Nepal</p>
              <span className="fa fa-envelope">
                <a href="mailto:mail@techkunja.com.np">
                  {" "}
                  mail@techkunja.com.np{" "}
                </a>
              </span>
              <br />
              <span className="fa fa-globe">
                {" "}
                <a
                  href="http://techkunja.com.np"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  www.techkunja.com.np
                </a>
              </span>
            </Col>
            <Col xs="12" md="2">
              <h4>Find us</h4>
            </Col>
            <Col xs="12" md="3">
              <div className="m-0">
                <h4>Explore</h4>
              </div>
              <ul>
                <li>
                  <Link to="#">Gallery</Link>
                </li>
                <li>
                  <Link to="#">Products</Link>
                </li>
                <li>
                  <Link to="#">Jobs</Link>
                </li>
              </ul>
            </Col>

            <Col xs="12" md="3">
              <Row>
                <span className="fa-stack fa-lg footer_social__icon">
                  <i className="fa fa-circle-thin fa-stack-2x" />
                  <i className="fa fa-facebook fa-stack-1x" />
                </span>
                <span className="fa-stack fa-lg footer_social__icon">
                  <i className="fa fa-circle-thin fa-stack-2x" />
                  <i className="fa fa-twitter fa-stack-1x" />
                </span>
                <span className="fa-stack fa-lg footer_social__icon">
                  <i className="fa fa-circle-thin fa-stack-2x" />
                  <i className="fa fa-google-plus fa-stack-1x" />
                </span>
              </Row>
              <Row>
                <div className="toll-free">
                  <h4>Call us Now!</h4>
                  <h3>
                    <a href="tel:16600102030">01-5262626</a>
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
