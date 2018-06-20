import React, { Component } from "react";
import DynamicImport from "../Common/utils/DynamicImport";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Login,
  Register,
  Page404,
  Page500,
  Loading,
  MobileVerification,
  UserRegister
} from "../Common/pages";
import Website from "../Website";

import Logout from "../Common/utils/Logout";
import CustomRoute from "../Common/utils/CustomRoute";

import {
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_BUSINESS_ROUTE,
  USER_GROUP_BUSINESS,
  USER_GROUP_ADMIN
  // USER_GROUP_INDIVIDUAL
} from "./CONSTANTS";

const AsyncAdmin = props => (
  <DynamicImport
    history={props.history}
    group={USER_GROUP_ADMIN}
    load={() => import("../Admin")}
  >
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const AsyncBusiness = props => (
  <DynamicImport
    history={props.history}
    group={USER_GROUP_BUSINESS}
    load={() => import("../Business")}
  >
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

class MainRoute extends Component {
  render() {
    console.log("mainroute");
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/logout" name="Logout Page" component={Logout} />

          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route
            exact
            path="/mobile-verification"
            name="Mobile Verification"
            component={MobileVerification}
          />
          <Route
            exact
            path="/user-register"
            name="User Register"
            component={UserRegister}
          />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route
            path="/admin"
            name="Admin"
            component={AsyncAdmin}
            permission="CAN_ACCESS_ADMIN_PANEL"
          />
          <Route
            path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard`}
            name="Business Dashboard"
            component={AsyncBusiness}
            permission="CAN_ACCESS_BUSINESS_PANEL"
          />
          <Route
            path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/dashboard/:${ROUTE_PARAMS_BUSINESS_ROUTE}`}
            name="Business Dashboard"
            component={AsyncBusiness}
            permission="CAN_ACCESS_BUSINESS_PANEL"
          />
          <Route path="/" name="Website" component={Website} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export { MainRoute };
