import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge } from "reactstrap";

import { Dropdown } from "semantic-ui-react";

import {
  USER_GROUP_BUSINESS,
  USER_GROUP_INDIVIDUAL,
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_INDIVIDUAL_NAME
} from "../../config/CONSTANTS";

import { MAIN_URL } from "../../Common/utils/API";

import { Link } from "react-router-dom";

import avatar from "../../static/img/avatar.png";
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
  state = {};

  componentDidMount() {
    this.setState({
      group: this.props.cookies.user_data.groups[0].name,
      username: this.props.cookies.user_data.username,
      slug: this.props.cookies.user_data.slug
    });
  }

  // static getDerivedStateFromProps = nextProps => ({
  //   group: nextProps.cookies.user_data.groups[0].name,
  //   username: nextProps.cookies.user_data.username,
  //   slug: nextProps.cookies.user_data.slug
  // });

  componentDidUpdate = prevProps => {
    if (this.props.cookies !== prevProps.cookies) {
      this.setState({
        group: this.props.cookies.user_data.groups[0].name,
        username: this.props.cookies.user_data.username,
        slug: this.props.cookies.user_data.slug
      });
    }
  };

  render() {
    const trigger = (
      <span>
        <img
          className="avatar"
          alt="Avatar"
          src={
            this.props.cookies && this.props.cookies.user_data.logo
              ? `${MAIN_URL}${this.props.cookies.user_data.logo}`
              : avatar
          }
        />
      </span>
    );
    greetings.sort(() => Math.random() - 0.5);
    return (
      <Dropdown
        trigger={trigger}
        pointing="top right"
        icon={null}
        className={this.props.className}
      >
        <Dropdown.Menu>
          <Dropdown.Header
            content={`${greetings[0]}, ${this.state.username}!`}
          />
          <Dropdown.Divider />
          {avatarItems.map((avatarItem, i) => {
            if (
              !avatarItem.group ||
              (avatarItem.group === "ADMIN" &&
                this.state.group !== USER_GROUP_BUSINESS &&
                this.state.group !== USER_GROUP_INDIVIDUAL) ||
              avatarItem.group === this.state.group
            ) {
              if (avatarItem.link) {
                return (
                  <Dropdown.Item key={i}>
                    <Link
                      style={{
                        color: "inherit",
                        width: "100%"
                      }}
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
                      <i
                        className={`${
                          avatarItem.className
                        } profile-dropdown__item__icon`}
                      />
                      {avatarItem.title}
                      {avatarItem.badge && (
                        <Badge color="warning">{avatarItem.badge}</Badge>
                      )}
                    </Link>
                  </Dropdown.Item>
                );
              } else if (
                this.props.show &&
                avatarItem.group === this.props.nonLink
              ) {
                return (
                  <Dropdown.Item key={i}>
                    <div
                      onClick={() => {
                        this.props.onClick();
                      }}
                    >
                      <i
                        className={`${
                          avatarItem.className[Number(this.props.titleIndex)]
                        } profile-dropdown__item__icon`}
                      />
                      {avatarItem.title[Number(this.props.titleIndex)]}
                      {avatarItem.badge && (
                        <Badge color="warning">{avatarItem.badge}</Badge>
                      )}
                    </div>
                  </Dropdown.Item>
                );
              }
              return null;
            }
            return null;
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default connect(({ auth: { cookies } }) => ({ cookies }))(Avatar);
