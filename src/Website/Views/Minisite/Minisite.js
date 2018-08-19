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

import sectionEpics from "./actions/editActions";
import minisiteEpics, {
  onBusinessGet,
  clearBusiness,
  OnSectionListGet
} from "./actions";
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
    this.props.OnSectionListGet();
    // if (this.props.section.length > 0) {
    //   console.log(this.props.section);
    // }
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
    console.log(this.props.section);
    if (this.props.section) {
    }
    return (
      <div>
        <MainNavbar history={this.props.history} match={this.props.match} />{" "}
        {this.props.section ? (
          <BusinessNav
            sections={this.props.section}
            isHome={this.props.match.path.indexOf(":minisiteRoute") === -1}
            url={this.props.match.params["minisiteRoute"]}
            history={this.props.history}
            businessName={this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]}
          />
        ) : (
          ""
        )}
        {this.props.mainLoading && !this.props.section ? (
          <Loading />
        ) : (
          <MinisiteRoutes
            params={this.props.match.params}
            sections={this.props.section}
          />
        )}{" "}
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
  combineEpics(...minisiteEpics, ...sectionEpics)
)(
  connect(
    ({ MinisiteContainer: { edit } }) => ({
      mainLoading: edit.mainLoading,
      section: edit.sections
    }),
    {
      onBusinessGet,
      clearBusiness,
      OnSectionListGet
    }
  )(Minisite)
);
