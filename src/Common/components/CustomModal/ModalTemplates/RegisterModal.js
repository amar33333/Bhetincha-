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

import BusinessRegisterModal from "./BusinessRegisterModal";
import IndividualRegisterModal from "./IndividualRegisterModal";

class RegisterModal extends Component {
  state = {
    businessRegisterModal: true
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onToggleVisible = () => {
    console.log("toggle  clicked");
    this.setState({ businessRegisterModal: !this.state.businessRegisterModal });
  };

  renderModal = () => {
    return this.state.businessRegisterModal ? (
      <div>
        <BusinessRegisterModal />
        <span>
          <a href="#" onClick={this.onToggleVisible}>
            Register as Individual{" "}
          </a>
        </span>
      </div>
    ) : (
      <div>
        <IndividualRegisterModal />
        <span>
          <a href="#" onClick={this.onToggleVisible}>
            Register as Business{" "}
          </a>
        </span>
      </div>
    );
  };

  render() {
    return this.renderModal();
  }
}

export default RegisterModal;
