import React, { Component } from "react";
import DynamicImport from "../../Common/utils/DynamicImport";
import { Route, Switch } from "react-router-dom";
import { Loading } from "../../Common/pages";
import { Home } from "../Views";

const Minisite = props => (
  <DynamicImport load={() => import("../Views/Minisite")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

class WebsiteRoute extends Component {
  render() {
    return (
      <Switch>
        <Route path="/:businessName" name="Minisite" component={Minisite} />
        <Route path="/" name="Home" component={Home} />
      </Switch>
    );
  }
}

export default WebsiteRoute;
