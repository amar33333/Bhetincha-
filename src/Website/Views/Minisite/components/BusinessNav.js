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

import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

import { onEditMainClicked } from "../actions";

class BusinessNav extends Component {
  state = {
    isOpen: false
  };

  toggle = () =>
    this.setState({
      isOpen: !this.state.isOpen
    });
  props;
  render() {
    const { url } = this.props;
    console.log(this.props.sections);
    let sectionlist = this.props.sections.map(section => {
      let sectionID = section.uid;
      let name = slugify(section.name);
      return (
        <NavItem
          key={section.name}
          className={url === section.name ? "active" : ""}
        >
          <Link
            to={`/${this.props.businessName}/${name}/${sectionID}`}
            className=""
          >
            {section.name}
          </Link>{" "}
        </NavItem>
      );
    });

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
            )}{" "}
            <NavbarToggler onClick={this.toggle} />{" "}
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
                  <Link to={`/${this.props.businessName}`}> Home </Link>{" "}
                </NavItem>{" "}
                <NavItem
                  key="gallery"
                  className={url === "gallery" ? "active" : ""}
                >
                  <Link to={`/${this.props.businessName}/gallery`}>
                    Gallery{" "}
                  </Link>{" "}
                </NavItem>{" "}
                <NavItem
                  key="ecommerce"
                  className={url === "ecommerce" ? "active" : ""}
                >
                  <Link
                    to={`/${this.props.businessName}/ecommerce`}
                    className=""
                  >
                    Ecommerce{" "}
                  </Link>{" "}
                </NavItem>{" "}
                {this.props.coreMember ? (
                  <NavItem
                    key="coremember"
                    className={url === "coremember" ? "active" : ""}
                  >
                    <Link
                      to={`/${this.props.businessName}/coremember`}
                      className=""
                    >
                      {this.props.coreMember.name}
                    </Link>{" "}
                  </NavItem>
                ) : (
                  ""
                )}
                {sectionlist}
                <NavItem
                  key="contact"
                  className={url === "contact" ? "active" : ""}
                >
                  <Link to={`/${this.props.businessName}/contact`} className="">
                    Contact{" "}
                  </Link>{" "}
                </NavItem>{" "}
              </Nav>{" "}
            </Collapse>{" "}
          </Navbar>{" "}
        </ScrollInNav>{" "}
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      edit,
      crud: { logo, coreMember }
    },
    auth: { cookies },
    search_result
  }) => ({
    cookies,
    mainEdit: edit.main,
    logo,
    search_result,
    coreMember
  }),
  {
    onEditMainClicked,
    onSearchQuerySubmit,
    onSearchResultsList
  }
)(BusinessNav);
