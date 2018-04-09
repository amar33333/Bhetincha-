import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input as InputR,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardGroup,
  CardBody,
  Form
} from "reactstrap";

import { connect } from "react-redux";
import { onSubmit } from "../../../../actions";

class LoginModal extends Component {
  state = { username: "", password: "" };

  onForgotPassBtnClick = () => {
    console.log("Forgot Password Clicked");
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit({ username, password });
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
          <InputR
            autoFocus
            required
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onChange.bind(this, "username")}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock" />
            </InputGroupText>
          </InputGroupAddon>
          <InputR
            required
            type="password"
            value={this.state.password}
            onChange={this.onChange.bind(this, "password")}
            placeholder="Password"
          />
        </InputGroup>
        <Row>
          <Col xs="6">
            <Button
              color="primary"
              className="px-4"
              //onClick={() => this.onLoginBtnClick()}
            >
              Login
            </Button>
          </Col>
          <Col xs="6" className="text-right">
            <Button
              color="link"
              className="px-0"
              onClick={() => this.onForgotPassBtnClick()}
            >
              Forgot password?
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(null, { onSubmit })(LoginModal);
