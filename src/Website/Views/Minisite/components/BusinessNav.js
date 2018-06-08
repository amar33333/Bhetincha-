import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { MAIN_URL } from "../config/MINISITE_API";
import "../minisite.css";

import { ScrollInNav } from "../../../components";
import PermissionProvider from "../../../../Common/utils/PermissionProvider";

import GridLayout from "react-grid-layout";
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

class BusinessNav extends Component {
  static getDerivedStateFromProps = nextProps => ({
    nav_layout: nextProps.nav_layout
  });

  state = {
    isOpen: false,
    nav_layout: []
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  // onItemDragged = layout => {
  //   this.setState({
  //     nav_layout: layout,
  //     height: null
  //   });
  // };

  onNavDragStop = items => {
    items.forEach(item => {
      item.y = 0;
      item.moved = true;
      console.log("X:", item.x, item.i, item.moved);
    });
    this.setState({
      nav_layout: items,
      height: null
    });
    // console.log(items);
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

  onNavChanged = () => {
    this.props.onBusinessUpdate({
      body: { nav_layout: this.state.nav_layout }
    });
  };

  render() {
    console.log("Nav_layout:", this.state.nav_layout);
    return (
      <div>
        <Navbar color="faded" light expand="md" className="business-navbar">
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
              <GridLayout
                className="layout"
                layout={this.state.nav_layout}
                cols={24}
                rowHeight={30}
                width={1200}
                isDraggable={this.props.mainEdit ? true : false}
                // onLayoutChange={this.onItemDragged}
                preventCollision={false}
                compactType="horizontal"
                // onDragStart={this.onNavDragStart}
                onDragStop={this.onNavDragStop}
              >
                <NavItem key="home">
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}`}
                    className="nav-link minisite_business__nav__item"
                  >
                    Home
                  </Link>
                </NavItem>
                <NavItem key="about">
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}/about`}
                    className="nav-link minisite_business__nav__item"
                  >
                    About
                  </Link>
                </NavItem>
                <NavItem key="gallery">
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}/gallery`}
                    className="nav-link minisite_business__nav__item"
                  >
                    Gallery
                  </Link>
                </NavItem>
                <NavItem key="contact">
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}/contact`}
                    className="nav-link minisite_business__nav__item"
                    // smooth
                  >
                    Contact
                  </Link>
                </NavItem>
              </GridLayout>
            </Nav>
          </Collapse>
          {/* <PermissionProvider permission="CAN_EDIT_MINISITE"> */}
          <Button color="primary" onClick={this.props.onEditMainClicked}>
            {this.props.mainEdit ? "Preview" : "Edit Data"}
          </Button>

          {this.props.mainEdit ? (
            <Button
              color="success"
              onClick={this.onNavChanged}
              style={{ marginLeft: 20 }}
            >
              <i className="fa fa-save" /> Save Nav
            </Button>
          ) : null}
          {/* </PermissionProvider> */}
        </Navbar>
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
    auth: { cookies }
  }) => ({
    cookies,
    mainEdit: edit.main,
    logo,
    nav_layout
  }),
  { onEditMainClicked, onBusinessUpdate }
)(BusinessNav);
