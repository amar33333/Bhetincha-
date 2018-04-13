import React, { Component } from "react";
import { Navbar, NavbarBrand, NavItem, Input } from "reactstrap";

import { Avatar } from "../components";
// import { Image, Icon } from "semantic-ui-react";

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
          <NavbarBrand href="/">Bhetincha</NavbarBrand>
          <NavItem className="mx-auto">
            <Input
              icon="search"
              placeholder="Search..."
              className="main-nav-search"
            />
          </NavItem>
          <Avatar name={this.props.name} />
        </Navbar>
      </div>
    );
  }
}

export default MainNavbar;
