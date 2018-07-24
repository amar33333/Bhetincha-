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

import { ErrorHandling } from "../../utils/Extras";

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
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
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
                    <ErrorHandling error={this.props.registerErrors} />
                    <Row>
                      <Col xs="6">
                        <span>
                          <a href="#" onClick={this.onResendToken}>
                            Resend Code
                          </a>
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Button
                          //loading={this.props.loading}
                          data-size={S}
                          data-style={EXPAND_RIGHT}
                        >
                          VERIFY
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
    onIndividualTokenSend,
    onIndividualResendTokenSubmit
  }
)(Activate);
