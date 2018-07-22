import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";

import CustomModal from "../../Common/components/CustomModal";
import LoginModal from "../../Common/components/CustomModal/ModalTemplates/LoginModal";
import RegisterModal from "../../Common/components/CustomModal/ModalTemplates/RegisterModal";

import { toggleLoginModal, toggleRegisterModal } from "../actions";

class LoginRegister extends Component {
  render() {
    return (
      <div>
        <Button
          outline
          className="login-btn"
          onClick={this.props.toggleLoginModal}
          variant="raised"
          color="primary"
        >
          Login
        </Button>

        <CustomModal
          title="Login To Bhetincha"
          isOpen={this.props.loginModal}
          toggle={this.props.toggleLoginModal}
          className={"modal-xs" + this.props.className}
        >
          <LoginModal {...{ history: this.props.history }} />
        </CustomModal>

        <CustomModal
          title="Register In Bhetincha"
          isOpen={this.props.registerModal}
          toggle={this.props.toggleRegisterModal}
          className={"register_modal " + this.props.className}
        >
          <RegisterModal {...{ history: this.props.history }} />
        </CustomModal>

        <Button
          //onClick={this.props.toggleRegisterModal}
          onClick={() => this.props.history.push("/business-register")}
          variant="raised"
          color="success"
        >
          Register
        </Button>
      </div>
    );
  }
}

export default connect(
  ({ home }) => ({
    ...home
  }),
  {
    toggleLoginModal,
    toggleRegisterModal
  }
)(LoginRegister);
