import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import { OWNER } from "../../config/CONSTANTS";

class BottomFooter extends Component {
  render() {
    return (
      <div
        className={`footer-${this.props.theme} ${this.props.extraClass} p-3`}
      >
        <Container className="bottom-footer pt-1">
          <Row>
            <Col xs="12">
              <ul
                style={{
                  paddingLeft: "0px"
                }}
                className="text-center mb-0"
              >
                <li className="bottom-footer__nav__item">
                  <Link to="/ecommerce">Shop</Link>
                </li>
                <li className="bottom-footer__nav__item">
                  <Link to="#">Business</Link>
                </li>
                <li className="bottom-footer__nav__item">
                  <Link to="#">Blog</Link>
                </li>
                <li className="bottom-footer__nav__item">
                  <Link to="#">Site Map</Link>
                </li>
                <li className="bottom-footer__nav__item">
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li className="bottom-footer__nav__item">
                  <Link to="#">User Agreement</Link>
                </li>
                <li className="bottom-footer__nav__item">
                  <Link to="#">Help</Link>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <p className="text-center">
                &copy; {new Date().getFullYear()}, {OWNER}. All rights reserved
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default BottomFooter;
