import React, { Component } from "react";
import { Route } from "react-router-dom";

class MinisitePermissionRoute extends Component {
  render() {
    const { name, component, path, params } = this.props;
    const exact = this.props.exact === true ? true : false;

    return this.props.permission ? (
      <Route
        exact={exact}
        path={path}
        name={name}
        component={component}
        params={params}
      />
    ) : null;
  }
}

export default MinisitePermissionRoute;
