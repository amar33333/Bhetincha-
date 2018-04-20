import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { MAIN_URL } from "../config/MINISITE_API";
import "../minisite.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
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
              src={`${MAIN_URL}${this.props.logo}`}
              alt="brand-logo"
              className="main_nav__brand-logo"
            />
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-5" navbar>
              <NavItem>
                <Link
                  to={`/${this.props.businessName}`}
                  className="nav-link minisite_business__nav__item"
                >
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <NavHashLink
                  to={`/${this.props.businessName}#about-us`}
                  className="nav-link minisite_business__nav__item"
                  smooth
                >
                  About
                </NavHashLink>
              </NavItem>
              <NavItem>
                <Link
                  to={`/${this.props.businessName}/gallery`}
                  className="nav-link minisite_business__nav__item"
                >
                  Gallery
                </Link>
              </NavItem>
              <NavItem>
                <NavHashLink
                  to={`/${this.props.businessName}#contact-us`}
                  className="nav-link minisite_business__nav__item"
                  smooth
                >
                  Contact
                </NavHashLink>
              </NavItem>
            </Nav>
          </Collapse>
          {this.props.cookies &&
            this.props.businessName ===
              this.props.cookies.user_data.username && (
              <Button color="primary" onClick={this.props.onEditMainClicked}>
                {this.props.mainEdit ? "Preview" : "Edit Data"}
              </Button>
            )}
        </Navbar>
      </div>
    );
  }
}

export default connect(
  ({ MinisiteContainer: { edit, crud }, auth: { cookies } }) => ({
    cookies,
    mainEdit: edit.main,
    logo: crud.logo
  }),
  { onEditMainClicked }
)(BusinessNav);
