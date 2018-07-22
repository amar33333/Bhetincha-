import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavItem, Input } from "reactstrap";
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
// import theme from "./theme-small.css";

const theme = {
  container: {
    position: "relative"
  },
  input: {
    width: "100% !important",
    height: "50px !important",
    padding: "10px 20px",
    fontWeight: 300,
    fontSize: "16px",
    border: "1px solid #aaa",
    borderRadius: "4px"
  },
  inputFocused: {
    outline: "none"
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: "none"
  },
  suggestionsContainerOpen: {
    display: "block",
    position: "absolute",
    top: 51,
    width: 280,
    border: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  suggestion: {
    cursor: "pointer",
    padding: "10px 20px"
  },
  suggestionHighlighted: {
    backgroundColor: "#ddd"
  }
};

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
      <Navbar
        color="light"
        // light
        expand="md"
        className={`main-nav ${this.props.extraClassName}`}
        // style={{ height: "85px" }}
        // fixed="top"
      >
        <NavbarBrand href="/">Bhetincha</NavbarBrand>

        <NavItem
          style={{ width: "50%", marginRight: "30px", marginTop: "17px" }}
        >
          {/* <Input
              icon="search"
              placeholder="Search..."
              className="main-nav-search"
              size="lg"
            /> */}
          <AutoSuggestion
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
                  query: keyword,
                  lat: this.props.coords && this.props.coords.latitude,
                  lon: this.props.coords && this.props.coords.longitude

                  //frm: 0,
                  //size: 5
                })}`
                // state: { detail: response.data }
              });
            }}
            theme={theme}
          />
        </NavItem>
        {/* <div className="pull-right">{this.props.cookies && <Avatar />}</div> */}
        <NavItem className="ml-auto">
          {this.props.cookies ? (
            <Avatar />
          ) : (
            <LoginRegister history={this.props.history} />
          )}
        </NavItem>
      </Navbar>
    );
  }
}

export default connect(
  ({ auth: { cookies }, search_result }) => ({
    cookies,
    search_result
  }),
  {
    onSearchQuerySubmit,
    onSearchResultsList,
    onStoreUserGeoLocation
  }
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true
    },
    userDecisionTimeout: 5000
  })(MainNavbar)
);
