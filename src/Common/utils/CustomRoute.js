import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import PermissionProvider from "../utils/PermissionProvider";
import { Loading } from "../pages";

// const permissionProvider = new PermissionProvider();

class CustomRoute extends Component {
  render() {
    console.log("custom props: ", this.props);

    const { name, component, path } = this.props;
    const exact = this.props.exact === true ? true : false;

    // console.log('name: ', name, ' exact: ', exact, ' path: ', path, ' component: ', component);

    // let permissionProvider = new PermissionProvider();
    if (!this.props.permissions_loading) {
      if (PermissionProvider.hasPermission(this.props.permission)) {
        console.log("permission granted");
        return (
          <Route exact={exact} path={path} name={name} component={component} />
        );
      } else {
        console.log("no permission");
        return <Redirect to="/404" />;
      }
    } else {
      return <Loading />;
    }
  }
}

export default connect(({ auth }) => ({ ...auth }))(CustomRoute);
