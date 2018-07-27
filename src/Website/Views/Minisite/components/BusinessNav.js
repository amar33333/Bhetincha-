import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { geolocated } from "react-geolocated";

import { NavHashLink } from "react-router-hash-link";
import { MAIN_URL } from "../config/MINISITE_API";
import "../minisite.css";

import { ScrollInNav } from "../../../components";
import PermissionProvider from "../../../../Common/utils/PermissionProvider";

// import GridLayout from "react-grid-layout";
import onClickOutside from "react-onclickoutside";

import AutoSuggestion from "../../../../Website/components/AutoSuggestion";
import Avatar from "../../../../Website/components/Avatar";
import {
  onSearchQuerySubmit,
  onSearchResultsList
} from "../../../../Website/actions";
import querystring from "querystring";

// import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button
} from "reactstrap";

import { onEditMainClicked, onBusinessUpdate } from "../actions";

import { USER_GROUP_BUSINESS } from "../../../../config/CONSTANTS";

// const ResponsiveGridLayout = WidthProvider(Responsive);

class BusinessNav extends Component {
  static getDerivedStateFromProps = nextProps => ({
    nav_layout: nextProps.nav_layout
  });

  state = {
    isOpen: false,
    revealSearch: false,
    nav_layout: []
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  // onItemDragged = layout => {
  //   this.setState({
  //     nav_layout: layout,
  //     height: null
  //   });
  // };

  toggleSearch = () => {
    this.setState({
      revealSearch: !this.state.revealSearch
    });
  };

  handleClickOutside = () => {
    this.setState({
      revealSearch: false
    });
  };

  onNavDragStop = items => {
    console.log("onstop items:", items);
  };
  onNavClicked = e => {
    if (this.props.mainEdit) {
      e.preventDefault();
      console.log("Nav Clicked, Nav Disabled", e);
      return false;
    } else {
      return true;
    }
  };

  onNavChanged = layout => {
    layout.forEach(item => {
      item.y = 0;
      // item.moved = true;
    });
    this.setState(
      {
        nav_layout: layout
        // height: null
      },
      () => {
        console.log("on save nav:", this.state.nav_layout);
        console.log("on save nav, layout:", layout);
        this.props.mainEdit &&
          this.props.onBusinessUpdate({
            body: { nav_layout: layout }
          });
      }
    );
  };

  render() {
    const { url } = this.props;
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
                {/* <ResponsiveGridLayout
                  className="layout"
                  layouts={this.state.nav_layout}
                  breakpoints={{ lg: 1200 }}
                  cols={{ lg: 12, md: 12, sm: 2, xs: 2, xxs: 2 }}
                  rowHeight={30}
                  width={1200}
                  // preventCollision={false}
                  // compactType="horizontal"
                  onLayoutChange={this.onNavChanged}
                  onDragStop={this.onNavDragStop}
                > */}
                {/* <GridLayout
                  style={{
                    marginLeft: "200px"
                  }}
                  className="layout"
                  // layout={this.state.nav_layout}
                  layout={this.state.nav_layout}
                  cols={24}
                  rowHeight={30}
                  width={1200}
                  isDraggable={this.props.mainEdit ? true : false}
                  onLayoutChange={this.onNavChanged}
                  preventCollision={false}
                  compactType="horizontal"
                  // onDragStart={this.onNavDragStart}
                  // onDragStop={this.onNavDragStop}
                >
                  <NavItem key="home">
                    <Link
                      onClick={this.onNavClicked}
                      draggable="false"
                      to={`/${this.props.businessName}`}
                      className=""
                    >
                      Home
                    </Link>
                  </NavItem>
                   <NavItem key="about">

                    <Link
                      onClick={this.onNavClicked}
                      draggable="false"
                      to={`/${this.props.businessName}/about`}
                      className=""
                    >
                      About
                    </Link>
                  </NavItem> 
                  <NavItem key="gallery">
                    <Link
                      onClick={this.onNavClicked}
                      draggable="false"
                      to={`/${this.props.businessName}/gallery`}
                      className=""
                    >
                      Gallery
                    </Link>
                  </NavItem>
                  <NavItem key="contact">
                    <Link
                      onClick={this.onNavClicked}
                      draggable="false"
                      to={`/${this.props.businessName}/contact`}
                      className=""
                      // smooth
                    >
                      Contact
                    </Link>
                  </NavItem>
                </GridLayout> */}
                <NavItem
                  key="home"
                  className={this.props.isHome ? "active" : ""}
                >
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}`}
                  >
                    Home
                  </Link>
                </NavItem>
                {/* <NavItem key="about">
                    <Link
                      onClick={this.onNavClicked}
                      draggable="false"
                      to={`/${this.props.businessName}/about`}
                      className=""
                    >
                      About
                    </Link>
                  </NavItem> */}
                <NavItem
                  key="gallery"
                  className={url === "gallery" ? "active" : ""}
                >
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}/gallery`}
                  >
                    Gallery
                  </Link>
                </NavItem>
                <NavItem
                  key="ecommerce"
                  className={url === "ecommerce" ? "active" : ""}
                >
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}/ecommerce`}
                    className=""
                  >
                    Ecommerce
                  </Link>
                </NavItem>
                <NavItem
                  key="contact"
                  className={url === "contact" ? "active" : ""}
                >
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}/contact`}
                    className=""
                    // smooth
                  >
                    Contact
                  </Link>
                </NavItem>
                {/* <NavItem>
                  {this.state.revealSearch ? (
                    <div className="business_nav_search_wrapper">
                      <AutoSuggestion
                        initialQuery={this.props.initialQuery}
                        placeholder="Search anything..."
                        valueKey="business_name"
                        suggestions={this.props.search_result.data}
                        onSuggestionsFetchRequested={
                          this.props.onSearchQuerySubmit
                        }
                        onSearchItemSelected={business => {
                          this.props.history.push(`/${business.slug}`);
                        }}
                        onSearchComplete={keyword => {
                          this.props.history.push({
                            pathname: "/businesses",
                            //query: keyword
                            //search: `?query=${keyword}&frm=0&size=5`
                            search: `?${querystring.stringify({
                              query: keyword,
                              lat:
                                this.props.coords && this.props.coords.latitude,
                              lon:
                                this.props.coords && this.props.coords.longitude
                            })}`
                            // state: { detail: response.data }
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <Button
                      color="link"
                      tabIndex={0}
                      onClick={this.toggleSearch}
                    >
                      <i className="fa fa-search" />
                    </Button>
                  )}
                </NavItem> */}
              </Nav>
            </Collapse>

            {/* <NavItem className="">
              {this.props.cookies && (
                <Avatar
                  show={
                    this.props.businessName === this.props.cookies.user_data.slug
                  }
                  nonLink={USER_GROUP_BUSINESS}

                  titleIndex={this.props.mainEdit}
                  onClick={this.props.onEditMainClicked}
                />
              )}
            </NavItem> */}

            {/* {this.props.mainEdit ? (
              <Button
                color="success"
                onClick={this.onNavChanged}
                style={{ marginLeft: 20 }}
              >
                <i className="fa fa-save" /> Save Nav
              </Button>
            ) : null} */}
            {/* </PermissionProvider> */}
            {/* {this.props.cookies && (
              <Avatar
                show={
                  this.props.businessName === this.props.cookies.user_data.slug
                }
                nonLink={USER_GROUP_BUSINESS}
                titleIndex={this.props.mainEdit}
                onClick={this.props.onEditMainClicked}
              />
            )} */}
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
      crud: { logo, nav_layout }
    },
    auth: { cookies },
    search_result
  }) => ({
    cookies,
    mainEdit: edit.main,
    logo,
    nav_layout,
    search_result
  }),
  {
    onEditMainClicked,
    onBusinessUpdate,
    onSearchQuerySubmit,
    onSearchResultsList
  }
)(onClickOutside(BusinessNav));
