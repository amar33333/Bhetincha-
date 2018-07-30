import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavItem, Row, Col } from "reactstrap";
import { geolocated } from "react-geolocated";
import Avatar from "./Avatar";
import AutoSuggestion from "./AutoSuggestion";
import LoginRegister from "./LoginRegister";

import {
  onSearchQuerySubmit,
  onSearchResultsList,
  onStoreUserGeoLocation
} from "../actions";
import querystring from "querystring";

import { onEditMainClicked } from "../Views/Minisite/actions";

import { USER_GROUP_BUSINESS } from "../../config/CONSTANTS";

// import theme from "./theme-small.css";

class MainNavbar extends Component {
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
    return (
      <div>
        <Row>
          <Col>
            <Navbar
              color="light"
              // light
              expand="md"
              className="main-nav"
              // style={{ height: "85px" }}
              // fixed="top"
            >
              <NavbarBrand href="/">Bhetincha</NavbarBrand>

              <NavItem
                className="main_nav__autosuggest__wrapper"
                style={{ width: "50%", marginRight: "30px", marginTop: "17px" }}
              >
                <AutoSuggestion
                  from="navbar"
                  initialQuery={this.props.initialQuery}
                  placeholder="Search anything..."
                  valueKey="business_name"
                  suggestions={this.props.search_result.data}
                  onSuggestionsFetchRequested={this.props.onSearchQuerySubmit}
                  onSearchItemSelected={business => {
                    this.props.history.push(`/${business.slug}`);
                  }}
                  onSearchComplete={keyword => {
                    this.props.history.push({
                      pathname: "/businesses",
                      //query: keyword
                      //search: `?query=${keyword}&frm=0&size=5`
                      search: `?${querystring.stringify({
                        query: keyword
                        /* lat: this.props.coords && this.props.coords.latitude,
                        lon: this.props.coords && this.props.coords.longitude*/

                        //frm: 0,
                        //size: 5
                      })}`
                      // state: { detail: response.data }
                    });
                  }}
                />
              </NavItem>
              {/* <div className="pull-right">{this.props.cookies && <Avatar />}</div> */}
              <NavItem className="ml-auto">
                {this.props.cookies ? (
                  <Avatar
                    show={
                      this.props.match.params.businessName ===
                      this.props.cookies.user_data.slug
                    }
                    nonLink={USER_GROUP_BUSINESS}
                    titleIndex={this.props.mainEdit}
                    onClick={this.props.onEditMainClicked}
                  />
                ) : (
                  <LoginRegister history={this.props.history} />
                )}
              </NavItem>
            </Navbar>
          </Col>
        </Row>
        {/* {this.props.withTools && (
          <Row>
            <Col>nice</Col>
          </Row>
        )} */}
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    search_result,
    MinisiteContainer: {
      edit: { main: mainEdit }
    }
  }) => ({
    cookies,
    search_result,
    mainEdit
  }),
  {
    onSearchQuerySubmit,
    onSearchResultsList,
    onStoreUserGeoLocation,
    onEditMainClicked
  }
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true
    },
    userDecisionTimeout: 5000
  })(MainNavbar)
);
