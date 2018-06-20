import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Form
} from "reactstrap";

import { connect } from "react-redux";

import { onUserRegisterSubmit } from "../../../actions";

class UserRegister extends Component {
  state = { username: "", password: "", confirm_password: "", email: "" };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { username, password, confirm_password, email } = this.state;

    this.props.onUserRegisterSubmit({
      body: {
        username,
        password,
        email,
        busines_email: email
      }
    });
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>User Register</h1>
                  <p className="text-muted">Create your account</p>
                  <Form onSubmit={this.onFormSubmit}>
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
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
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
                      <Input
                        required
                        //disabled={loading}
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange.bind(this, "password")}
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
                        //disabled={loading}
                        type="password"
                        placeholder="Confirm Password"
                        value={this.state.confirm_password}
                        onChange={this.onChange.bind(this, "confirm_password")}
                      />
                    </InputGroup>

                    <Button color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    ...auth
  };
};

export default connect(
  mapStateToProps,
  {
    onUserRegisterSubmit
  }
)(UserRegister);
