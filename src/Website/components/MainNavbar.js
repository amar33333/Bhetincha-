import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, NavItem, Input } from "reactstrap";

import Avatar from "./Avatar";

class MainNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" className="main-nav">
          <Link to="/" className="navbar-brand">
            Bhetincha
          </Link>
          <NavItem className="mx-auto">
            <Input
              icon="search"
              placeholder="Search..."
              className="main-nav-search"
            />
          </NavItem>
          {this.props.cookies && <Avatar />}
        </Navbar>
      </div>
    );
  }
}

export default connect(({ auth: { cookies } }) => ({ cookies }))(MainNavbar);
