import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
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
            {" "}
            {this.props.name}{" "}
          </NavbarBrand>{" "}
          <NavbarToggler onClick={this.toggle} />{" "}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-5" navbar>
              <NavItem active>
                <NavLink href="/components/"> Home </NavLink>{" "}
              </NavItem>{" "}
              <NavItem>
                <NavLink href="#"> About </NavLink>{" "}
              </NavItem>{" "}
              <NavItem>
                <NavLink href="#"> Gallery </NavLink>{" "}
              </NavItem>{" "}
              <NavItem>
                <NavLink href="#"> Contact </NavLink>{" "}
              </NavItem>{" "}
            </Nav>{" "}
          </Collapse>{" "}
        </Navbar>{" "}
      </div>
    );
  }
}

export default BusinessNav;
