import React, { Component } from "react";
import DynamicImport from "../Common/utils/DynamicImport";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, Register, Page404, Page500, Loading } from "../Common/pages";
import Website from "../Website";
import { Gallery } from "../Website/Views/Minisite/components";

import Logout from "../Common/utils/Logout";
import {
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_BUSINESS_ROUTE
} from "./CONSTANTS";

const AsyncAdmin = props => (
  <DynamicImport history={props.history} load={() => import("../Admin")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const AsyncBusiness = props => (
  <DynamicImport history={props.history} load={() => import("../Business")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

class MainRoute extends Component {
  render() {
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
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/admin" name="Admin" component={AsyncAdmin} />
          <Route path="/gallery" name="Gallery" component={Gallery} />
          <Route
            path={`/${ROUTE_PARAMS_BUSINESS_NAME}/${ROUTE_PARAMS_BUSINESS_ROUTE}`}
            name="Business Dashboard"
            component={AsyncBusiness}
          />
          <Route path="/" name="Website" component={Website} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export { MainRoute };
