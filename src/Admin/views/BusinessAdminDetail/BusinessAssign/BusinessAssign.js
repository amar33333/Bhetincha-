import React, { Component } from "react";
import { connect } from "react-redux";
import { onSalesUserList, onAssignedPathEachList } from "../../../actions";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
  Nav,
  NavItem
} from "reactstrap";
import * as firebase from "firebase";
import Select from "react-select";

import MapComponent from "../../../../Common/components/MapComponent";
import UserComponent from "./UserComponent";
import BusinessTableComponent from "./BusinessTableComponent";

class BusinessAssign extends Component {
  state = {
    sales_username: "",
    salesUsersLocation: []
  };

  componentDidMount() {
    const rootRef = firebase
      .database()
      .ref()
      .child("Users");

    rootRef.on("value", snapshot => {
      let salesUsersLocation = [];

      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const Id = childSnapshot.child("Id").val();

        rootRef
          .child(key)
          .child("Location")
          .orderByKey()
          .limitToLast(1)
          .once("child_added", locationSnapShot => {
            salesUsersLocation.push({
              Id: Id,
              Username: childSnapshot.child("Username").val(),
              Location: locationSnapShot.val()
            });
          });
      });
      this.setState({ salesUsersLocation });
    });

    this.props.onSalesUserList();
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = sales_username =>
    this.setState({ sales_username }, () => {
      return this.state.sales_username
        ? this.props.onAssignedPathEachList({
            id: this.state.sales_username.mongo_id
          })
        : null;
    });

  renderUserComponent = () =>
    this.state.sales_username ? (
      <UserComponent salesUser={this.state.sales_username} />
    ) : null;

  render() {
    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Sales Team Live Location</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="12">
                  <Card className="p-3">
                    <strong className="mb-2">Sales Team Location</strong>
                    <MapComponent
                      ref={ref => (this.mapComponentEl = ref)}
                      position={this.state.salesUsersLocation}
                      onClick={this.onChangeLatLng}
                      onDragEnd={this.onChangeLatLng}
                    />
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <strong>Search Sales User</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="12">
                  <FormGroup>
                    <Select
                      autoFocus
                      required
                      name="sales_username"
                      placeholder="Select a User ... "
                      value={
                        this.state.sales_username &&
                        this.state.sales_username.id
                      }
                      onChange={this.handleSelectChange}
                      options={this.props.salesUsers}
                      valueKey="id"
                      labelKey="username"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardBody>{this.renderUserComponent()}</CardBody>
          </Card>
          <BusinessTableComponent selectedUser={this.state.sales_username} />
        </Col>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { business_reducer } }) => ({
    salesUsers: business_reducer.salesUsers,
    assignedPath: business_reducer.assignedPath
  }),
  {
    onSalesUserList,
    onAssignedPathEachList
  }
)(BusinessAssign);
