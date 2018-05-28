import React, { Component } from "react";
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

import Select from "react-select";

import MapComponent from "../../../../Common/components/MapComponent";

class UserComponent extends Component {
  render() {
    console.log("user compo: ", this.props);
    const {
      username,
      first_name,
      last_name,
      email,
      groups,
      phone_number
    } = this.props.salesUser;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Sales User: {username}</strong>
          </CardHeader>
          <CardBody>
            <p>
              Name : {first_name} {last_name}
            </p>
            <p> Email : {email}</p>
            <p> Department : {groups[0].name}</p>
            <p> Contact Number : {phone_number} </p>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserComponent;
