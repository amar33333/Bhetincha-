import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class BusinessFooter extends Component {
  render() {
    console.log(this.props);
    return (
      <div
        id="contact-us"
        className={`footer footer-${this.props.theme} pt-3 `}
      >
        <Container>
          <Row>
            <Col xs="12" md="3">
              <div className="m-0">
                <p>Head Office</p>
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
            </Col>

            <Col xs="12" md={{ size: 6 }}>
              {((this.props.address && this.props.address.tollFreeNumber) ||
                (this.props.address && this.props.address.landLineNumber) ||
                this.props.business_phone) && (
                <Row
                  className="text-center"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <div className="toll-free">
                    <h4 className="mb-0">Call us Now!</h4>
                    <h1 className="mt-0">
                      <a
                        href={`tel:${(this.props.address &&
                          this.props.address.tollFreeNumber) ||
                          (this.props.address && this.props.landLineNumber) ||
                          (this.props.address &&
                            this.props.address.contactPerson[0] &&
                            this.props.address.contactPerson[0]
                              .visibleToPublic &&
                            this.props.address.contactPerson[0].mobileNumber)}`}
                      >
                        {(this.props.address &&
                          this.props.address.tollFreeNumber) ||
                          (this.props.address && this.props.landLineNumber) ||
                          (this.props.address &&
                            this.props.address.contactPerson[0] &&
                            this.props.address.contactPerson[0]
                              .visibleToPublic &&
                            this.props.address.contactPerson[0].mobileNumber)}
                      </a>
                    </h1>
                  </div>
                </Row>
              )}
            </Col>

            <Col xs="12" md={{ size: 3 }}>
              <Row className="mb-1">
                <h3>Follow us on:</h3>
              </Row>
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
