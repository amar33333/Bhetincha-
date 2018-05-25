import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import PermissionProvider from "../../../../Common/utils/PermissionProvider";

class ManageUsers extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <PermissionProvider permission="CAN_ADD_USER">
          <Link to="/admin/users/add-user">
            <Button variant="raised" color="primary">
              Add New User
            </Button>
          </Link>
        </PermissionProvider>
        <p>Hello Manage Users !</p>
      </div>
    );
  }
}

export default ManageUsers;
