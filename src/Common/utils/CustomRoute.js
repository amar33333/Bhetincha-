import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import PermissionProvider from "../utils/PermissionProvider";
import { Loading } from "../pages";

class CustomRoute extends Component {
  render() {
    const { name, component, path, params } = this.props;
    const exact = this.props.exact === true ? true : false;

    if (!this.props.permissions_loading) {
      if (PermissionProvider.hasPermission(this.props.permission)) {
        return (
          <Route
            exact={exact}
            path={path}
            name={name}
            component={component}
            params={params}
          />
        );
      } else {
        return <Redirect to="/404" />;
      }
    } else {
      return <Loading />;
    }
  }
}

export default connect(({ auth }) => ({ ...auth }))(CustomRoute);
