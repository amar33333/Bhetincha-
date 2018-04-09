import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Dashboard, Component2 } from "../views";

class WebsiteRoute extends Component {
  render() {
    const MATCH_URL = this.props.match.url;
    return (
      <Switch>
        <Route
          path={`${MATCH_URL}/component2`}
          name="Component 2"
          component={Component2}
        />
        <Route
          path={`${MATCH_URL}/dashboard`}
          name="Admin Dashboard"
          component={Dashboard}
        />
        <Redirect from={MATCH_URL} to={`${MATCH_URL}/dashboard`} />
      </Switch>
    );
  }
}

export default WebsiteRoute;
