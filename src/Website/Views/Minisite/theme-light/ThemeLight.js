import React, { Component } from "react";
import { connect } from "react-redux";
import "../minisite.css";
import { combineEpics } from "redux-observable";

import { Loading } from "../../../../Common/pages";
import { BusinessNav, BusinessFooter } from "../components";
import MinisiteRoutes from "../config/routes";
import withRepics from "../../../../config/withRepics";
import reducers from "../reducers";
import { ROUTE_PARAMS_BUSINESS_NAME } from "../../../../config/CONSTANTS";

import minisiteEpics, { onBusinessGet, clearBusiness } from "../actions";
class ThemeLight extends Component {
  render() {
    return (
      <div>
        <BusinessNav
          businessName={this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]}
        />
        {this.props.mainLoading ? (
          <Loading />
        ) : (
          <MinisiteRoutes params={this.props.match.params} />
        )}
        <BusinessFooter theme="dark" />
      </div>
    );
  }
}

export default withRepics(
  "MinisiteContainer",
  reducers,
  combineEpics(...minisiteEpics)
)(
  connect(
    ({ MinisiteContainer: { edit } }) => ({
      mainLoading: edit.mainLoading
    }),
    { onBusinessGet, clearBusiness }
  )(ThemeLight)
);
