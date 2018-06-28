import React, { Component } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

import {
  Button,
  Input,
  Row,
  Label,
  Col,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";

class UserEditModal extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    group: ""
  };

  componentDidMount() {
    console.log("user edit data: ", this.props);
    const { first_name, last_name, username, email, group } = this.props.data;
    this.setState({
      group,
      first_name,
      last_name,
      username,
      email
    });
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = group => this.setState({ group });

  onFormEdit = event => {
    event.preventDefault();
    const { first_name, last_name, username, group, email } = this.state;

    this.props.onUserEdit({
      first_name,
      last_name,
      username,
      email,
      groups: [group.id]
    });
  };

  render() {
    const { group } = this.state;
    const value = group && group.id;

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label for="group">Group</Label>
              <Select
                autoFocus
                required
                ref={input => {
                  this.selectInput = input;
                }}
                name="group"
                value={value}
                onChange={this.handleSelectChange}
                options={this.props.groups}
                tabSelectsValue={false}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                required
                type="text"
                value={this.state.email}
                onChange={this.onChange.bind(this, "email")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6" md="6">
            <FormGroup>
              <Label for="fname">First Name</Label>
              <Input
                required
                type="text"
                value={this.state.first_name}
                onChange={this.onChange.bind(this, "first_name")}
                innerRef={input => {
                  this.nameInput = input;
                }}
              />
            </FormGroup>
          </Col>
          <Col xs="6" md="6">
            <FormGroup>
              <Label for="lname">Last Name</Label>
              <Input
                required
                type="text"
                value={this.state.last_name}
                onChange={this.onChange.bind(this, "last_name")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                required
                type="text"
                value={this.state.username}
                onChange={this.onChange.bind(this, "username")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Button color="primary" size="lg">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default UserEditModal;
