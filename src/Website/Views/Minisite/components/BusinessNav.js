import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

class BusinessNav extends Component {
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
        <Navbar color="faded" light expand="md">
          <NavbarBrand href={`/${this.props.name}`}>
            <img
              src={this.props.logo}
              alt="brand-logo"
              className="main_nav__brand-logo"
            />
            {/* {this.props.name} */}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-5" navbar>
              <NavItem active>
                <NavLink
                  href={`/${this.props.name}`}
                  className="minisite_business__nav__item"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" className="minisite_business__nav__item">
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" className="minisite_business__nav__item">
                  Gallery
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" className="minisite_business__nav__item">
                  Contact
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Button color="primary" onClick={this.props.onLogInClicked}>
            {this.props.loginStat ? "Log out" : "Login"}
          </Button>
        </Navbar>
      </div>
    );
  }
}

export default BusinessNav;
