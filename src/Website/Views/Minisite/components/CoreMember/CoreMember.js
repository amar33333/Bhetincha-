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
import Member from "./member";
class CoreMember extends Component {
  render() {
    let memberlist = this.props.coreMember.members.map(member => {
      return (
        <Col sm="3">
          <Member member={member} />
        </Col>
      );
    });
    return (
      <div
        className="minisite_content__wrapper"
        style={{
          paddingTop: "60px"
        }}
      >
        <Row>{memberlist}</Row>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: { coreMember }
    },
    auth: { cookies }
  }) => ({
    cookies,
    coreMember
  })
)(CoreMember);
