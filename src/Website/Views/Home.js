import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { geolocated } from "react-geolocated";

import logo from "../../static/img/logo_hd.png";
import "./home.css";

import { Avatar, AutoSuggestion } from "../components";

import { onSearchQuerySubmit, onStoreUserGeoLocation } from "../actions";

import { BottomFooter, LoginRegister } from "../components";
import querystring from "querystring";

const placeholder = [
  "Search Anything....",
  "Thakali Restaurants in Baneshwor",
  "Hotels in Thamel",
  "Schools in Lalitpur"
];

class Home extends Component {
  state = { query: "", result: "" };

  componentDidUpdate(prevProps) {
    if (prevProps.coords !== this.props.coords) {
      this.props.onStoreUserGeoLocation({
        user_geo_coords: {
          accuracy: this.props.coords.accuracy,
          altitude: this.props.coords.altitude,
          altitudeAccuracy: this.props.coords.altitudeAccuracy,
          latitude: this.props.coords.latitude,
          longitude: this.props.coords.longitude,
          speed: this.props.coords.speed
        }
      });
    }
  }

  render() {
    placeholder.sort(() => Math.random() - 0.5);
    return (
      <div className="body-wrapper">
        {!this.props.cookies ? (
          <div className="home-page__header">
            <LoginRegister history={this.props.history} />
          </div>
        ) : (
          <div className="home-page__header">
            <Avatar />
          </div>
        )}
        <div className="app flex-row align-items-center">
          <Container
            style={{
              marginTop: "-100px"
            }}
          >
            <Row className="justify-content-center">
              <Col xs="12" md="5" className="justify-content-center">
                <img alt="logo" src={logo} className="img-fluid" />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="12" md="8" className="home-page__searchbar ">
                <AutoSuggestion
                  // theme={theme}
                  placeholder={placeholder[0]}
                  valueKey="business_name"
                  autoFocus
                  suggestions={this.props.search_result.data}
                  onSuggestionsFetchRequested={this.props.onSearchQuerySubmit}
                  onSearchComplete={keyword => {
                    this.props.history.push({
                      pathname: "/businesses",
                      search: `?${querystring.stringify({
                        query:
                          keyword ||
                          `${
                            placeholder[0] !== "Search Anything...."
                              ? placeholder[0]
                              : ""
                          }`
                      })}`
                    });
                  }}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <BottomFooter theme="light" extraClass="bottom-footer__home" />
      </div>
    );
  }
}

export default connect(
  ({ auth: { cookies }, home, search_result }) => ({
    cookies,
    ...home,
    search_result
  }),
  {
    onSearchQuerySubmit,
    onStoreUserGeoLocation
  }
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true
    },
    userDecisionTimeout: 5000
  })(Home)
);
