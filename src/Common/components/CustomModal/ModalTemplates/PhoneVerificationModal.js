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

class PhoneVerificationModal extends Component {
  state = { phone: "" };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { phone } = this.state;

    this.props.onPhoneVerificationRequest({
      id: this.props.search_selected_business_id.id,
      phone,
      history: this.props.history
    });
  };

  render() {
    console.log("phonde model: ", this.props);
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
