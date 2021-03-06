import React, { Component } from "react";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
import { Button, Col, Row, Input, Form, Container } from "reactstrap";

import { connect } from "react-redux";
import { onForgotPasswordSubmit } from "../../../actions";
import background from "../../../static/img/forget.jpeg";
import { Link } from "react-router-dom";
class ForgotPassword extends Component {
  state = { username_mobile: "" };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { username_mobile: phone_number } = this.state;

    this.props.onForgotPasswordSubmit({
      body: {
        phone_number
      },
      history: this.props.history
    });
  };

  onAlreadyHaveACode = () => {
    this.props.history.push("/forgot-password-token");
  };

  render() {
    console.log("mobile props: ", this.props);
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
              <Col md="6" className="central-dialog-wrapper">
                <h2>Forgot your Password?</h2>
                <p>
                  Don't Worry. Resetting Password is easy, just tell us the
                  mobile number or Username you registered with Bhetinchha.
                </p>
                <Form onSubmit={this.onFormSubmit}>
                  <Input
                    autoFocus
                    required
                    size="lg"
                    //disabled={this.props.loading}
                    type="text"
                    placeholder="Enter Your Username or Mobile Number"
                    value={this.state.username_mobile}
                    onChange={this.onChange.bind(this, "username_mobile")}
                  />
                  <Row className="mt-3">
                    <Col xs="6">
                      <span>
                        <a href="#" onClick={this.onAlreadyHaveACode}>
                          Already Have a Code
                        </a>
                      </span>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col xs="6">
                      <Button
                        block
                        size="lg"
                        color="primary"
                        //loading={this.props.loading}
                        data-size={S}
                        data-style={EXPAND_RIGHT}
                      >
                        Submit
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
    onForgotPasswordSubmit
  }
)(ForgotPassword);
