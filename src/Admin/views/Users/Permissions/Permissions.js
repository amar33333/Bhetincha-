import React, { Component } from "react";
import { connect } from "react-redux";

import { Loading } from "../../../../Common/pages";

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

const exclude_list = ["GROUP", "PERMISSION", "USER"];

class Permissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      permissions_list: null,
      group: null,
      excluded_permissions_list: null
    };
  }

  componentDidMount() {
    this.props.onGroupsList();
    this.props.onPermissionsList();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    console.log("permision props: ", nextProps);

    return {
      groups: nextProps.groups,
      group: prevState.group
        ? nextProps.groups.find(item => item.id === prevState.group.id)
        : nextProps.groups.find(item => item.name === "ADMIN"),

      permissions_list: nextProps.permissions_list
      // excluded_permissions_list: nextProps.permissions_list
      //   ? nextProps.permissions_list.filter(
      //       value => exclude_list.indexOf(value.name) === -1
      //     )
      //   : null
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

  onCheckboxChanged(event, checkbox_id) {
    let checked = event.target.checked;
    const { id: group_id } = this.state.group;

    this.props.onTogglePermission({
      group_id,
      global_permission: checkbox_id,
      checked
    });
  }

  isCollectiveChecked(key) {
    // console.log(
    //   "is checked: ",
    //   key,
    //   this.state.group &&
    //     this.state.group.permissions.filter(each => each.name.includes(key)),
    //   this.state.permissions_list[key]
    // );

    const checkedPermissionsLength =
      this.state.group &&
      this.state.group.permissions.filter(each => each.name.includes(key))
        .length;

    const actualPermissionsLength = this.state.permissions_list[key].length;

    return checkedPermissionsLength === actualPermissionsLength;
  }

  onCollectiveCheckboxChanged(event, key) {
    let checked = event.target.checked;
    const { id: group_id } = this.state.group;

    console.log(
      "collective: ",
      this.state.permissions_list[key],
      this.state.group
    );

    this.state.permissions_list[key].map(each => {
      this.props.onTogglePermission({
        group_id,
        global_permission: each.id,
        checked
      });
    });
  }

  renderCheckboxes() {
    const checkbox_perm_list =
      this.state.group && this.state.group.name === "ADMIN"
        ? this.state.permissions_list
        : this.state.permissions_list;

    console.log("checkbox perm list: ", checkbox_perm_list);

    return (
      checkbox_perm_list &&
      Object.keys(checkbox_perm_list).map((key, i) => {
        console.log("key: ", key);

        return (
          <ListGroupItem
            key={i}
            className="permission-checkbox"
            style={{ width: "60%" }}
          >
            {key !== "nogroup" ? (
              this.state.group && this.state.group.name === "ADMIN" ? (
                <p>
                  <Input
                    disabled
                    type="checkbox"
                    checked={this.isCollectiveChecked(key)}
                  />
                  <strong style={{ color: "red" }}>{key}</strong>
                </p>
              ) : (
                <p>
                  <Input
                    disabled={this.props.loading}
                    type="checkbox"
                    checked={this.isCollectiveChecked(key)}
                    onChange={event =>
                      this.onCollectiveCheckboxChanged(event, key)
                    }
                  />
                  <strong style={{ color: "red" }}>{key}</strong>
                </p>
              )
            ) : null}
            {checkbox_perm_list[key].map((item, j) => {
              return (
                <Label>
                  {this.state.group && this.state.group.name === "ADMIN" ? (
                    <Input
                      type="checkbox"
                      checked={this.isChecked(item.id)}
                      disabled
                    />
                  ) : (
                    <Input
                      disabled={this.props.loading}
                      type="checkbox"
                      checked={this.isChecked(item.id)}
                      onChange={event => this.onCheckboxChanged(event, item.id)}
                    />
                  )}

                  {item.name}
                </Label>
              );
            })}
          </ListGroupItem>
        );
      })
    );
    // return (
    //   checkbox_perm_list &&
    //   checkbox_perm_list.nogroup.map((item, i) => {
    //     console.log("item: ", item);

    //     return (
    //       <ListGroupItem
    //         key={i}
    //         className="permission-checkbox"
    //         style={{ width: "60%" }}
    //       >
    //         <Label>
    //           {this.state.group && this.state.group.name === "ADMIN" ? (
    //             <Input
    //               type="checkbox"
    //               checked={this.isChecked(item.id)}
    //               disabled
    //             />
    //           ) : (
    //             <Input
    //               disabled={this.props.loading}
    //               type="checkbox"
    //               checked={this.isChecked(item.id)}
    //               onChange={event =>
    //                 this.onCheckboxChanged(event, item.id, this.state.group.id)
    //               }
    //             />
    //           )}

    //           {item.name}
    //         </Label>
    //       </ListGroupItem>
    //     );
    //   })
    // );
  }

  render() {
    // console.log("permision props: ", this.props);
    console.log("permision state: ", this.state);
    return !this.props.permissionsLoading ? (
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
    ) : (
      <Loading />
    );
  }
}

export default connect(
  ({ AdminContainer: { user_reducer } }) => ({ ...user_reducer }),
  { onPermissionsList, onGroupsList, onTogglePermission }
)(Permissions);
