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
  Form
} from "reactstrap";

import { validatePhone } from "../../../../Common/utils/Extras";

class PhoneVerificationModal extends Component {
  state = {
    phone: "",
    phone_validation_error: false
  };

  componentWillUnmount() {
    // this.props.onResetPhoneVerificationRequestError();
  }

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "phone") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (this.state.phone && !validatePhone(this.state.phone)) {
          this.setState({ phone_validation_error: true });
        } else this.setState({ phone_validation_error: false });
      });
    } else {
      this.setState({ [key]: val });
    }
  };

  displayPhoneValidationInfo = () => {
    if (this.state.phone)
      if (this.state.phone_validation_error)
        return <p style={{ color: "red" }}>Invalid Phone Number</p>;
      else return <p style={{ color: "green" }}>Phone Number Valid</p>;
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { phone, phone_validation_error } = this.state;

    if (!phone_validation_error)
      this.props.onPhoneVerificationRequest({
        data: this.props.search_selected_business,
        id: this.props.search_selected_business.id,
        phone,
        history: this.props.history
      });
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <div>
          <p>
            Please enter your valid mobile number. You will soon recieve a
            verfification code.
          </p>
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
              placeholder="Mobile Number"
              value={this.state.phone}
              onChange={this.onChange.bind(this, "phone")}
            />
          </InputGroup>
          {this.displayPhoneValidationInfo()}
          <p className="text-danger text-center">
            {this.props.phone_verification_request_error &&
              this.props.phone_verification_request_error.message}
          </p>
          <Row>
            <Col xs="6">
              <LaddaButton
                //loading={this.props.loading}
                data-size={S}
                data-style={EXPAND_RIGHT}
              >
                Claim
              </LaddaButton>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default PhoneVerificationModal;
