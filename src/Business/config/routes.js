import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Dashboard, BusinessDetail } from "../views";
class BusinessRoute extends Component {
  render() {
    const { businessName, businessRoute } = this.props.params;
    return (
      <Switch>
        <Route
          path={`/${businessName}/dashboard`}
          name="Dashboard"
          component={Dashboard}
        />

        <Route
          path={`/${businessName}/business-detail`}
          name="Business Detail"
          component={BusinessDetail}
        />

        <Redirect
          from={`/${businessName}/${businessRoute}`}
          to={`/${businessName}/dashboard`}
        />
      </Switch>
    );
  }
}

export default BusinessRoute;
