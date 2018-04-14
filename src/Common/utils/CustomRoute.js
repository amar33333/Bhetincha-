import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";

import PermissionProvider from "../utils/PermissionProvider";

// const permissionProvider = new PermissionProvider();

class CustomRoute extends Component {
  constructor(props) {
    super(props);
    // console.log('customRoute props: ', this.props);
  }

  render() {
    const { name, component, path } = this.props;
    const exact = this.props.exact === true ? true : false;

    // console.log('name: ', name, ' exact: ', exact, ' path: ', path, ' component: ', component);

    if (PermissionProvider.hasPermission(this.props.permission)) {
      // console.log('permission granted');
      return (
        <Route exact={exact} path={path} name={name} component={component} />
      );
    } else {
      // console.log('no permission');
      return <Redirect to="/Page404" />;
    }
  }
}

export default CustomRoute;
