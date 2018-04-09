import React, { Component } from "react";
// import logo from "./logo.svg";
// import "../../static/css/styles.css";
// import { Input, Dropdown } from "semantic-ui-react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input
} from "reactstrap";

// import { Image, Icon } from "semantic-ui-react";

import avatar from "../../static/img/avatar.jpg";
const trigger = <span />;

const options = [
  {
    key: "user",
    text: (
      <span>
        Signed in as <strong>Tech Kunja</strong>
      </span>
    ),
    disabled: true
  },
  { key: "profile", text: "Your Profile" },
  { key: "stars", text: "Your Stars" },
  { key: "explore", text: "Explore" },
  { key: "integrations", text: "Integrations" },
  { key: "help", text: "Help" },
  { key: "settings", text: "Settings" },
  { key: "sign-out", text: "Sign Out" }
];

class MainNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
          {/* <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-5" navbar>
              <NavItem>
                <NavLink href="/components/">Home</NavLink>
              </NavItem>
            </Nav>
          </Collapse> */}
          <div>
            <img alt="Avatar" src={avatar} avatar />
            {/* <Dropdown
              basic
              trigger={trigger}
              direction={"left"}
              pointing={"top"}
              options={options}
              className="mr-5 user-dropdown"
            /> */}
          </div>
        </Navbar>
      </div>
    );
  }
}

export default MainNavbar;
