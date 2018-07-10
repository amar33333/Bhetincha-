import React, { Component } from "react";
import { AboutUs, CoverPhoto } from "./components";
import { connect } from "react-redux";

import Rating from "react-rating";

import { Row, Col, Container } from "reactstrap";
import { Card } from "semantic-ui-react";

import moment from "moment";
import "./minisite.css";

const aboutUsstyle = {
  fontSize: "12px !important",
  color: "black"
};

class MainPage extends Component {
  render() {
    var lastCategory = this.props.categories.slice(-1)[0];
    return (
      <div
        style={{
          paddingTop: "60px"
        }}
      >
        <CoverPhoto />
        <div className="body-wrapper">
          <div className="minisite_meta__wrapper mr-5 ml-5 p-3">
            <h2 className="mb-1">{this.props.business_name}</h2>
            <Rating
              className="mb-2 business-rating-component"
              fractions={2}
              emptySymbol="fa fa-star-o fa-1x"
              fullSymbol="fa fa-star fa-1x"
            />{" "}
            (10 Ratings)
            <div>
              <strong>
                <span className="mr-2">{this.props.industry.name}</span>
                <i className="fa fa-angle-right mr-2" />
                {this.props.categories.map((category, catIndex) => {
                  return (
                    <span key={category.id}>
                      {category.name}
                      {category.id !== lastCategory.id ? (
                        <span className="mx-2"> | </span>
                      ) : null}
                    </span>
                  );
                })}
              </strong>
            </div>
          </div>
          <div className="minisite_content__wrapper">
            <Container>
              <Row>
                <Col xs="12" md="6">
                  <h2>About Us</h2>
                  {this.props.data.tagline ? (
                    <h2>&#8220;{this.props.data.tagline}&#8221;</h2>
                  ) : null}
                  <p
                    style={aboutUsstyle}
                    dangerouslySetInnerHTML={{
                      __html: this.props.data.aboutUs
                    }}
                  />
                </Col>
                <Col xs="12" md={{ size: 4, offset: 2 }}>
                  <Row className="mb-3">
                    <Col xs="12">
                      <Card>
                        <Card.Content header="Working Hour" />
                        {this.props.workingHour.map((day, index) => {
                          let start = moment(day.start).format("hh:mm A");
                          let end = moment(day.end).format("hh:mm A");

                          var today = new Date();

                          var momentNow = moment().format("hh:mm A");
                          return (
                            <Card.Content key={index}>
                              <strong>{day.day}: </strong>{" "}
                              {!day.holiday ? `${start} - ${end}` : "Holiday"}{" "}
                              {(() => {
                                if (index === today.getDay()) {
                                  if (
                                    !day.holiday &&
                                    moment(momentNow, "hh:mm A").isBetween(
                                      moment(start, "hh:mm A"),
                                      moment(end, "hh:mm A")
                                    )
                                  ) {
                                    return (
                                      <span style={{ color: "blue" }}>
                                        Open
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span style={{ color: "red" }}>
                                        Closed
                                      </span>
                                    );
                                  }
                                }
                              })()}
                            </Card.Content>
                          );
                        })}
                      </Card>
                    </Col>
                  </Row>
                  {this.props.data.establishedYear ||
                  this.props.data.companyType ? (
                    <Row className="mb-3">
                      <Col xs="12">
                        <Card>
                          {/* <Card.Content header="Information" /> */}
                          <Card.Content>
                            <strong>Established Year : </strong>
                            {this.props.data.establishedYear === "" ||
                            !this.props.data.establishedYear ? (
                              <span> Not Provided</span>
                            ) : (
                              this.props.data.establishedYear
                            )}
                          </Card.Content>
                          <Card.Content>
                            <strong>Company Type : </strong>
                            {!this.props.data.companyType ? (
                              <span> Not Provided</span>
                            ) : (
                              this.props.data.companyType.name
                            )}
                          </Card.Content>
                        </Card>
                      </Col>
                    </Row>
                  ) : null}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: { business_name, about, workingHour, industry, categories }
    }
  }) => ({
    data: {
      tagline: about.tagline || "",
      aboutUs: about.aboutUs || "",
      establishedYear: about.establishedYear || "",
      companyType: about.companyType
    },
    business_name,
    workingHour,
    industry,
    categories
  })
)(MainPage);
