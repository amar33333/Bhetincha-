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

import { connect } from "react-redux";
import { onForgotPasswordSubmit } from "../../../actions";

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
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Forgot Password</h1>
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
                        placeholder="Enter Your Username or Mobile Number"
                        value={this.state.username_mobile}
                        onChange={this.onChange.bind(this, "username_mobile")}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <span>
                          <a href="#" onClick={this.onAlreadyHaveACode}>
                            Already Have a Code
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
                          REQUEST TOKEN
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
    onForgotPasswordSubmit
  }
)(ForgotPassword);
