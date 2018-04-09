import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form
} from "reactstrap";

class Sections extends Component {
  state = { industry: "" };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
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
            placeholder="Industry"
            value={this.state.industry}
            onChange={this.onChange.bind(this, "industry")}
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

export default Sections;
