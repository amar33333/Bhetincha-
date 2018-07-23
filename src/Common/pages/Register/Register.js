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

import { connect } from "react-redux";
import { validatePhone } from "../../utils/Extras";

import { onBusinessRegisterSubmit } from "../../../actions";

import background from "../../../static/img/city_new.jpg";

class Register extends Component {
  state = {
    business_name: "",
    mobile_number: "",
    phone_validation_error: false
  };

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "business_name") {
      let newBusinessName = val.replace(/\b\w/g, l => l.toUpperCase());
      this.setState({
        [key]: newBusinessName
      });
    } else if (key === "mobile_number") {
      this.setState({ [key]: val }, () => {
        if (
          this.state.mobile_number &&
          !validatePhone(this.state.mobile_number)
        ) {
          this.setState({ phone_validation_error: true });
        } else this.setState({ phone_validation_error: false });
      });
    } else {
      this.setState({
        [key]: val
      });
    }
  };

  displayPhoneValidationInfo = () => {
    if (this.state.mobile_number)
      if (this.state.phone_validation_error)
        return <p style={{ color: "red" }}>Invalid Phone Number</p>;
      else return <p style={{ color: "green" }}>Phone Number Valid</p>;
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { business_name, mobile_number, phone_validation_error } = this.state;

    if (!phone_validation_error)
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
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Register - Business</h1>
                    {/* <p className="text-muted">Create your account</p> */}
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
                          placeholder="Mobile Number Eg. 9843041699, (984)-3041699"
                          value={this.state.mobile_number}
                          onChange={this.onChange.bind(this, "mobile_number")}
                        />
                      </InputGroup>
                      {this.displayPhoneValidationInfo()}

                      <Button color="success" block>
                        Create Account
                      </Button>
                    </Form>
                  </CardBody>
                  <CardFooter className="p-4">
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
                  </CardFooter>
                </Card>
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
    onBusinessRegisterSubmit
  }
)(Register);
