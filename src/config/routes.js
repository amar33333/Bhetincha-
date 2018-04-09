import React, { Component } from "react";
import DynamicImport from "../Common/utils/DynamicImport";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Login, Register, Page404, Page500, Loading } from "../Common/pages";
import Website from "../Website";

const Admin = props => (
  <DynamicImport load={() => import("../Admin")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

class MainRoute extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/admin" name="Admin" component={Admin} />
          <Route path="/" name="Website" component={Website} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export { MainRoute };
