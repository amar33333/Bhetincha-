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
  Form
} from "reactstrap";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import { connect } from "react-redux";

import {
  onBusinessRegisterSubmit,
  onFacebookLoginSubmit
} from "../../../actions";

class Register extends Component {
  state = { business_name: "", mobile_number: "" };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
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

  onFormSubmit = event => {
    event.preventDefault();
    const { business_name, mobile_number } = this.state;

    this.props.onBusinessRegisterSubmit({
      body: {
        business_name,
        business_phone: mobile_number,
        register: true
      },
      history: this.props.history
    });
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register - Business</h1>
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
                        placeholder="Business Name"
                        value={this.state.business_name}
                        onChange={this.onChange.bind(this, "business_name")}
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
                        type="text"
                        placeholder="Mobile Number"
                        value={this.state.mobile_number}
                        onChange={this.onChange.bind(this, "mobile_number")}
                      />
                    </InputGroup>

                    <Button color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
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
                  <span>
                    <a
                      href="#"
                      onClick={() =>
                        this.props.history.push("/individual-register")
                      }
                    >
                      Register as Individual{" "}
                    </a>
                  </span>
                  <div>
                    <FacebookLogin
                      size="small"
                      appId="2110205529228108"
                      autoLoad={true}
                      fields="name,email,picture"
                      onClick={this.componentClicked}
                      callback={this.responseFacebook}
                    />
                    <GoogleLogin
                      clientId="317261253014-8bvqg3ehh145unueb8p67bomeapc9t3n.apps.googleusercontent.com"
                      buttonText="Login With Google"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                    />
                  </div>
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
    onBusinessRegisterSubmit,
    onFacebookLoginSubmit
  }
)(Register);
