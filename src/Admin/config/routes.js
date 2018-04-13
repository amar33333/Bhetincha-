import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  Dashboard,
  ManageUsers,
  Groups,
  Permissions,
  Settings,
  AddUser,
  Industry,
  Categories,
  SubCategories
} from "../views";

import CookiesProvider from "../../Common/utils/CookiesProvider";

class AdminRoute extends Component {
  render() {
    // const MATCH_URL = this.props.match.url;
    return (
      <Switch>
        <Route
          path="/admin/dashboard"
          name="Dashboard"
          component={Dashboard}
          permission="CAN_VIEW_DASHBOARD"
        />
        {/* {this.getPermissionRoutes(permissions_set)} */}
        <Route
          path="/admin/industry"
          name="Industry"
          component={Industry}
          permission="CAN_VIEW_DASHBOARD"
        />
        <Route
          path="/admin/categories"
          name="Categories"
          component={Categories}
          permission="CAN_VIEW_DASHBOARD"
        />
        <Route
          path="/admin/sub-categories"
          name="Sub Categories"
          component={SubCategories}
          permission="CAN_VIEW_DASHBOARD"
        />
        {/* <Route
          path="/admin/sections"
          name="Sections"
          component={Sections}
          permission="CAN_VIEW_DASHBOARD"
        /> */}
        <Route
          exact
          path="/admin/users"
          name="Users"
          component={ManageUsers}
          permission="CAN_VIEW_USERS"
        />
        <Route
          path="/admin/users/manage-users"
          name="Manage Users"
          component={ManageUsers}
          permission="CAN_VIEW_USERS"
        />
        <Route
          path="/admin/users/add-user"
          name="Add User"
          component={AddUser}
          permission="CAN_ADD_USERS"
        />
        <Route
          path="/admin/users/groups"
          name="Groups"
          component={Groups}
          permission="CAN_VIEW_GROUPS"
        />
        <Route
          path="/admin/users/permissions"
          name="Permissions"
          component={Permissions}
          permission="CAN_VIEW_PERMISSIONS"
        />

        <Route
          path="/admin/settings"
          name="Settings"
          component={Settings}
          permission="CAN_VIEW_SETTINGS"
        />

        <Redirect from="/admin" to="/admin/dashboard" />
        {/* <Route
          path={`${MATCH_URL}/component2`}
          name="Component 2"
          component={Component2}
        />
        <Route
          path={`${MATCH_URL}/dashboard`}
          name="Admin Dashboard"
          component={Dashboard}
        />
        <Redirect from={MATCH_URL} to={`${MATCH_URL}/dashboard`} /> */}
      </Switch>
    );
  }
}

export default AdminRoute;
