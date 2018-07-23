import React, { Component } from "react";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import { toast } from "react-toastify";
import { Alert } from "reactstrap";

import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Card,
  CardBody,
  Container
} from "reactstrap";

import querystring from "querystring";

import { connect } from "react-redux";
import {
  onPhoneVerificationTokenSend,
  onResendTokenRequest,
  onCheckRegistrationList,
  onUserRegisterSubmit
} from "../../../actions";

import { validateEmail } from "../../../Common/utils/Extras";

class MobileVerification extends Component {
  state = {
    verificationToken: "",
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    email_validation_error: false,
    visible: true
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    const { id } = querystring.parse(this.props.location.search.slice(1));

    this.props.onCheckRegistrationList({ id });
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = querystring.parse(this.props.location.search.slice(1));

    if (
      this.props.checkRegistrationData &&
      this.props.checkRegistrationData.status === 404
    )
      this.props.history.push("/404");
    // else if (this.props.checkRegistrationData === "token_verified") {
    //   this.props.history.push({
    //     pathname: "/user-register",
    //     search: `?${querystring.stringify({ id })}`
    //   });
    // }
  }

  displayEmailValidationInfo = () => {
    if (this.state.email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
  };

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "email") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (this.state.email && !validateEmail(this.state.email)) {
          this.setState({ email_validation_error: true });
        } else this.setState({ email_validation_error: false });
      });
    } else {
      this.setState({ [key]: val });
    }
  };

  onFormSubmit = event => {
    event.preventDefault();
    const {
      verificationToken: token,
      username,
      password,
      confirm_password,
      email,
      email_validation_error
    } = this.state;

    const { id } = querystring.parse(this.props.location.search.slice(1));

    if (!email_validation_error)
      if (password === confirm_password)
        this.props.onUserRegisterSubmit({
          id,
          body: {
            username,
            password,
            email,
            token
          },
          history: this.props.history,
          slug: this.props.phone_verification_response
            ? this.props.phone_verification_response.slug
            : null
        });
      else {
        toast.error("Password Mismatch !!!");
      }
  };

  onResendToken = () => {
    const { id } = querystring.parse(this.props.location.search.slice(1));

    this.props.onResendTokenRequest({ id });
  };

  displayBusinessAlreadyExistsError = () => {
    if (this.props.location.state && this.props.location.state.already)
      return (
        <Alert
          color="warning"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          <p>
            This mobile number:{" "}
            <span style={{ color: "blue" }}>
              {this.props.location.state.business_phone}{" "}
            </span>
            already exists in Business Name:{" "}
            <span style={{ color: "red" }}>
              {this.props.location.state.business_name}
            </span>
            <p>A Link has also has been Sent to the above mobile number.</p>
          </p>
        </Alert>
      );
  };

  render() {
    console.log("mobile props: ", this.props);
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  {this.displayBusinessAlreadyExistsError()}
                  <h1>Register Your Account</h1>
                  {/* <p className="text-muted">Verify Your Account</p> */}
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
                        //disabled={this.props.loading}
                        type="text"
                        placeholder="Enter the verification code"
                        value={this.state.verificationToken}
                        onChange={this.onChange.bind(this, "verificationToken")}
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
                    {this.displayEmailValidationInfo()}

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
                    <Row>
                      <Col xs="6">
                        <span>
                          <a href="#" onClick={this.onResendToken}>
                            Resend Code
                          </a>
                        </span>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col xs="6">
                        <Button
                          color="primary"
                          //loading={this.props.loading}
                          data-size={S}
                          data-style={EXPAND_RIGHT}
                        >
                          Create Account
                        </Button>
                      </Col>
                    </Row>
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
  return { ...auth };
};

export default connect(
  mapStateToProps,
  {
    onPhoneVerificationTokenSend,
    onResendTokenRequest,
    onCheckRegistrationList,
    onUserRegisterSubmit
  }
)(MobileVerification);
