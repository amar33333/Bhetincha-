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
  onPhoneVerificationTokenSend,
  onResendTokenRequest
} from "../../../actions";

class MobileVerification extends Component {
  state = { verificationToken: "" };

  componentDidMount() {}

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { verificationToken } = this.state;
    console.log("mobile verif - props: ", this.props);

    const { "?id": id } = querystring.parse(this.props.location.search);

    this.props.onPhoneVerificationTokenSend({
      id,
      verificationToken,
      history: this.props.history
    });
  };

  onResendToken = () => {
    const { "?id": id } = querystring.parse(this.props.location.search);

    this.props.onResendTokenRequest({ id });
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
                  <h1>Mobile Verification</h1>
                  <p className="text-muted">Verify Your Account</p>
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
  { onPhoneVerificationTokenSend, onResendTokenRequest }
)(MobileVerification);
