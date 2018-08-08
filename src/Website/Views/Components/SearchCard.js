import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  Media,
  // Card,
  // CardBody,
  // CardFooter,
  Badge
} from "reactstrap";
import { Card, Divider, Button } from "semantic-ui-react";
import moment from "moment";

import { MAIN_URL } from "../../../Common/utils/API";

class SearchCard extends Component {
  render() {
    const { searchResult } = this.props;

    const momentNow = moment().format("hh:mm A");
    const today = moment().format("dddd");

    return (
      <Card fluid raised className="search-result__card">
        <Card.Content>
          <Media>
            <Media left href="#">
              <Media
                object
                // data-src={avatar}
                src={
                  searchResult.logo
                    ? `${MAIN_URL}${searchResult.logo}`
                    : `${MAIN_URL}/media/default_logo.png`
                }
                className="result-page__thumbnail"
                alt="Generic placeholder image"
              />
            </Media>
            <Media body className="ml-3">
              <small>Business</small>
              <Media className="result-header__text">
                <Link to={searchResult.slug}>
                  {searchResult.business_name}{" "}
                  {searchResult.verified && (
                    <span data-tooltip="Verified">
                      <i
                        className="fa fa-check-circle"
                        style={{ color: "green", fontSize: "1.2rem" }}
                        // data-tooltip="Add users to your feed"
                      />
                    </span>
                  )}
                </Link>
              </Media>
              <div className="mb-1">
                <Badge color="warning" pill className="mr-1">
                  {searchResult.industry}
                </Badge>
                {searchResult.categories &&
                  searchResult.categories.map((category, index) => (
                    <Badge
                      key={index}
                      color="info"
                      pill
                      className="mr-1"
                      style={{ color: "white" }}
                    >
                      {category}
                    </Badge>
                  ))}
              </div>
              {searchResult.address ? (
                <span
                  // data-tooltip="Get Direction"
                  // data-position="right center"
                  style={{ fontSize: "1.2rem" }}
                >
                  {/* <i className="fa fa-map-marker" />{" "} */}
                  {searchResult.address &&
                    searchResult.address.area &&
                    `${searchResult.address.area.area},`}{" "}
                  {searchResult.address &&
                    searchResult.address.area &&
                    searchResult.address.area.city}{" "}
                  <br />
                </span>
              ) : null}

              {searchResult.business_phone ? (
                <div style={{ color: "rgb(35, 35, 34)" }}>
                  <i className="fa fa-phone" /> {searchResult.business_phone}
                </div>
              ) : null}
              {searchResult.business_email ? (
                <div style={{ color: "rgb(35, 35, 34)" }}>
                  <i className="fa fa-envelope-o" />{" "}
                  {searchResult.business_email}
                </div>
              ) : null}

              {/* <div
                      className="fa-stack fa-sm"
                      style={{ color: "rgb(35, 35, 34)" }}
                    >
                      <i className="fa fa-circle-thin fa-stack-2x" />
                      <i className="fa fa-globe fa-stack-1x" />
                    </div> */}
            </Media>
          </Media>
          <Divider />
          <Row>
            {/* <Col sm="2">
                    <i className="fa fa-thumbs-up" />
                    <Badge color="warning" pill>
                      23
                    </Badge>
                  </Col> */}

            {searchResult.claimed ? (
              <Col
                xs="2"
                sm="2"
                style={{ cursor: "pointer" }}
                // onClick={this.onClaimed(searchResult.id)}
              >
                <Button circular basic>
                  <i className="fa fa-lock" />{" "}
                  <span className="d-none d-md-inline">Claimed</span>
                </Button>
              </Col>
            ) : (
              <Col
                xs="2"
                sm="2"
                style={{ cursor: "pointer" }}
                onClick={this.props.onClaimed(searchResult)}
              >
                <Button circular basic>
                  <i className="fa fa-unlock" />{" "}
                  <span className="d-none d-md-inline">Claim</span>
                </Button>
              </Col>
            )}

            <Col
              xs="2"
              sm="3"
              style={{ cursor: "pointer" }}
              onClick={this.props.onImproveListingClicked(searchResult)}
            >
              <Button circular basic>
                <i className="fa fa-list" />{" "}
                <span className="d-none d-md-inline">Improve Listing</span>
              </Button>
            </Col>
            {/* <Col sm="2">
                  <i className="fa fa-envelope-o" /> Email
                </Col>
                <Col sm="2">
                  <i className="fa fa-phone" /> Call
                </Col> */}
            <Col sm="3" xs="2">
              <Button
                circular
                basic
                onClick={this.props.onGetDirectionClicked({
                  primary_address: searchResult.address,
                  branchAddress: searchResult.branchAddress
                })}
              >
                <i className="fa fa-location-arrow" />{" "}
                <span className="d-none d-md-inline">Get Direction</span>
              </Button>
            </Col>
            {searchResult.industry === "Restaurants" ? (
              <Col sm="3">
                <Button circular basic>
                  <i className="fa fa-cutlery" aria-hidden="true" />{" "}
                  <span className="d-none d-md-inline">View </span>
                  Menu
                </Button>
              </Col>
            ) : null}
          </Row>
        </Card.Content>
        <div
          style={{
            position: "absolute",
            // backgroundColor: "#0719ece0",
            // opacity: 0.5,
            padding: 10,
            color: "inherit",
            top: "0px",
            right: "10px"
          }}
        >
          {searchResult.workingHour &&
            searchResult.workingHour.map((day, index) => {
              let newStart = day.start + "Z";
              newStart = moment(newStart).format("hh:mm A");
              let newEnd = day.end + "Z";
              newEnd = moment(newEnd).format("hh:mm A");
              if (day.day === today && searchResult.alwaysOpen) {
                return (
                  <small
                    key={index}
                    data-tooltip={`Always Open`}
                    data-position="bottom center"
                  >
                    <i className="fa fa-clock-o" /> Open Now
                  </small>
                );
              } else if (day.day === today && !day.holiday) {
                if (
                  moment(momentNow, "hh:mm A").isBetween(
                    moment(newStart, "hh:mm A"),
                    moment(newEnd, "hh:mm A")
                  )
                ) {
                  return (
                    <small
                      key={index}
                      data-tooltip={`${newStart} - ${newEnd}`}
                      data-position="bottom center"
                    >
                      <i className="fa fa-clock-o" /> Open Now
                    </small>
                  );
                } else if (day.day === today && day.holiday) {
                  return (
                    <small
                      key={index}
                      data-tooltip={`${newStart} - ${newEnd}`}
                      data-position="bottom center"
                      style={{ color: "red" }}
                    >
                      Holiday
                    </small>
                  );
                } else {
                  return (
                    <small
                      key={index}
                      data-tooltip={`${newStart} - ${newEnd}`}
                      data-position="bottom center"
                      style={{ color: "red" }}
                    >
                      Closed
                    </small>
                  );
                }
              } else {
                return null;
              }
            })}
        </div>
      </Card>
    );
  }
}

export default SearchCard;
