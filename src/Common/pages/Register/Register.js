import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Form
} from "reactstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { validatePhone, ErrorHandling } from "../../utils/Extras";

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
              <Col xs="10" md="6" className="central-dialog-wrapper">
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
                      size="lg"
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
                      size="lg"
                      required
                      type="text"
                      placeholder="Mobile no. Eg. 9843041699, (984)-3041699"
                      value={this.state.mobile_number}
                      onChange={this.onChange.bind(this, "mobile_number")}
                    />
                  </InputGroup>
                  {this.displayPhoneValidationInfo()}

                  <Button color="success" block>
                    Create Account
                  </Button>
                </Form>

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
                <Row className="pt-2">
                  <Col>
                    <Button
                      color="link"
                      onClick={() =>
                        this.props.history.push("/individual-register")
                      }
                    >
                      Register as Individual
                    </Button>
                  </Col>
                </Row>
                <ErrorHandling
                  error={
                    this.props.registerErrors &&
                    this.props.registerErrors.abusiness_phone
                  }
                />
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
