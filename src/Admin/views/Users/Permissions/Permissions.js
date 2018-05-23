import React, { Component } from "react";
import { connect } from "react-redux";

import {
  onPermissionsList,
  onGroupsList,
  onTogglePermission
} from "../../../actions/userActions";

import {
  Row,
  Col,
  Input,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Label
} from "reactstrap";

const exclude_list = ["CAN_VIEW_GROUP", "CAN_VIEW_PERMISSION", "CAN_VIEW_USER"];

class Permissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      permissions_list: [],
      group: null,
      excluded_permissions_list: []
    };
  }

  componentDidMount() {
    this.props.onGroupsList();
    this.props.onPermissionsList();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {
      groups: nextProps.groups,
      group: prevState.group
        ? nextProps.groups.find(item => item.id === prevState.group.id)
        : nextProps.groups.find(item => item.name === "ADMIN"),

      permissions_list: nextProps.permissions_list,
      excluded_permissions_list: nextProps.permissions_list.length
        ? nextProps.permissions_list.filter(
            value => exclude_list.indexOf(value.codename) === -1
          )
        : []
    };
  };

  renderGroupList() {
    return this.state.groups.map(group => (
      <ListGroupItem
        active={this.state.group && group.id === this.state.group.id}
        className="permission-group-item"
        key={group.id}
        onClick={() => {
          this.setState({ group });
        }}
        tag="button"
        style={{ width: "100%" }}
      >
        {group.name}
      </ListGroupItem>
    ));
  }

  isChecked(id) {
    if (
      this.state.group &&
      this.state.group.permissions.find(each => each.id === id)
    )
      return true;

    return false;
  }

  onCheckboxChanged(event, checkbox_id, group_id) {
    let checked = event.target.checked;

    this.props.onTogglePermission({
      group_id,
      global_permission: checkbox_id,
      checked
    });
  }

  renderCheckboxes() {
    const checkbox_perm_list =
      this.state.group && this.state.group.name === "ADMIN"
        ? this.state.permissions_list
        : this.state.excluded_permissions_list;

    return checkbox_perm_list.map((item, i) => (
      <ListGroupItem
        key={i}
        className="permission-checkbox"
        style={{ width: "60%" }}
      >
        <Label>
          {this.state.group && this.state.group.name === "ADMIN" ? (
            <Input type="checkbox" checked={this.isChecked(item.id)} disabled />
          ) : (
            <Input
              disabled={this.props.loading}
              type="checkbox"
              checked={this.isChecked(item.id)}
              onChange={event =>
                this.onCheckboxChanged(event, item.id, this.state.group.id)
              }
            />
          )}

          {item.codename}
        </Label>
      </ListGroupItem>
    ));
  }

  render() {
    console.log("permision props: ", this.props);
    console.log("permision state: ", this.state);
    return (
      <div className="animated fadeIn">
        {/* <ListGroup style={{ "width": "30%" }}> */}
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Manage Permissions</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="3">
                    {this.renderGroupList()}
                  </Col>
                  <Col xs="12" md="9">
                    <ListGroup>
                      <form>{this.renderCheckboxes()}</form>
                    </ListGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {/* </ListGroup> */}
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { user_reducer } }) => ({ ...user_reducer }),
  { onPermissionsList, onGroupsList, onTogglePermission }
)(Permissions);
