import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Gallery, MainPage } from "../components";
import {
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_MINISITE_BUSINESS_ROUTE
} from "../../../../config/CONSTANTS";

class MinisiteRoute extends Component {
  render() {
    const businessName = this.props.params[ROUTE_PARAMS_BUSINESS_NAME];
    const minisiteBusinessRoute = this.props.params[
      ROUTE_PARAMS_MINISITE_BUSINESS_ROUTE
    ];
    return (
      <Switch>
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/gallery`}
          name="Minisite-Gallery"
          component={Gallery}
        />

        <Redirect
          from={`/${businessName}/${minisiteBusinessRoute}`}
          to={`/${businessName}`}
        />

        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}`}
          name="Minisite-MainPage"
          component={MainPage}
        />
      </Switch>
    );
  }
}

export default MinisiteRoute;
