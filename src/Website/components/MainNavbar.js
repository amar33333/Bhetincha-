import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge
} from "reactstrap";

// import { Image, Icon } from "semantic-ui-react";

import avatar from "../../static/img/avatar.jpg";

class MainNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.profileDropdowntoggle = this.profileDropdowntoggle.bind(this);
    this.state = {
      isOpen: false,
      profileDropdownOpen: false
    };
  }

  profileDropdowntoggle() {
    this.setState({
      profileDropdownOpen: !this.state.profileDropdownOpen
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" className="main-nav">
          <NavbarBrand href="/">Bhetincha</NavbarBrand>
          <NavItem className="mx-auto">
            <Input
              icon="search"
              placeholder="Search..."
              className="main-nav-search"
            />
          </NavItem>
          <div>
            <Dropdown
              isOpen={this.state.profileDropdownOpen}
              toggle={this.profileDropdowntoggle}
              direction="top"
            >
              <DropdownToggle
                tag="span"
                onClick={this.profileDropdowntoggle}
                data-toggle="dropdown"
                aria-expanded={this.state.profileDropdownOpen}
              >
                <img className="avatar" alt="Avatar" src={avatar} />
                <i className="fa fa-chevron-down profile-dropdown__icon" />
              </DropdownToggle>
              <DropdownMenu right>
                <div className="profile-dropdown">
                  <div
                    onClick={this.profileDropdowntoggle}
                    className="profile-dropdown__item__heading"
                  >
                    <strong>{this.props.name}</strong>
                  </div>
                  <DropdownItem divider />
                  <div
                    onClick={this.profileDropdowntoggle}
                    className="profile-dropdown__item"
                  >
                    <i className="fa fa-dashboard profile-dropdown__item__icon" />Dashboard
                  </div>
                  <DropdownItem divider />
                  <div
                    onClick={this.profileDropdowntoggle}
                    className="profile-dropdown__item"
                  >
                    <i className="fa fa-bell profile-dropdown__item__icon" />Notification{" "}
                    <Badge color="warning">4</Badge>
                  </div>
                  <DropdownItem divider />
                  <div
                    onClick={this.profileDropdowntoggle}
                    className="profile-dropdown__item"
                  >
                    <i className="fa fa-lock profile-dropdown__item__icon" />Change
                    Password
                  </div>
                  <DropdownItem divider />
                  <div
                    onClick={this.profileDropdowntoggle}
                    className="profile-dropdown__item"
                  >
                    <i className="fa fa-sign-out profile-dropdown__item__icon" />Logout
                  </div>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default MainNavbar;
