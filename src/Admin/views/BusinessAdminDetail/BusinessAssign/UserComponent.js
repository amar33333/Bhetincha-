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
    return (
      <Card>
        <CardHeader>
          <strong>Sales User: {this.props.username}</strong>
        </CardHeader>
        <CardBody>
          <p> hello </p>
        </CardBody>
      </Card>
    );
  }
}

export default UserComponent;
