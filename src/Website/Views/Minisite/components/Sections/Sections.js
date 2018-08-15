import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
class Sections extends Component {
  componentDidMount() {
    const { sectionId } = this.props.match.params;
    console.log(sectionId);
  }
  render() {
    return (
      <div
        className="minisite_content__wrapper "
        style={{
          paddingTop: "70px",
          paddingLeft: "50px"
        }}
      >
        <h1> hello section </h1>
      </div>
    );
  }
}

export default connect(
  ({
    MinisiteContainer: {
      crud: { slug }
    },
    auth: { cookies }
  }) => ({
    cookies,
    slug
  })
)(Sections);
