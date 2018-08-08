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
  CardDeck
} from "reactstrap";
import { MAIN_URL } from "../../../../../Common/utils/API";
class Member extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <img
              src={`${MAIN_URL}${this.props.member.image}`}
              alt="Card image cap"
              height="150"
              width="150"
            />
            <CardTitle>Name: {this.props.member.name}</CardTitle>
            <CardText>Designation: {this.props.member.designation}</CardText>

            {this.props.member.socialProfile_links.map()}
            <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default Member;
