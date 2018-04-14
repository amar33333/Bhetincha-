import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
let permissions_set = [];

const user_data = cookies.get("user_data");
// if(user_data) {
//     // permissions_set = user_data.permissions.map(permission => permission.name);
//     permissions_set = user_data;
//     // // console.log('adduser cookies: ', user_data);
//     // console.log('PERMISION PROVIDER adduser cookies: ', permissions_set);
// } else {
//     // console.log('PERMISSION PROVIDER user_data error');
// }
// try {
//     user_data = cookies.get('user_data');
//     permissions_set = user_data.permissions.map(permission => permission.name);

//     // console.log('adduser cookies: ', user_data);
// } catch(error) {
//     // console.log('user_data error: ', error);
// }

// permissions_set = [
//     'CAN_ADD_USER',
//     'CAN_VIEW_USERS',
//     'CAN_VIEW_GROUPS',
//     'CAN_VIEW_PERMISSIONS',
//     'CAN_ACCESS_FOOD_CATEGORIES',
//     'CAN_ACCESS_FOOD_CATEGORY',
//     'CAN_ACCESS_FOOD_ITEMS',
//     'CAN_ACCESS_FOOD_ITEM',
//     'CAN_ACCESS_INVENTORY',
//     'CAN_ACCESS_BILL',
//     'CAN_ACCESS_INVENTORY',
// ];

// console.log('permission cookeies: ', permissions_set);

class PermissionProvider extends Component {
  constructor(props) {
    super(props);
  }

  static updatePermissionList() {
    const user_data = cookies.get("user_data");

    if (user_data) {
      permissions_set = user_data.permissions.map(
        permission => permission.name
      );
      // permissions_set = user_data;
      // // console.log('adduser cookies: ', user_data);
      // console.log('PERMISION PROVIDER adduser cookies: ', permissions_set);
    } else {
      // console.log('PERMISSION PROVIDER user_data error');
    }
  }

  static hasPermission(permission) {
    this.updatePermissionList();
    // console.log('permissionperovider: ssdfsdf: ', this.state);
    if (
      permissions_set.includes(permission) ||
      permission === "CAN_VIEW_DASHBOARD" ||
      permission === "CAN_VIEW_SETTINGS" ||
      permission === "CAN_LOGOUT"
    )
      return true;

    return false;
  }

  render() {
    return this.constructor.hasPermission(this.props.permission)
      ? this.props.children
      : null; // You can replace ``this.constructor`` with ``ClassName`` i.e PermissionProvider
  }
}

export default PermissionProvider;
