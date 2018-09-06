import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MAIN_URL } from "../config/MINISITE_API";
import "../minisite.css";
import slugify from "slugify";

import { ScrollInNav } from "../../../components";
// import onClickOutside from "react-onclickoutside";
import {
  onSearchQuerySubmit,
  onSearchResultsList
} from "../../../../Website/actions";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";

import { onEditMainClicked } from "../actions";
const MAX_SEC = 3;

class BusinessNav extends Component {
  constructor(props) {
    super(props);

    this.toggled = this.toggled.bind(this);
    this.state = {
      dropdownOpen: false,
      isOpen: false
    };
  }
  // state = {
  //   isOpen: false
  // };

  toggled() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { url } = this.props;
    var sectionlist;
    var Dropdownlist;
    if (this.props.sections !== undefined) {
      sectionlist = this.props.sections.map((section, index) => {
        let sectionID = section.uid;
        let name = slugify(section.name);
        if (index < MAX_SEC) {
          return (
            <NavItem key={index} className={url === name ? "active" : ""}>
              <Link
                to={`/${this.props.businessName}/${name}/${sectionID}`}
                className=""
              >
                {section.name}
              </Link>{" "}
            </NavItem>
          );
        }
      });
    }
    if (this.props.sections !== undefined) {
      Dropdownlist = this.props.sections.map((section, index) => {
        let sectionID = section.uid;
        let name = slugify(section.name);
        if (index >= MAX_SEC) {
          return (
            <DropdownItem key={index}>
              <Link
                to={`/${this.props.businessName}/${name}/${sectionID}`}
                className=""
              >
                {section.name}
              </Link>{" "}
            </DropdownItem>
          );
        }
      });
    }
    console.log("my dropdownlist=", Dropdownlist);
    console.log("my sectionlist=", sectionlist);

    return (
      <div>
        <ScrollInNav scrollInHeight={1}>
          <Navbar
            // fixed="top"
            color="faded"
            light
            expand="md"
            className="business-navbar"
          >
            {!this.props.isHome && (
              <Link to={`/${this.props.businessName}`} className="navbar-brand">
                <img
                  src={`${MAIN_URL}${this.props.logo}`}
                  alt="brand-logo"
                  className="main_nav__brand-logo__routes"
                />
              </Link>
            )}

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav
                navbar
                className={
                  this.props.isHome
                    ? `business-nav__wrapper__for-home`
                    : `business-nav__wrapper`
                }
              >
                <NavItem
                  key="home"
                  className={this.props.isHome ? "active" : ""}
                >
                  <Link to={`/${this.props.businessName}`}>Home</Link>
                </NavItem>
                <NavItem
                  key="gallery"
                  className={url === "gallery" ? "active" : ""}
                >
                  <Link to={`/${this.props.businessName}/gallery`}>
                    Gallery
                  </Link>
                </NavItem>
                {sectionlist}

                {this.props.minisitePermissions &&
                  this.props.minisitePermissions.ECOMMERCE && (
                    <NavItem
                      key="ecommerce"
                      className={url === "ecommerce" ? "active" : ""}
                    >
                      <Link
                        to={`/${this.props.businessName}/ecommerce`}
                        className=""
                      >
                        Ecommerce
                      </Link>
                    </NavItem>
                  )}
                <NavItem
                  key="contact"
                  className={url === "contact" ? "active" : ""}
                >
                  <Link to={`/${this.props.businessName}/contact`} className="">
                    Contact
                  </Link>
                </NavItem>
                {this.props.sections.length > MAX_SEC ? (
                  <Dropdown
                    nav
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggled}
                  >
                    <DropdownToggle nav caret>
                      More
                    </DropdownToggle>
                    <DropdownMenu>{Dropdownlist}</DropdownMenu>
                  </Dropdown>
                ) : (
                  ""
                )}
              </Nav>
            </Collapse>
          </Navbar>
        </ScrollInNav>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      edit,
      crud: { logo }
    },
    auth: { cookies },
    search_result
  }) => ({
    cookies,
    mainEdit: edit.main,
    logo,
    search_result
  }),
  {
    onEditMainClicked,
    onSearchQuerySubmit,
    onSearchResultsList
  }
)(BusinessNav);
