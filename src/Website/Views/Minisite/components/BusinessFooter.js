import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

class BusinessFooter extends Component {
  render() {
    return (
      <div className={`business-footer footer-${this.props.theme} pt-3 `}>
        <Container>
          <Row>
            <Col xs="12" md="3">
              <div className="m-0">
                <p>Head Office</p>
                <p className="m-0">
                  <strong>{this.props.business_name}</strong>
                </p>
                <p>
                  <span>
                    {this.props.address &&
                      this.props.address.addressLine1 &&
                      `${this.props.address.addressLine1}, `}
                  </span>
                  <span>
                    {this.props.address &&
                      this.props.address.area &&
                      `${this.props.address.area.name}, `}
                  </span>
                  <span>
                    {this.props.address &&
                      this.props.address.city &&
                      this.props.address.city.name}
                  </span>
                </p>
              </div>
              {this.props.business_email && (
                <span className="fa fa-envelope">
                  <a href={`mailto:${this.props.business_email}`}>
                    {" "}
                    {this.props.business_email}
                  </a>
                </span>
              )}
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
                    {(this.props.address &&
                      this.props.address.tollFreeNumber) ||
                      (this.props.address && this.props.landLineNumber) ||
                      (this.props.address &&
                        this.props.address.contactPerson[0] &&
                        this.props.address.contactPerson[0].visibleToPublic &&
                        this.props.address.contactPerson[0].mobileNumber && (
                          <h4 className="mb-0">Call us Now!</h4>
                        ))}

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

            {this.props.links &&
              this.props.links.length !== 0 && (
                <Col xs="12" md={{ size: 3 }}>
                  <Row className="mb-1">
                    <h3>Follow us on:</h3>
                  </Row>
                  <Row>
                    {this.props.links.map(link => {
                      return (
                        <a href={link.link} target="_blank" key={link.link}>
                          <span className="fa-stack fa-lg footer_social__icon">
                            <i className="fa fa-circle-thin fa-stack-2x" />
                            <i
                              className={`${
                                link.social_nw.className
                              } fa-stack-1x`}
                            />
                          </span>
                        </a>
                      );
                    })}
                  </Row>
                </Col>
              )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: {
        logo,
        business_name,
        business_email,
        business_phone,
        address,
        links
      }
    }
  }) => ({
    logo,
    business_name,
    business_email,
    business_phone,
    address,
    links
  })
)(BusinessFooter);
