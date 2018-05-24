import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { MAIN_URL } from "../config/MINISITE_API";
import "../minisite.css";

import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
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

import { onEditMainClicked } from "../actions";

class BusinessNav extends Component {
  state = { isOpen: false, layout: [] };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  onItemDragged = layout => {
    this.setState({
      layout: layout
    });
  };

  onNavDragStop = items => {
    items.forEach(item => {
      item.y = 0;
    });
  };
  onNavClicked = e => {
    if (this.props.mainEdit) {
      e.stopPropagation();
      console.log("Nav Clicked", e);
      // return false;
    }
  };

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
              <ResponsiveGridLayout
                className="layout"
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                cols={{ md: 24 }}
                rowHeight={30}
                width={1200}
                isDraggable={this.props.mainEdit ? true : false}
                onLayoutChange={this.onItemDragged}
                preventCollision={false}
                compactType="horizontal"
                onDragStart={this.onNavDragStart}
                onDragStop={this.onNavDragStop}
              >
                <NavItem
                  key="home"
                  data-grid={{
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 1,
                    isResizable: false
                  }}
                >
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}`}
                    className="nav-link minisite_business__nav__item"
                  >
                    Home
                  </Link>
                </NavItem>
                <NavItem
                  key="about"
                  data-grid={{
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 1,
                    isResizable: false
                  }}
                >
                  <NavHashLink
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}#about-us`}
                    className="nav-link minisite_business__nav__item"
                    smooth
                  >
                    About
                  </NavHashLink>
                </NavItem>
                <NavItem
                  key="gallery"
                  data-grid={{
                    x: 4,
                    y: 0,
                    w: 2,
                    h: 1,
                    isResizable: false
                  }}
                >
                  <Link
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`/${this.props.businessName}/gallery`}
                    className="nav-link minisite_business__nav__item"
                  >
                    Gallery
                  </Link>
                </NavItem>
                <NavItem
                  key="contact"
                  data-grid={{
                    x: 6,
                    y: 0,
                    w: 2,
                    h: 1,
                    isResizable: false
                  }}
                >
                  <NavHashLink
                    onClick={this.onNavClicked}
                    draggable="false"
                    to={`#contact-us`}
                    className="nav-link minisite_business__nav__item"
                    smooth
                  >
                    Contact
                  </NavHashLink>
                </NavItem>
              </ResponsiveGridLayout>
            </Nav>
          </Collapse>
          {this.props.cookies &&
            this.props.businessName === this.props.cookies.user_data.slug && (
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
