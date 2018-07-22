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
  Card,
  CardBody,
  Container
} from "reactstrap";

import { connect } from "react-redux";
import { onForgotPasswordTokenSubmit } from "../../../actions";

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
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Forgot Password - Enter Token</h1>
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
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone" />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        required
                        //disabled={this.props.loading}
                        type="text"
                        placeholder="Enter Token"
                        value={this.state.token}
                        onChange={this.onChange.bind(this, "token")}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone" />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        required
                        //disabled={this.props.loading}
                        type="text"
                        placeholder="New Password"
                        value={this.state.password}
                        onChange={this.onChange.bind(this, "password")}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone" />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        required
                        //disabled={this.props.loading}
                        type="text"
                        placeholder="Confirm New Password"
                        value={this.state.confirm_password}
                        onChange={this.onChange.bind(this, "confirm_password")}
                      />
                    </InputGroup>

                    <Row>
                      <Col xs="6">
                        <Button
                          //loading={this.props.loading}
                          data-size={S}
                          data-style={EXPAND_RIGHT}
                        >
                          RESET PASSWORD
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
    onForgotPasswordTokenSubmit
  }
)(ForgotPasswordToken);
