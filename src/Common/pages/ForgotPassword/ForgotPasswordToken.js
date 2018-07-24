import React, { Component } from "react";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Container
} from "reactstrap";

import { connect } from "react-redux";
import { onForgotPasswordTokenSubmit } from "../../../actions";
import background from "../../../static/img/forget.jpeg";
class ForgotPasswordToken extends Component {
  state = {
    username_mobile: "",
    token: "",
    password: "",
    confirm_password: ""
  };

  componentDidMount() {
    console.log("dsdfsf: ", this.props);
    this.setState({
      username_mobile: this.props.location.state
        ? this.props.location.state.phone_number
        : ""
    });
  }

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const {
      username_mobile: phone_number,
      token,
      password,
      confirm_password
    } = this.state;

    if (password === confirm_password)
      this.props.onForgotPasswordTokenSubmit({
        body: {
          phone_number,
          token,
          password
        },
        history: this.props.history
      });
    else toast.error("Password Mismatch !!!");
  };

  render() {
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
            <a
              href="/"
              style={{
                color: "inherit"
              }}
            >
              <i className="fa fa-angle-left" />
              <span className="ml-2"> Back to home </span>
            </a>
          </Container>
        </div>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6" className="central-dialog-wrapper">
                <h2>Forgot Password</h2>
                <p>
                  If you have already recived password reset token, please enter
                  below.
                </p>
                <Form onSubmit={this.onFormSubmit}>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-phone" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      autoFocus
                      required
                      type="text"
                      placeholder="Enter Your Username or Mobile Number"
                      value={this.state.username_mobile}
                      onChange={this.onChange.bind(this, "username_mobile")}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-key" />
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      required
                      type="text"
                      placeholder="Enter Token"
                      value={this.state.token}
                      onChange={this.onChange.bind(this, "token")}
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
                      placeholder="New Password"
                      value={this.state.password}
                      onChange={this.onChange.bind(this, "password")}
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
                      placeholder="Confirm New Password"
                      value={this.state.confirm_password}
                      onChange={this.onChange.bind(this, "confirm_password")}
                    />
                  </InputGroup>

                  <Row>
                    <Col xs="6">
                      <Button
                        color="primary"
                        size="lg"
                        data-size={S}
                        data-style={EXPAND_RIGHT}
                      >
                        Reset Password
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
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
    onForgotPasswordTokenSubmit
  }
)(ForgotPasswordToken);
