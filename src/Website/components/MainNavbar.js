import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavItem, Input } from "reactstrap";

import Avatar from "./Avatar";
import AutoSuggestion from "./AutoSuggestion";

import { onSearchQuerySubmit, onSearchResultsList } from "../actions";
import querystring from "querystring";

class MainNavbar extends Component {
  render() {
    return (
      <Navbar
        justified
        color="light"
        light
        expand="md"
        className="main-nav"
        style={{ height: "85px" }}
        // fixed="top"
      >
        <NavbarBrand>
          <Link to="/" className="navbar-brand">
            Bhetincha
          </Link>
        </NavbarBrand>

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
                  query: keyword
                  //frm: 0,
                  //size: 5
                })}`
                // state: { detail: response.data }
              });
            }}
          />
        </NavItem>
        {/* {this.props.cookies && <Avatar />} */}
        <NavItem className="float-right">
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
)(MainNavbar);
