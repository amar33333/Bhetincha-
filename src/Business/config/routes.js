import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Dashboard, BusinessDetail } from "../views";
import {
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_BUSINESS_ROUTE
} from "../../config/CONSTANTS";

class BusinessRoute extends Component {
  render() {
    const businessName = this.props.params[ROUTE_PARAMS_BUSINESS_NAME];
    const businessRoute = this.props.params[ROUTE_PARAMS_BUSINESS_ROUTE];
    return (
      <Switch>
        <Route
          path={`/${businessName}/dashboard/home`}
          name="Dashboard"
          component={Dashboard}
        />
        <Route
          path={`/${businessName}/dashboard/business-detail`}
          name="Business Detail"
          component={BusinessDetail}
        />

        <Redirect
          from={`/${businessName}/dashboard/${businessRoute}`}
          to={`/${businessName}/dashboard/home`}
        />

        <Redirect
          from={`/${businessName}/dashboard`}
          to={`/${businessName}/dashboard/home`}
        />
      </Switch>
    );
  }
}

export default BusinessRoute;
