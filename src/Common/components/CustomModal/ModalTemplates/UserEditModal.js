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

import { ErrorHandling, validateEmail } from "../../../../Common/utils/Extras";

class UserEditModal extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    group: "",
    email_validation_error: false
  };

  componentDidMount() {
    const { first_name, last_name, username, email, group } = this.props.data;
    this.setState({
      group: this.props.data.groups.find(each => each.name === group),
      first_name,
      last_name,
      username,
      email,
      email_validation_error: email && !validateEmail(email)
    });
  }

  componentWillUnmount() {
    this.props.resetUserGroupErrors();
  }

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "email") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (this.state.email && !validateEmail(this.state.email)) {
          this.setState({ email_validation_error: true });
        } else this.setState({ email_validation_error: false });
      });
    } else this.setState({ [key]: val });
  };

  handleSelectChange = group => this.setState({ group });

  onFormEdit = event => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      username,
      group,
      email,
      email_validation_error
    } = this.state;

    if (!email_validation_error)
      this.props.onUserEdit({
        body: {
          first_name,
          last_name,
          username,
          email,
          groups: [group.id]
        },
        id: this.props.data.id
      });
  };

  displayEmailValidationInfo = () => {
    if (this.state.email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
  };

  render() {
    const { group } = this.state;
    const value = group && group.id;

    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label for="group">Group</Label>
              <Select
                autoFocus
                required
                name="group"
                value={value}
                onChange={this.handleSelectChange}
                options={this.props.data.groups}
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
                //required
                type="text"
                value={this.state.email}
                onChange={this.onChange.bind(this, "email")}
              />
            </FormGroup>
            {this.displayEmailValidationInfo()}
            <ErrorHandling
              error={
                this.props.userGroupEditErrors &&
                this.props.userGroupEditErrors.email
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs="6" md="6">
            <FormGroup>
              <Label for="fname">First Name</Label>
              <Input
                //required
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
                //required
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
            <ErrorHandling
              error={
                this.props.userGroupEditErrors &&
                this.props.userGroupEditErrors.username
              }
            />
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
