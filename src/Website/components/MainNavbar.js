import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavItem, Input } from "reactstrap";

import Avatar from "./Avatar";

class MainNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.profileDropdowntoggle = this.profileDropdowntoggle.bind(this);
    this.state = {
      isOpen: false,
      profileDropdownOpen: false
    };
  }

  profileDropdowntoggle() {
    this.setState({
      profileDropdownOpen: !this.state.profileDropdownOpen
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" className="main-nav">
          <Link to="/">
            <NavbarBrand>Bhetincha</NavbarBrand>
          </Link>
          <NavItem className="mx-auto">
            <Input
              icon="search"
              placeholder="Search..."
              className="main-nav-search"
            />
          </NavItem>
          <Avatar />
        </Navbar>
      </div>
    );
  }
}

export default MainNavbar;
