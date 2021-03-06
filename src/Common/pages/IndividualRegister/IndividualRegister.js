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
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { toast } from "react-toastify";

import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import background from "../../../static/img/balloon.JPG";

import {
  validatePhone,
  validateEmail,
  ErrorHandling
} from "../../../Common/utils/Extras";

import {
  onIndividualRegisterSubmit,
  onFacebookLoginSubmit,
  resetErrors
} from "../../../actions";

class IndividualRegister extends Component {
  state = {
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "Male",
    date_of_birth: "",
    checked: false,
    phone_validation_error: false,
    email_validation_error: false
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "phone_number") {
      this.setState({ [key]: val }, () => {
        if (
          this.state.phone_number &&
          !validatePhone(this.state.phone_number)
        ) {
          this.setState({ phone_validation_error: true });
        } else this.setState({ phone_validation_error: false });
      });
    } else if (key === "email") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (this.state.email && !validateEmail(this.state.email)) {
          this.setState({ email_validation_error: true });
        } else this.setState({ email_validation_error: false });
      });
    } else {
      this.setState({ [key]: val });
    }
  };

  responseFacebook = response => {
    console.log("facebook response: ", response);
    this.props.onFacebookLoginSubmit({ access_token: response.accessToken });
  };

  responseGoogle = response => {
    console.log("google response: ", response);
  };

  componentClicked = () => {
    console.log("facebook componenet cliked");
  };

  displayPhoneValidationInfo = () => {
    if (this.state.phone_number)
      if (this.state.phone_validation_error)
        return <p style={{ color: "red" }}>Invalid Phone Number</p>;
      else return <p style={{ color: "green" }}>Phone Number Valid</p>;
  };

  displayEmailValidationInfo = () => {
    if (this.state.email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
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
      gender,
      date_of_birth,
      phone_validation_error,
      email_validation_error,
      checked
    } = this.state;

    if (!phone_validation_error && !email_validation_error)
      if (password === confirm_password) {
        if (checked) {
          this.props.onIndividualRegisterSubmit({
            body: {
              username,
              password,
              email,
              first_name,
              gender,
              date_of_birth: moment(date_of_birth).format("YYYY-MM-DDTHH:mmZ"),
              last_name,
              phone_number
            },
            history: this.props.history
          });
        } else toast.error("You have to agree to our User Agreement Policy");
      } else {
        toast.error("Password Mismatch");
      }
  };

  render() {
    console.log(this.props);
    return (
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `url(${background})`
        }}
      >
        <div
          className="pt-3"
          style={{
            position: "absolute",
            top: "10px",
            left: "20px",
            color: "#e6e0d5"
          }}
        >
          <Container>
            <Link
              to="/"
              style={{
                color: "inherit"
              }}
            >
              <i className="fa fa-angle-left" />
              <span className="ml-2"> Back to home </span>
            </Link>
          </Container>
        </div>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col xs="10" md="5" className="central-dialog-wrapper">
                <h1>Individual Register</h1>
                <p className="text-muted">Create your account</p>
                <Form onSubmit={this.onFormSubmit}>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      autoCapitalize
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
                      autoCapitalize
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
                      placeholder="Mobile Number Eg. 9843041699, (984)-3041699"
                      value={this.state.phone_number}
                      onChange={this.onChange.bind(this, "phone_number")}
                    />
                  </InputGroup>
                  {this.displayPhoneValidationInfo()}
                  <ErrorHandling
                    error={
                      this.props.registerErrors &&
                      this.props.registerErrors.aphone_number
                    }
                  />
                  <FormGroup>
                    <Label for="gender">Gender </Label>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        className="radio"
                        value="Male"
                        onChange={this.onChange.bind(this, "gender")}
                        checked={this.state.gender === "Male"}
                      />{" "}
                      Male
                      <input
                        type="radio"
                        className="radio"
                        name="gender"
                        value="Female"
                        onChange={this.onChange.bind(this, "gender")}
                        checked={this.state.gender === "Female"}
                      />{" "}
                      Female
                      <input
                        type="radio"
                        className="radio"
                        name="gender"
                        value="Other"
                        onChange={this.onChange.bind(this, "gender")}
                        checked={this.state.gender === "Other"}
                      />{" "}
                      Other
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>Date of Birth</Label>
                    <Datetime
                      //disabled={this.props.loading}
                      value={this.state.date_of_birth}
                      onChange={time => {
                        this.setState({
                          date_of_birth: moment(time)
                        });
                      }}
                      timeFormat={false}
                      // utc={true}
                      disableOnClickOutside={false}
                    />
                  </FormGroup>

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
                  <ErrorHandling
                    error={
                      this.props.registerErrors &&
                      this.props.registerErrors.username
                    }
                  />
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
                  <ErrorHandling
                    error={
                      this.props.registerErrors &&
                      this.props.registerErrors.email
                    }
                  />
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

                  <Button color="success" block className="mt-2">
                    Create Account
                  </Button>
                </Form>

                <div className="p-4">
                  <Button
                    color="link"
                    onClick={() =>
                      this.props.history.push("/business-register")
                    }
                  >
                    Register as Business
                  </Button>
                  {/* <Row>
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
                    </Row> */}
                  {/* <div>
                      <FacebookLogin
                        size="small"
                        appId="2110205529228108"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                      />
                      <GoogleLogin
                        autoLoad={false}
                        clientId="317261253014-8bvqg3ehh145unueb8p67bomeapc9t3n.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                      />
                    </div> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
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
    onIndividualRegisterSubmit,
    onFacebookLoginSubmit,
    resetErrors
  }
)(IndividualRegister);
