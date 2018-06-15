import React, { Component } from "react";

import { connect } from "react-redux";

import store from "../../config/store";

/*
let permissions_set = [
  "CAN_ADD_USER",
  "CAN_VIEW_USER",
  "CAN_DELETE_USER",
  "CAN_EDIT_USER",

  "CAN_VIEW_COUNTRY",
  "CAN_EDIT_COUNTRY",
  "CAN_DELETE_COUNTRY",
  "CAN_ADD_COUNTRY",

  "CAN_VIEW_STATE",
  "CAN_ADD_STATE",
  "CAN_DELETE_STATE",
  "CAN_EDIT_STATE",

  "CAN_VIEW_DISTRICT",
  "CAN_EDIT_DISTRICT",
  "CAN_DELETE_DISTRICT",
  "CAN_ADD_DISTRICT",

  "CAN_VIEW_CITY",
  "CAN_ADD_CITY",
  "CAN_EDIT_CITY",
  "CAN_DELETE_CITY",

  "CAN_VIEW_AREA",
  "CAN_EDIT_AREA",
  "CAN_DELETE_AREA",
  "CAN_ADD_AREA",

  "CAN_ADD_BUSINESS",
  "CAN_VIEW_BUSINESS",
  "CAN_EDIT_BUSINESS",
  "CAN_DELETE_BUSINESS",

  "CAN_VIEW_INDUSTRY",
  "CAN_EDIT_INDUSTRY",
  "CAN_DELETE_INDUSTRY",
  "CAN_ADD_INDUSTRY",

  "CAN_ADD_CATEGORY",
  "CAN_EDIT_CATEGORY",
  "CAN_DELETE_CATEGORY",
  "CAN_VIEW_CATEGORY",

  "CAN_ADD_SUB_CATEGORY",
  "CAN_VIEW_SUB_CATEGORY",
  "CAN_DELETE_SUB_CATEGORY",
  "CAN_EDIT_SUB_CATEGORY",

  "CAN_VIEW_COMPANY_TYPE",
  "CAN_ADD_COMPANY_TYPE",
  "CAN_DELETE_COMPANY_TYPE",
  "CAN_EDIT_COMPANY_TYPE",

  "CAN_VIEW_PAYMENT_METHOD",
  "CAN_ADD_PAYMENT_METHOD",
  "CAN_DELETE_PAYMENT_METHOD",
  "CAN_EDIT_PAYMENT_METHOD",

  "CAN_VIEW_GROUP",
  "CAN_EDIT_GROUP",
  "CAN_DELETE_GROUP",
  "CAN_ADD_GROUP",

  "CAN_ACCESS_PERMISSION",
  "CAN_ACCESS_LOGS",
  "CAN_ACCESS_TELE_CALLING"
];
*/

class PermissionProvider extends Component {
  // static permissions_set = store
  //   .getState()
  //   .auth.cookies.user_data.permissions.map(each => each.name);
  // // static updatePermissionList() {
  // //   const user_data = cookies.get("user_data");

  // //   if (user_data) {
  // //     permissions_set = user_data.permissions.map(
  // //       permission => permission.name
  // //     );
  // //     // permissions_set = user_data;
  // //     // // console.log('adduser cookies: ', user_data);
  // //     // console.log("PERMISION PROVIDER adduser cookies: ", permissions_set);
  // //   } else {
  // //     // console.log('PERMISSION PROVIDER user_data error');
  // //   }
  // // }

  // static hasPermission(permission) {
  //   if (this.permissions_set.includes(permission)) return true;

  //   return false;
  // }

  render() {
    return this.props.children;
    // return this.constructor.hasPermission(this.props.permission)
    //   ? this.props.children
    //   : null; // You can replace ``this.constructor`` with ``ClassName`` i.e PermissionProvider
  }
}

export default connect(({ auth }) => ({ ...auth }))(PermissionProvider);
