import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Label,
  FormGroup
} from "reactstrap";

import {
  onUserSubmit,
  onGroupsList,
  resetUserGroupErrors
} from "../../../../actions";

import {
  ErrorHandling,
  validateEmail
} from "../../../../../Common/utils/Extras";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      group: "",
      email_validation_error: false
    };
  }

  componentWillMount() {
    this.props.onGroupsList();
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

  displayEmailValidationInfo = () => {
    if (this.state.email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
  };

  handleSelectChange = group => this.setState({ group });

  onFormSubmit = event => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      username,
      password,
      confirm_password,
      group,
      email
    } = this.state;

    if (!this.state.email_validation_error)
      if (password === confirm_password) {
        this.props.onUserSubmit({
          first_name,
          last_name,
          username,
          email,
          password,
          groups: [group.id]
        });
        this.clearState();
      } else {
        toast.error("Password Mismatch");
      }
  };

  clearState = () =>
    this.setState({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      group: ""
    });

  _handleKeyPress = event => {
    this.setState({ event });

    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);

    if (
      (event.keyCode === 13 || event.keyCode === 40) &&
      form.elements[index].type !== "submit"
    ) {
      form.elements[index + 1].focus();
      event.preventDefault();
    }

    if (event.keyCode === 38) {
      // const form = event.target.form;
      // const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index - 1].focus();
      // form.elements[index - 1].click();
      event.preventDefault();
    }
  };

  render() {
    const { group } = this.state;
    const value = group && group.id;

    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Add New User</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onFormSubmit}>
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
                    {this.displayEmailValidationInfo()}
                    <ErrorHandling
                      error={
                        this.props.userGroupErrors &&
                        this.props.userGroupErrors.email
                      }
                    />
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
                    <ErrorHandling
                      error={
                        this.props.userGroupErrors &&
                        this.props.userGroupErrors.username
                      }
                    />
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="pass">Password</Label>
                      <Input
                        required
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange.bind(this, "password")}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="pass">Confirm Password</Label>
                      <Input
                        required
                        type="password"
                        value={this.state.confirm_password}
                        onChange={this.onChange.bind(this, "confirm_password")}
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
              </form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { user_reducer } }) => ({
    ...user_reducer
  }),
  { onUserSubmit, onGroupsList, resetUserGroupErrors }
)(AddUser);
