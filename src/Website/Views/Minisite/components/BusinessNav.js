import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

import { onEditMainClicked } from "../actions";

class BusinessNav extends Component {
  state = { isOpen: false };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <Link to={`/${this.props.businessName}`} className="navbar-brand">
            <img
              src={this.props.logo}
              alt="brand-logo"
              className="main_nav__brand-logo"
            />
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-5" navbar>
              <NavItem active>
                <Link
                  to={`/${this.props.businessName}`}
                  className="nav-link minisite_business__nav__item"
                >
                  Home
                </Link>
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
              <Button color="primary" onClick={this.props.onEditMainClicked}>
                {this.props.mainEdit ? "View" : "Edit"}
              </Button>
            )}
        </Navbar>
      </div>
    );
  }
}

export default connect(
  ({ MinisiteContainer: { edit }, auth: { cookies } }) => ({
    cookies,
    mainEdit: edit.main
  }),
  { onEditMainClicked }
)(BusinessNav);
