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
import { SINGLE_PLACEHOLDER_URL } from "../../Common/utils/API";

const PLACEHOLDER_CONSTANT = "Search any business...";

class Home extends Component {
  state = { query: "", result: "", placeholder: PLACEHOLDER_CONSTANT };

  componentDidMount() {
    fetch(SINGLE_PLACEHOLDER_URL)
      .then(response => response.json())
      .then(data => data.name && this.setState({ placeholder: data.name }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coords !== this.props.coords) {
      // if (this.props.coords)
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

    // } else {
    //   this.props.onStoreUserGeoLocation({
    //     user_geo_coords: null
    //   });
    // }
  }

  render() {
    // console.log("prop: ", this.props);
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
              <Col xs="8" md="5" className="justify-content-center">
                <img alt="logo" src={logo} className="img-fluid" />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="12" md="8" className="home-page__searchbar ">
                <AutoSuggestion
                  // theme={theme}
                  from="home"
                  placeholder={this.state.placeholder}
                  valueKey="business_name"
                  valueKey2="name"
                  autoFocus
                  suggestions={this.props.search_result.data}
                  onSuggestionsFetchRequested={this.props.onSearchQuerySubmit}
                  onSearchComplete={keyword => {
                    (keyword ||
                      this.state.placeholder !== PLACEHOLDER_CONSTANT) &&
                      this.props.history.push({
                        pathname: "/businesses",
                        search: `?${querystring.stringify({
                          query:
                            keyword ||
                            `${
                              this.state.placeholder !== PLACEHOLDER_CONSTANT
                                ? this.state.placeholder
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
