import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  Dashboard,
  PersonalDetails,
  Interests,
  EducationDetails,
  ExperienceDetails
} from "../views";

import {
  ROUTE_PARAMS_INDIVIDUAL_NAME,
  ROUTE_PARAMS_INDIVIDUAL_ROUTE
} from "../../config/CONSTANTS";
import EducationDetailsEdit from "../views/EducationDetailsEdit";

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
          exact
          path={`/:${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/education-details`}
          name="EducationDetails"
          component={EducationDetails}
        />
        <Route
          exact
          path={`/:${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/education-details/:id/edit`}
          name="EducationDetailsEdit"
          component={EducationDetailsEdit}
        />
        <Route
          exact
          path={`/:${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/experience-details`}
          name="ExperienceDetails"
          component={ExperienceDetails}
        />
        <Route
          exact
          path={`/:${ROUTE_PARAMS_INDIVIDUAL_NAME}/userdashboard/interests`}
          name="Interests"
          component={Interests}
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
