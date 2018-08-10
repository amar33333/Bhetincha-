import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  CardDeck,
  Button,
  CardFooter,
  CardHeader
} from "reactstrap";
import { Link } from "react-router-dom";

import { MAIN_URL } from "../../../../../Common/utils/API";
class Member extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ paddingBottom: "15%" }}>
        <Link
          to={`/${this.props.slug}/dashboard/coremember?memberid=${
            this.props.member.memberID
          }`}
          params={this.props.member.memberID}
        >
          <span data-tooltip="EDIT" style={{ float: "45" }}>
            <i className="fa fa-edit" />{" "}
          </span>{" "}
        </Link>{" "}
        <div
          style={{
            height: "128px",
            width: "150px",
            overflow: "hidden"
          }}
        >
          <img
            src={`${MAIN_URL}${this.props.member.image}`}
            alt={this.props.member.name}
            style={{
              width: "125px",
              height: "120px",
              borderRadius: "50%",
              color: "green"
            }}
            className="img-fluid"
          />
        </div>
        <strong> {this.props.member.name}</strong>
        <br /> {this.props.member.designation} <br />
        {this.props.member.socialProfile_links.map(links => {
          return (
            <CardLink href={links.address}>
              <i className="fa fa-facebook-square" />
            </CardLink>
          );
        })}{" "}
      </div>
    );
  }
}
export default Member;
