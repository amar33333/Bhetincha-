import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class BusinessFooter extends Component {
  render() {
    console.log(this.props);
    return (
      <div id="contact-us" className={`footer footer-${this.props.theme} p-3`}>
        <Container>
          <Row>
            <Col xs="12" md="4">
              <h4>Contact us</h4>
              <div className="m-0">
                <strong>Head Office</strong>
                <p className="m-0">
                  <strong>{this.props.business_name}</strong>
                </p>
                <p>{this.props.address && this.props.address.addressLine1}</p>
              </div>
              <p>{""}</p>
              <span className="fa fa-envelope">
                <a href={`mailto:${this.props.business_email}`}>
                  {" "}
                  {this.props.business_email}{" "}
                </a>
              </span>
              {/* <br />
              <span className="fa fa-globe">
                {" "}
                <a
                  href="http://techkunja.com.np"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                </a>
              </span> */}
            </Col>
            <Col xs="12" md="2">
              <h4>Find us</h4>
            </Col>
            <Col xs="12" md="3">
              <div className="mb-3">
                <h4>Explore</h4>
              </div>
              <ul>
                <li>
                  <Link to="#">Home</Link>
                </li>
                <li>
                  <Link to="#">About</Link>
                </li>
                <li>
                  <Link to="#">Gallery</Link>
                </li>
                <li>
                  <Link to="#">Contact</Link>
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
              {this.props.business_phone && (
                <Row>
                  <div className="toll-free">
                    <h4 className="mb-0">Call us Now!</h4>
                    <h1 className="mt-0">
                      <a
                        href={`tel:${(this.props.address &&
                          this.props.address.tollFreeNumber) ||
                          this.props.business_phone}`}
                      >
                        {(this.props.address &&
                          this.props.address.tollFreeNumber) ||
                          this.props.business_phone}
                      </a>
                    </h1>
                  </div>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: { logo, business_name, business_email, business_phone, address }
    }
  }) => ({
    logo,
    business_name,
    business_email,
    business_phone,
    address
  })
)(BusinessFooter);
