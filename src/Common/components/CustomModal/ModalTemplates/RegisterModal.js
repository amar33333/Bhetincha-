import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  Label
} from "reactstrap";

import { connect } from "react-redux";

import { onRegisterSubmit } from "../../../../actions";

class RegisterModal extends Component {
  state = { username: "", password: "", email: "", business_name: "" };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  //Change this.....
  onFormSubmit = event => {
    event.preventDefault();
    const {
      username,
      password,
      confirm_password,
      email,
      business_name
    } = this.state;

    if (password === confirm_password) {
      this.props.onRegisterSubmit({ username, password, email, business_name });
    } else {
      console.log("password mismatch");
    }
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            autoFocus
            required
            type="text"
            placeholder="Business Name"
            value={this.state.business_name}
            onChange={this.onChange.bind(this, "business_name")}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            required
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onChange.bind(this, "username")}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <Input
            required
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onChange.bind(this, "email")}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            required
            type="password"
            value={this.state.password}
            onChange={this.onChange.bind(this, "password")}
            placeholder="Password"
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            required
            value={this.state.confirm_password}
            type="password"
            placeholder="Repeat password"
            onChange={this.onChange.bind(this, "confirm_password")}
          />
        </InputGroup>
        <FormGroup check>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="checkbox2" /> I agree to{" "}
                <a
                  href="http://techkunja.com.np"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  User Agreement
                </a>{" "}
                and{" "}
                <a
                  href="http://techkunja.com.np"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy
                </a>{" "}
                of Bhetincha.
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>

        <Button
          color="success"
          block
          //onClick={() => this.onRegisterBtnClick()}
        >
          Create Account
        </Button>

        {/* <Divider horizontal>Or</Divider> */}
        <Row className="modal_register__social__icons">
          <button className="btn btn-facebook btn-md">
            <span>facebook</span>
          </button>

          <button className="btn btn-google-plus btn-md">
            <span>Google</span>
          </button>
        </Row>
      </Form>
    );
  }
}

export default connect(null, onRegisterSubmit)(RegisterModal);
