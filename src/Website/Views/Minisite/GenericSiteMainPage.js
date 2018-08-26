import React, { Component } from "react";
import { CoverPhoto } from "./components";
import { connect } from "react-redux";

import Rating from "react-rating";

import {
  Row,
  Col,
  Container
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";
import { Card, Dropdown } from "semantic-ui-react";

import moment from "moment";
import "./minisite.css";

const aboutUsstyle = {
  fontSize: "12px !important",
  color: "black"
};

const MAX_CAT = 3;

class GenericSiteMainPage extends Component {
  render() {
    const trigger = (
      <span>
        <small>
          +{this.props.categories.length - MAX_CAT} more{" "}
          {this.props.categories.length - MAX_CAT === 1
            ? `category`
            : `categories`}
        </small>
      </span>
    );
    var lastCategory = this.props.categories.slice(-1)[0];
    return (
      <div className="generic-page__wrapper">
        <CoverPhoto genericSite />
        <div className="minisite_meta__wrapper mr-5 ml-5 p-3">
          <h2 className="mb-1">{this.props.business_name}</h2>
          <Rating
            className="mb-2 business-rating-component"
            fractions={2}
            initialRating={3.5}
            emptySymbol="fa fa-star-o fa-1x"
            fullSymbol="fa fa-star fa-1x"
          />{" "}
          (10 Ratings)
          <div>
            <strong>
              <span className="mr-2">
                {this.props.industry && this.props.industry.name}
              </span>
              <i className="fa fa-angle-right mr-2" />
              {this.props.categories &&
                this.props.categories.map((category, catIndex) => {
                  if (catIndex > MAX_CAT) return null;
                  return (
                    <span key={category.id}>
                      {catIndex < MAX_CAT ? (
                        category.name
                      ) : (
                        <Dropdown
                          className="ml-2"
                          trigger={trigger}
                          pointing="top center"
                          icon={null}
                        >
                          {this.renderRemainingCategories()}
                        </Dropdown>
                      )}
                      {category.id !== lastCategory.id &&
                      catIndex < MAX_CAT - 1 ? (
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
            <Row className="mb-4">
              <Col xs="12" md="6">
                {/* <h2>About Us</h2> */}
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
                      {this.props.alwaysOpen ? (
                        <Card.Content>Always Open</Card.Content>
                      ) : (
                        this.props.workingHour.map((day, index) => {
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
                        })
                      )}
                    </Card>
                  </Col>
                </Row>
                {this.props.data &&
                (this.props.data.establishedYear ||
                  this.props.data.companyType) ? (
                  <Row className="mb-3">
                    <Col xs="12">
                      <Card>
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
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: {
        business_name,
        about,
        workingHour,
        alwaysOpen,
        industry,
        categories
      }
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
    alwaysOpen,
    industry,
    categories
  })
)(GenericSiteMainPage);
