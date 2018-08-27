import React, { Component } from "react";
import { connect } from "react-redux";
import "./minisite.css";
import { combineEpics } from "redux-observable";

import { Loading } from "../../../Common/pages";
import { BusinessNav, BusinessFooter, ReviewRating } from "./components";
import MinisiteRoutes from "./config/routes";
import withRepics from "../../../config/withRepics";
import reducers from "./reducers";
import { ROUTE_PARAMS_BUSINESS_NAME } from "../../../config/CONSTANTS";

import minisiteEpics, {
  onBusinessGet,
  clearBusiness,
  onMinisitePermissionsList,
  onReviewRatingSubmit
} from "./actions";
import { MainNavbar } from "../../components";

import GenericSiteMainPage from "./GenericSiteMainPage";

class Minisite extends Component {
  componentDidMount() {
    this.getBusiness();
    this.props.onMinisitePermissionsList({
      id: this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
    });
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

  getBusiness = () => {
    this.props.onBusinessGet({
      slug: this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME],
      history: this.props.history
    });
  };

  render() {
    return (
      <div>
        <MainNavbar history={this.props.history} match={this.props.match} />
        {!this.props.minisitePermissionsFetchLoading &&
          this.props.minisitePermissions &&
          this.props.minisitePermissions.MINISITE && (
            <BusinessNav
              isHome={this.props.match.path.indexOf(":minisiteRoute") === -1}
              url={this.props.match.params["minisiteRoute"]}
              history={this.props.history}
              businessName={this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]}
              minisitePermissions={this.props.minisitePermissions}
            />
          )}
        {this.props.mainLoading ||
        this.props.minisitePermissionsFetchLoading ? (
          <Loading />
        ) : this.props.minisitePermissions &&
        this.props.minisitePermissions.MINISITE ? (
          <MinisiteRoutes
            params={this.props.match.params}
            minisitePermissions={this.props.minisitePermissions}
          />
        ) : (
          <GenericSiteMainPage />
        )}
        {!this.props.minisitePermissionsFetchLoading &&
          this.props.minisitePermissions &&
          this.props.minisitePermissions.MINISITE && (
            <ReviewRating
              slug={this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]}
              reviewedBy={this.props.mongo_id}
              onReviewRatingSubmit={this.props.onReviewRatingSubmit}
              reviewRatingSubmitLoading={this.props.reviewRatingSubmitLoading}
            />
          )}
        {!this.props.minisitePermissionsFetchLoading &&
          this.props.minisitePermissions &&
          this.props.minisitePermissions.MINISITE && (
            <BusinessFooter
              businessName={this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]}
              sabai={this.props}
              theme="dark"
            />
          )}
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
    ({
      auth: {
        cookies: {
          user_data: { mongo_id }
        }
      },
      MinisiteContainer: {
        edit,
        crud: {
          minisitePermissions,
          minisitePermissionsFetchLoading,
          reviewRatingSubmitLoading
        }
      }
    }) => ({
      mongo_id,
      mainLoading: edit.mainLoading,
      minisitePermissions,
      minisitePermissionsFetchLoading
    }),
    {
      onBusinessGet,
      clearBusiness,
      onMinisitePermissionsList,
      onReviewRatingSubmit
    }
  )(Minisite)
);
