import React, { Component } from "react";
import { connect } from "react-redux";

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

import { onEditClicked } from "../actions";

class BusinessNav extends Component {
  state = { isOpen: false };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href={`/${this.props.businessName}`}>
            <img
              src={this.props.logo}
              alt="brand-logo"
              className="main_nav__brand-logo"
            />
            {/* {this.props.businessName} */}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-5" navbar>
              <NavItem active>
                <NavLink
                  href={`/${this.props.businessName}`}
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
          {this.props.cookies &&
            this.props.businessName ===
              this.props.cookies.user_data.username && (
              <Button color="primary" onClick={this.props.onEditClicked}>
                {this.props.minisite.edit ? "View" : "Edit"}
              </Button>
            )}
        </Navbar>
      </div>
    );
  }
}

export default connect(
  ({ MinisiteContainer: { minisite }, auth: { cookies } }) => ({
    cookies,
    minisite
  }),
  { onEditClicked }
)(BusinessNav);
