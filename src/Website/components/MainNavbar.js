import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavItem, Input } from "reactstrap";
import { geolocated } from "react-geolocated";

import Avatar from "./Avatar";
import AutoSuggestion from "./AutoSuggestion";

import { onSearchQuerySubmit, onSearchResultsList } from "../actions";
import querystring from "querystring";

class MainNavbar extends Component {
  render() {
    return (
      <Navbar
        color="light"
        // light
        expand="md"
        className="main-nav"
        style={{ height: "85px" }}
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
          />
        </NavItem>
        {/* <div className="pull-right">{this.props.cookies && <Avatar />}</div> */}
        <NavItem className="ml-auto">
          {this.props.cookies && <Avatar />}
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
    onSearchResultsList
  }
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  })(MainNavbar)
);
