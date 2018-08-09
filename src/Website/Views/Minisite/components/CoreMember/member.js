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
      <div>
        <Card className="content-center">
          <CardHeader>
            {this.props.member.name}
            <Link
              to={`/${this.props.slug}/dashboard/coremember?memberid=${
                this.props.member.memberID
              }`}
              params={this.props.member.memberID}
            >
              <span
                data-tooltip="EDIT"
                // color="success"
                // id={"Popover-" + this.props.id}
                // onClick={this.toggle}
                // disabled={this.props.disabled}
                style={{ float: "right" }}
              >
                <i className="fa fa-edit" />{" "}
              </span>{" "}
            </Link>{" "}
          </CardHeader>
          <CardBody>
            <img
              src={`${MAIN_URL}${this.props.member.image}`}
              alt={this.props.member.name}
              height="128"
              width="150"
            />
            <CardTitle>
              {" "}
              Designation: {this.props.member.designation}{" "}
            </CardTitle>{" "}
            <CardText> </CardText>{" "}
            {this.props.member.socialProfile_links.map(links => {
              return (
                <CardLink href={links.address}>
                  <i className="fa fa-facebook-square" />
                </CardLink>
              );
            })}{" "}
          </CardBody>{" "}
        </Card>{" "}
      </div>
    );
  }
}
export default Member;
