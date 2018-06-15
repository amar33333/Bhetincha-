import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, NavItem, Input } from "reactstrap";

import Avatar from "./Avatar";
import AutoSuggestion from "./AutoSuggestion";

import { onSearchQuerySubmit } from "../actions";

class MainNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar
          color="light"
          light
          expand="md"
          className="main-nav"
          style={{ height: "85px" }}
        >
          <Link to="/" className="navbar-brand">
            Bhetincha
          </Link>
          <NavItem style={{ width: "50%", marginRight: "30px" }}>
            {/* <Input
              icon="search"
              placeholder="Search..."
              className="main-nav-search"
              size="lg"
            /> */}
            <AutoSuggestion
              placeholder="Search anything..."
              valueKey="business_name"
              suggestions={this.props.search_result.data}
              onSuggestionsFetchRequested={this.props.onSearchQuerySubmit}
              onSearchItemSelected={business => {
                this.props.history.push(`/${business.slug}`);
              }}
              onSearchComplete={keyword => {
                this.props.history.push({
                  // pathname: "/businesses",
                  //query: keyword
                  search: `?query=${keyword}`
                  // state: { detail: response.data }
                });
              }}
            />
          </NavItem>
          {/* {this.props.cookies && <Avatar />} */}
          <NavItem right>{this.props.cookies && <Avatar />}</NavItem>
        </Navbar>
      </div>
    );
  }
}

export default connect(
  ({ auth: { cookies }, search_result }) => ({
    cookies,
    search_result
  }),
  { onSearchQuerySubmit }
)(MainNavbar);
