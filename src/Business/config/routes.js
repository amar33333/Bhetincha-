import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  Dashboard,
  BusinessDetail,
  ManageProducts,
  ProductEdit,
  ProductView
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
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/business-detail`}
          name="Business Detail"
          component={BusinessDetail}
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
