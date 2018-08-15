import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Container } from "reactstrap";
import { combineEpics } from "redux-observable";
import withRepics from "../../../../../config/withRepics";
import { eachSectionGet } from "./actions/sectionActions";
import sectionReducer from "./reducer";
import sectionEpics from "./actions";
class Sections extends Component {
  componentDidMount() {
    const { sectionId } = this.props.match.params;
    console.log(sectionId);
    this.props.eachSectionGet({ sectionId });
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

export default withRepics(
  "SectionContainer",
  sectionReducer,
  combineEpics(...sectionEpics)
)(
  connect(
    ({ SectionContainer: { auth } }) => ({
      ...auth
    }),
    {
      eachSectionGet
    }
  )(Sections)
);
