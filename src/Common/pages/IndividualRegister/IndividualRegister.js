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
  Form,
  FormGroup,
  Label
} from "reactstrap";

import { connect } from "react-redux";

import { toast } from "react-toastify";

import { onIndividualRegisterSubmit } from "../../../actions";

class IndividualRegister extends Component {
  state = {
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    checked: false
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const {
      username,
      password,
      confirm_password,
      email,
      first_name,
      last_name,
      phone_number,
      checked
    } = this.state;

    if (password === confirm_password) {
      if (checked) {
        this.props.onIndividualRegisterSubmit({
          username,
          password,
          email,
          first_name,
          last_name,
          phone_number
        });
      } else toast.error("You have to agree to our User Agreement Policy");
    } else {
      toast.error("Password Mismatch");
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>IndividualRegister - Business</h1>
                  <p className="text-muted">Create your account</p>
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
                        placeholder="First Name"
                        value={this.state.first_name}
                        onChange={this.onChange.bind(this, "first_name")}
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
                        placeholder="Last Name"
                        value={this.state.last_name}
                        onChange={this.onChange.bind(this, "last_name")}
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
                        placeholder="Phone Number"
                        value={this.state.phone_number}
                        onChange={this.onChange.bind(this, "phone_number")}
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
                            <Input
                              type="checkbox"
                              id="checkbox2"
                              onChange={event =>
                                this.setState(
                                  { checked: event.target.checked },
                                  () => console.log("state: ", this.state)
                                )
                              }
                            />{" "}
                            I agree to{" "}
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

                    <Button color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                <span>
                  <a
                    href="#"
                    onClick={() =>
                      this.props.history.push("/business-register")
                    }
                  >
                    Register as Business{" "}
                  </a>
                </span>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
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
    onIndividualRegisterSubmit
  }
)(IndividualRegister);
