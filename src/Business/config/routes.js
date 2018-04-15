import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Dashboard } from "../views";

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

        <Redirect
          from={`/${businessName}/${businessRoute}`}
          to={`/${businessName}/dashboard`}
        />
      </Switch>
    );
  }
}

export default BusinessRoute;
