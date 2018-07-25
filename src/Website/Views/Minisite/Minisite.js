import React, { Component } from "react";
import { connect } from "react-redux";
import "./minisite.css";
import { combineEpics } from "redux-observable";

import { Loading } from "../../../Common/pages";
import { BusinessNav, BusinessFooter } from "./components";
import MinisiteRoutes from "./config/routes";
import withRepics from "../../../config/withRepics";
import reducers from "./reducers";
import { ROUTE_PARAMS_BUSINESS_NAME } from "../../../config/CONSTANTS";

import minisiteEpics, { onBusinessGet, clearBusiness } from "./actions";
import { MainNavbar } from "../../components";

class Minisite extends Component {
  getBusiness = () => {
    this.props.onBusinessGet({
      slug: this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME],
      history: this.props.history
    });
  };
  componentDidMount() {
    this.getBusiness();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params[ROUTE_PARAMS_BUSINESS_NAME] !==
      this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
    )
      this.getBusiness();
  }

  componentWillUnmount() {
    this.props.clearBusiness();
  }
  render() {
    return (
      <div>
        <MainNavbar history={this.props.history} />
        <BusinessNav
          isHome={this.props.match.path.indexOf(":minisiteRoute") === -1}
          history={this.props.history}
          businessName={this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]}
        />
        {this.props.mainLoading ? (
          <Loading />
        ) : (
          <MinisiteRoutes params={this.props.match.params} />
        )}
        <BusinessFooter
          businessName={this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]}
          sabai={this.props}
          theme="dark"
        />
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
  )(Minisite)
);
