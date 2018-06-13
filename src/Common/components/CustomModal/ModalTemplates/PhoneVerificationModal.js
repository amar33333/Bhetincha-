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

import { connect } from "react-redux";
import {
  onPhoneVerificationRequest,
  onPhoneVerificationTokenSend
} from "../../../../actions";

class PhoneVerificationModal extends Component {
  state = { phone: "", verificationToken: "" };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  renderFormField = () => {
    return !this.props.phone_verification_request ? (
      <Input
        autoFocus
        required
        //disabled={this.props.loading}
        type="text"
        placeholder="Mobile Number"
        value={this.state.phone}
        onChange={this.onChange.bind(this, "phone")}
      />
    ) : (
      <Input
        autoFocus
        required
        //disabled={this.props.loading}
        type="text"
        placeholder="Enter the verification code"
        value={this.state.verificationToken}
        onChange={this.onChange.bind(this, "verificationToken")}
      />
    );

    // return (
    //   <Input
    //     autoFocus
    //     required
    //     //disabled={this.props.loading}
    //     type="text"
    //     placeholder="Mobile Number"
    //     value={this.state.phone}
    //     onChange={this.onChange.bind(this, "phone")}
    //   />
    // );
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { phone, verificationToken } = this.state;
    console.log("props: ", this.props);
    if (!this.props.phone_verification_request)
      this.props.onPhoneVerificationRequest({
        id: "5b1d12b6c1ddbb3e3d05bf88",
        phone
      });
    else {
      this.props.onPhoneVerificationTokenSend({
        id: "5b1d12b6c1ddbb3e3d05bf88",
        verificationToken
      });
    }
  };

  render() {
    console.log("phonde model: ", this.props);
    return (
      <Form onSubmit={this.onFormSubmit}>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user" />
            </InputGroupText>
          </InputGroupAddon>
          {this.renderFormField()}
        </InputGroup>
        <Row>
          <Col xs="6">
            <LaddaButton
              //loading={this.props.loading}
              data-size={S}
              data-style={EXPAND_RIGHT}
            >
              Verify
            </LaddaButton>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { ...auth };
};

export default connect(
  mapStateToProps,
  { onPhoneVerificationRequest, onPhoneVerificationTokenSend }
)(PhoneVerificationModal);
