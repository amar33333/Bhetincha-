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
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_INDIVIDUAL_NAME
} from "../../config/CONSTANTS";

import { Link } from "react-router-dom";

import avatar from "../../static/img/avatar.jpg";
import avatarItems from "../config/avatarItems";

const greetings = [
  "Hi",
  "Hello",
  "Howdy",
  "Namaste",
  "Hola",
  "नमस्ते",
  "Bonjour"
];

class Avatar extends Component {
  state = { isOpen: false };

  static getDerivedStateFromProps = nextProps => ({
    group: nextProps.cookies.user_data.groups[0].name,
    username: nextProps.cookies.user_data.username,
    slug: nextProps.cookies.user_data.slug
  });

  profileDropdowntoggle = () => this.setState({ isOpen: !this.state.isOpen });

  renderDropdownItems = () =>
    avatarItems.map((avatarItem, i) => {
      if (
        !avatarItem.group ||
        (avatarItem.group === "ADMIN" &&
          this.state.group !== USER_GROUP_BUSINESS &&
          this.state.group !== USER_GROUP_INDIVIDUAL) ||
        avatarItem.group === this.state.group
      ) {
        if (avatarItem.link) {
          return (
            <div key={i}>
              <DropdownItem divider />
              <Link
                to={
                  this.state.group === USER_GROUP_BUSINESS
                    ? avatarItem.link.replace(
                        ROUTE_PARAMS_BUSINESS_NAME,
                        this.state.slug
                      )
                    : this.state.group === USER_GROUP_INDIVIDUAL
                      ? avatarItem.link.replace(
                          ROUTE_PARAMS_INDIVIDUAL_NAME,
                          this.props.cookies.user_data.username
                        )
                      : avatarItem.link
                }
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
          );
        } else if (this.props.show && avatarItem.group === this.props.nonLink) {
          return (
            <div key={i}>
              <DropdownItem divider />
              <div
                onClick={() => {
                  this.profileDropdowntoggle();
                  this.props.onClick();
                }}
                className="profile-dropdown__item"
              >
                <i
                  className={`${
                    avatarItem.className[Number(this.props.titleIndex)]
                  } profile-dropdown__item__icon`}
                />
                {avatarItem.title[Number(this.props.titleIndex)]}
                {avatarItem.badge && <Badge color="warning">4</Badge>}
              </div>
            </div>
          );
        }
        return null;
      }
      return null;
    });

  render() {
    greetings.sort(() => Math.random() - 0.5);
    return (
      <Dropdown
        isOpen={this.state.isOpen}
        toggle={this.profileDropdowntoggle}
        // direction="left"
      >
        <DropdownToggle
          tag="span"
          onClick={this.profileDropdowntoggle}
          data-toggle="dropdown"
          aria-expanded={this.state.isOpen}
        >
          <img className="avatar" alt="Avatar" src={avatar} />
          {/* <i className="fa fa-chevron-down profile-dropdown__icon" /> */}
        </DropdownToggle>
        <DropdownMenu right>
          <div className="profile-dropdown">
            <div
              onClick={this.profileDropdowntoggle}
              className="profile-dropdown__item__heading"
            >
              <strong>{`${greetings[0]}, ${this.state.username}!`}</strong>
            </div>
            {this.renderDropdownItems()}
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default connect(({ auth: { cookies } }) => ({ cookies }))(Avatar);
