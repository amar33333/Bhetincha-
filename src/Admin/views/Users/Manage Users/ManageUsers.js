import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import CookiesProvider from "../../../../Common/utils/CookiesProvider";

class ManageUsers extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        {/* <PermissionProvider permission="CAN_ADD_USERS"> */}
        <Link to="/admin/users/add-user">
          <Button variant="raised" color="primary">
            Add New User
          </Button>
        </Link>
        {/* </PermissionProvider> */}
        <p>Hello Manage Users !</p>
      </div>
    );
  }
}

export default ManageUsers;
