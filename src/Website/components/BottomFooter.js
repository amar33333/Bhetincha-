import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

import { DEVELOPER, OWNER } from "../../config/CONSTANTS";

class BottomFooter extends Component {
  render() {
    return (
      <div
        className={`footer footer-${this.props.theme} ${
          this.props.extraClass
        } p-3`}
      >
        <Container className="bottom-footer mt-1 pt-3">
          <Row className="bottom-footer__nav">
            <ul>
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
          </Row>
          <div className="bottom-footer__meta">
            <p>
              &copy; {new Date().getFullYear()}, {OWNER}. All rights reserved |
              Powered by{" "}
              <a
                href="http://techkunja.com.np"
                rel="noopener noreferrer"
                target="_blank"
                className="footer-link"
              >
                {DEVELOPER}
              </a>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

export default BottomFooter;
