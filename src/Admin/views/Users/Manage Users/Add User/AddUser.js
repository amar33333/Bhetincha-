import React, { Component } from "react";
import { connect } from "react-redux";
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

import { onUserSubmit, onGroupsList } from "../../../../actions";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      group: ""
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  componentWillMount() {
    this.props.onGroupsList();
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = group => this.setState({ group });

  onFormSubmit = event => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      username,
      password,
      group,
      email
    } = this.state;

    this.props.onUserSubmit({
      first_name,
      last_name,
      username,
      email,
      password,
      groups: [group.id],
      access_token: this.access_token
    });
    this.clearState();
  };

  clearState = () =>
    this.setState({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      group: ""
    });

  _handleKeyPress = event => {
    this.setState({ event });
    // // console.log('eventasdsa: ', this.state.event);

    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);

    if (
      (event.keyCode === 13 || event.keyCode === 40) &&
      form.elements[index].type !== "submit"
    ) {
      // // console.log('enter & down');

      form.elements[index + 1].focus();
      event.preventDefault();
    }

    if (event.keyCode === 38) {
      // // console.log('up');
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
                        onKeyDown={this._handleKeyPress}
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
                        onKeyDown={this._handleKeyPress}
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
                        onKeyDown={this._handleKeyPress}
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
                        onKeyDown={this._handleKeyPress}
                        onChange={this.onChange.bind(this, "username")}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="pass">Password</Label>
                      <Input
                        required
                        type="password"
                        value={this.state.password}
                        onKeyDown={this._handleKeyPress}
                        onChange={this.onChange.bind(this, "password")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <Button
                      color="primary"
                      onKeyDown={this._handleKeyPress}
                      size="lg"
                    >
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
  ({ AdminContainer: { user_reducer }, auth }) => ({
    ...user_reducer,
    ...auth
  }),
  { onUserSubmit, onGroupsList }
)(AddUser);
