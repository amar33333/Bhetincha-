import React, { Component } from "react";
// import logo from "./logo.svg";
// import { Image } from "semantic-ui-react";
// import { Container, Icon } from "semantic-ui-react";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";

const DEVELOPER = "Tech Kunja";
const OWNER = "Bhetincha.com";

class BottomFooter extends Component {
  renderBottomFooter = () => {
    return (
      <div className={`footer footer-${this.props.theme} p-3`}>
        <Container className="bottom-footer mt-1 pt-3">
          <Row className="bottom-footer__nav">
            <ul>
              <li className="bottom-footer__nav__item">
                <a href="#">Site Map</a>
              </li>
              <li className="bottom-footer__nav__item">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="bottom-footer__nav__item">
                <a href="#">User Agreement</a>
              </li>
              <li className="bottom-footer__nav__item">
                <a href="#">Help</a>
              </li>
            </ul>
          </Row>
          <div className="bottom-footer__meta">
            <p>
              &copy; {moment().year()}, {OWNER}. All rights reserved | Powered
              by{" "}
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
  };

  render() {
    return <div>{this.renderBottomFooter()}</div>;
  }
}

export default BottomFooter;
