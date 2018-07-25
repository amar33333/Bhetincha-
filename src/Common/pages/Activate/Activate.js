import React, { Component } from "react";
import LaddaButton, { S, EXPAND_RIGHT } from "react-ladda";
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
  onIndividualTokenSend,
  onIndividualResendTokenSubmit
} from "../../../actions";

import background from "../../../static/img/balloon.JPG";

class Activate extends Component {
  state = { mobile_number: "", verificationToken: "" };

  componentDidMount() {
    console.log("asdasdasdadddsad: ", this.props);
    this.setState({
      mobile_number: this.props.location.state
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
      verificationToken: token,
      mobile_number: phone_number
    } = this.state;

    this.props.onIndividualTokenSend({
      body: {
        phone_number,
        token
      },
      history: this.props.history
    });
  };

  onResendToken = () => {
    this.props.onIndividualResendTokenSubmit({
      body: {
        phone_number: this.state.mobile_number
      }
    });
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
        <div className="app flex-row align-items-center">
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
          <Container>
            <Row className="justify-content-center">
              <Col md="4" className="central-dialog-wrapper">
                <h1>Activate Your Account</h1>
                {/* <p className="text-muted">Verify Your Account</p> */}
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
                      //disabled={this.props.loading}
                      type="text"
                      placeholder="Your Mobile Number"
                      value={this.state.mobile_number}
                      onChange={this.onChange.bind(this, "mobile_number")}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      //autoFocus
                      required
                      //disabled={this.props.loading}
                      type="text"
                      placeholder="Enter the verification code"
                      value={this.state.verificationToken}
                      onChange={this.onChange.bind(this, "verificationToken")}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="6">
                      <Button color="link" onClick={this.onResendToken}>
                        Resend Code
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col xs="12">
                      <Button
                        color="primary"
                        block
                        //loading={this.props.loading}
                        data-size={S}
                        data-style={EXPAND_RIGHT}
                      >
                        Verify
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
    onIndividualTokenSend,
    onIndividualResendTokenSubmit
  }
)(Activate);
