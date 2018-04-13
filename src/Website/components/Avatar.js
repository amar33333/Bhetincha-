import React, { Component } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge
} from "reactstrap";

import { Link } from "react-router-dom";

import avatar from "../../static/img/avatar.jpg";
import avatarItems from "../config/avatarItems";

class Avatar extends Component {
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

  renderDropdownItems = () =>
    avatarItems.map(
      avatarItem =>
        !avatarItem.group ||
        (avatarItem.group === "admin" &&
          this.props.group !== "business" &&
          this.props.group !== "individual") ||
        avatarItem.group === this.props.group ? (
          <div>
            <DropdownItem divider />
            <Link
              to={avatarItem.link.replace(":businessName", this.props.name)}
            >
              <div
                onClick={this.profileDropdowntoggle}
                className="profile-dropdown__item"
              >
                <i
                  className={`${
                    avatarItem.className
                  } profile-dropdown__item__icon`}
                />
                {`${avatarItem.title} `}
                {avatarItem.badge && <Badge color="warning">4</Badge>}
              </div>
            </Link>
          </div>
        ) : null
    );

  render() {
    return (
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
              {this.renderDropdownItems()}
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default Avatar;
