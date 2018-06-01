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
  Label
} from "reactstrap";
import * as firebase from "firebase";
import Select from "react-select";

import MapComponent from "../../../../Common/components/MapComponentAssign";
import UserComponent from "./UserComponent";
import BusinessTableComponent from "./BusinessTableComponent";

class BusinessAssign extends Component {
  state = {
    sales_username: "",
    salesUsersLocation: [],
    activePath: ""
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
        const Id = childSnapshot.child("id").val();

        rootRef
          .child(key)
          .child("location")
          .orderByKey()
          .limitToLast(1)
          .once("child_added", locationSnapShot => {
            salesUsersLocation.push({
              id: Id,
              username: childSnapshot.child("username").val(),
              location: locationSnapShot.val()
            });
          });
      });
      this.setState({ salesUsersLocation }, () =>
        console.log("buseinss state: ", this.state)
      );
    });

    this.props.onSalesUserList();
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  salesUserActivePath = activePath => {
    console.log("obetained activepath; ", activePath);
    this.setState({ activePath }, () =>
      console.log("state active path: ", activePath)
    );
  };

  setSalesUserFromMapMarker = payload => {
    const salesUser = this.props.salesUsers.find(
      each => each.mongo_id === payload.mongo_id
    );

    this.handleSelectChange(salesUser);
  };

  handleSelectChange = sales_username =>
    this.setState({ sales_username }, () => {
      console.log("sales; ", this.state.sales_username);
      return this.state.sales_username
        ? this.props.onAssignedPathEachList({
            id: this.state.sales_username.mongo_id
          })
        : null;
    });

  renderUserComponent = () =>
    this.state.sales_username ? (
      <UserComponent
        assignedPaths={this.props.assignedPaths}
        // activeTab={this.props.firstAssignedPathID}
        salesUser={this.state.sales_username}
        salesUserActivePath={this.salesUserActivePath}
      />
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
                      assignedPaths={this.props.assignedPaths}
                      setSalesUserFromMapMarker={this.setSalesUserFromMapMarker}
                      activePath={this.state.activePath}
                      selectedSalesUser={
                        this.state.salesUsersLocation &&
                        this.state.sales_username
                          ? this.state.salesUsersLocation.find(
                              each =>
                                each.id === this.state.sales_username.mongo_id
                            )
                          : ""
                      }
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
    assignedPaths: business_reducer.assignedPaths
  }),
  {
    onSalesUserList,
    onAssignedPathEachList
  }
)(BusinessAssign);
