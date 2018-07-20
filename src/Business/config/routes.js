import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  Dashboard,
  BusinessDetails,
  BusinessAbout,
  BusinessBranchAddress,
  BusinessPrimaryAddress,
  BusinessCoverImage,
  BusinessLogo,
  BusinessWorkingHour,
  ManageProducts,
  ManageSections,
  ProductEdit,
  ProductView,
  AddBranch
} from "../views";

import {
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_BUSINESS_ROUTE
} from "../../config/CONSTANTS";

class BusinessRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/home`}
          name="Dashboard"
          component={Dashboard}
        />
        {/* <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-detail`}
          name="Business Detail"
          component={BusinessDetail}
        /> */}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-details`}
          name="Business Details"
          component={BusinessDetails}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-working-hour`}
          name="BusinessWorkingHour"
          component={BusinessWorkingHour}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-branch-address/add-branch`}
          name="Add Branch Address"
          component={AddBranch}
          //permission="CAN_VIEW_DASHBOARD"
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-branch-address/:id/edit-branch`}
          name="Edit Branch Address"
          component={AddBranch}
          //permission="CAN_VIEW_DASHBOARD"
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-about`}
          name="BusinessAbout"
          component={BusinessAbout}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-primary-address`}
          name="BusinessPrimaryAddress"
          component={BusinessPrimaryAddress}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-branch-address`}
          name="BusinessBranchAddress"
          component={BusinessBranchAddress}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-logo`}
          name="BusinessLogo"
          component={BusinessLogo}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-cover-image`}
          name="BusinessCoverImage"
          component={BusinessCoverImage}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/ecommerce/manage-products/:productId/edit`}
          name="edit-ecommerce-product"
          component={ProductEdit}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/ecommerce/manage-products/:productId`}
          name="view-ecommerce-product"
          component={ProductView}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/ecommerce/manage-products`}
          name="manage-ecommerce-products"
          component={ManageProducts}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/section/manage-sections`}
          name="manage-exsection-sections"
          component={ManageSections}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard`}
          render={props => {
            return (
              <Redirect
                to={`/${
                  props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
                }/dashboard/home`}
              />
            );
          }}
        />
        {/* <Redirect
          from={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/:${ROUTE_PARAMS_BUSINESS_ROUTE}`}
          to={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/home`}
        /> */}
        {/* <Redirect
          from={`/:${ROUTE_PARAMS_BUSINESS_ROUTE}/dashboard`}
          to={`/:${ROUTE_PARAMS_BUSINESS_ROUTE}/dashboard/home`}
        /> */}
      </Switch>
    );
  }
}

export default BusinessRoute;
