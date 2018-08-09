import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import Member from "./member";
class CoreMember extends Component {
  render() {
    let memberlist = this.props.coreMember.members.map(member => {
      return (
        <Col sm="2" xs="6">
          <Member member={member} slug={this.props.slug} />{" "}
        </Col>
      );
    });
    return (
      <div
        className="minisite_content__wrapper"
        style={{
          paddingTop: "70px"
        }}
      >
        <Row> {memberlist} </Row>{" "}
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: { coreMember, slug }
    },
    auth: { cookies }
  }) => ({
    cookies,
    coreMember,
    slug
  })
)(CoreMember);
