import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Dashboard, PersonalDetails } from "../views";

import {
  ROUTE_PARAMS_INDIVIDUAL_NAME,
  ROUTE_PARAMS_INDIVIDUAL_ROUTE
} from "../../config/CONSTANTS";

class IndividualRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`/:${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/home`}
          name="Dashboard"
          component={Dashboard}
        />
        <Route
          exact
          path={`/:${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/personal-details`}
          name="PersonalDetails"
          component={PersonalDetails}
        />

        <Route
          path={`/:${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard`}
          render={props => {
            return (
              <Redirect
                to={`/${
                  props.match.params[ROUTE_PARAMS_INDIVIDUAL_NAME]
                }/userdashboard/home`}
              />
            );
          }}
        />
      </Switch>
    );
  }
}

export default IndividualRoute;
