import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge
} from "reactstrap";

import {
  USER_GROUP_BUSINESS,
  USER_GROUP_INDIVIDUAL,
  ROUTE_PARAMS_BUSINESS_NAME
} from "../../config/CONSTANTS";

import { Link } from "react-router-dom";

import avatar from "../../static/img/avatar.jpg";
import avatarItems from "../config/avatarItems";

class Avatar extends Component {
  state = { isOpen: false };

  static getDerivedStateFromProps = nextProps => ({
    group: nextProps.cookies.user_data.groups[0].name,
    username: nextProps.cookies.user_data.username
  });

  profileDropdowntoggle = () => this.setState({ isOpen: !this.state.isOpen });

  renderDropdownItems = () =>
    avatarItems.map(
      (avatarItem, i) =>
        !avatarItem.group ||
        (avatarItem.group === "ADMIN" &&
          this.state.group !== USER_GROUP_BUSINESS &&
          this.state.group !== USER_GROUP_INDIVIDUAL) ||
        avatarItem.group === this.state.group ? (
          <div key={i}>
            <DropdownItem divider />
            <Link
              to={avatarItem.link.replace(
                ROUTE_PARAMS_BUSINESS_NAME,
                this.state.username
              )}
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
                {avatarItem.title}
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
          isOpen={this.state.isOpen}
          toggle={this.profileDropdowntoggle}
          direction="top"
        >
          <DropdownToggle
            tag="span"
            onClick={this.profileDropdowntoggle}
            data-toggle="dropdown"
            aria-expanded={this.state.isOpen}
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
                <strong>{`Howdy, ${this.state.username}!`}</strong>
              </div>
              {this.renderDropdownItems()}
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ ...auth }))(Avatar);
