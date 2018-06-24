import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  Label
} from "reactstrap";

import { toast } from "react-toastify";

import { connect } from "react-redux";

import {
  onBusinessRegisterSubmit,
  togglePhoneVerificationModal
} from "../../../../actions";
import CustomModal from "../CustomModal";
import PhoneVerificationModal from "./PhoneVerificationModal";

class BusinessRegisterModal_1 extends Component {
  state = {
    business_name: "",
    mobile_number: "",
    checked: false
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  //Change this.....
  onFormSubmit = event => {
    event.preventDefault();
    const { business_name, mobile_number, checked } = this.state;

    this.props.onBusinessRegisterSubmit({
      business_name,
      mobile_number
    });
  };

  render() {
    return (
      <div>
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
          {/* <FormGroup check>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  id="checkbox2"
                  onChange={event =>
                    this.setState({ checked: event.target.checked }, () =>
                      console.log("state: ", this.state)
                    )
                  }
                />{" "}
                I agree to{" "}
                <a
                  href="http://techkunja.com.np"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  User Agreement
                </a>{" "}
                and{" "}
                <a
                  href="http://techkunja.com.np"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy
                </a>{" "}
                of Bhetincha.
              </Label>
            </FormGroup>
          </Col>
        </FormGroup> */}

          <Button
            className="register-button"
            color="primary"
            block
            //onClick={() => this.onRegisterBtnClick()}
          >
            Register Business
          </Button>

          {/* <Divider horizontal>Or</Divider> */}
          <Row className="modal_register__social__icons">
            <button className="btn btn-facebook btn-md">
              <span>facebook</span>
            </button>

            <button className="btn btn-google-plus btn-md">
              <span>Google</span>
            </button>
          </Row>
        </Form>
        {/* <PhoneVerificationModal {...this.props} /> */}
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
    togglePhoneVerificationModal
  }
)(BusinessRegisterModal_1);
