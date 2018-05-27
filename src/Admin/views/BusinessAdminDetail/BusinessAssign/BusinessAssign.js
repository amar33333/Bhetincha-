import React, { Component } from "react";
import { connect } from "react-redux";

import { onSalesUserList } from "../../../actions";

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

import MapComponent from "../../../../Common/components/MapComponent";
import UserComponent from "./UserComponent";
import BusinessTableComponent from "./BusinessTableComponent";

class BusinessAssign extends Component {
  state = {
    latitude: "",
    longitude: "",

    sales_username: ""
  };

  componentDidMount() {
    const rootRef = firebase
      .database()
      .ref()
      .child("Location");

    rootRef.on("value", snapshot => {
      this.setState({
        latitude: snapshot.child("latitude").val(),
        longitude: snapshot.child("longitude").val()
      });
    });
    this.props.onSalesUserList();
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = sales_username => this.setState({ sales_username });

  renderUserComponent = () =>
    this.state.sales_username ? (
      <UserComponent salesUser={this.state.sales_username} />
    ) : null;

  render() {
    console.log("bussines assign state: ", this.state);
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
                      position={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                      }}
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
          <BusinessTableComponent />
        </Col>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { business_reducer } }) => ({
    salesUsers: business_reducer.salesUsers
  }),
  {
    onSalesUserList
  }
)(BusinessAssign);
