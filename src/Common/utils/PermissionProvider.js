import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

let permissions_set = [
  // "CAN_VIEW_USER",
  // "CAN_ADD_USER",
  // "CAN_VIEW_COUNTRY",
  // "CAN_VIEW_STATE",
  // "CAN_VIEW_DISTRICT",
  // "CAN_VIEW_CITY",
  // "CAN_VIEW_AREA",
  // "CAN_ADD_BUSINESS",
  // "CAN_VIEW_BUSINESS",
  // "CAN_VIEW_INDUSTRY",
  // "CAN_VIEW_CATEGORY",
  // "CAN_VIEW_SUB_CATEGORY",
  // "CAN_VIEW_COMPANY_TYPE",
  // "CAN_VIEW_PAYMENT_METHOD",
  // "CAN_VIEW_LOGS",
  // "CAN_VIEW_TELE_CALLING",
  // "CAN_VIEW_GROUP",
  // "CAN_VIEW_PERMISSION"
];

class PermissionProvider extends Component {
  static updatePermissionList() {
    const user_data = cookies.get("user_data");

    if (user_data) {
      permissions_set = user_data.permissions.map(
        permission => permission.name
      );
      // permissions_set = user_data;
      // // console.log('adduser cookies: ', user_data);
      // console.log("PERMISION PROVIDER adduser cookies: ", permissions_set);
    } else {
      // console.log('PERMISSION PROVIDER user_data error');
    }
  }

  static hasPermission(permission) {
    this.updatePermissionList();
    // console.log('permissionperovider: ssdfsdf: ', this.state);
    if (permissions_set.includes(permission)) return true;

    return false;
  }

  render() {
    return this.constructor.hasPermission(this.props.permission)
      ? this.props.children
      : null; // You can replace ``this.constructor`` with ``ClassName`` i.e PermissionProvider
  }
}

export default PermissionProvider;
