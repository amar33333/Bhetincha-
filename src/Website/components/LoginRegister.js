import React, { Component } from "react";
// import { Button } from "reactstrap";
import { connect } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";

import CustomModal from "../../Common/components/CustomModal";
import LoginModal from "../../Common/components/CustomModal/ModalTemplates/LoginModal";
import RegisterModal from "../../Common/components/CustomModal/ModalTemplates/RegisterModal";

import { toggleLoginModal, toggleRegisterModal } from "../actions";

const trigger = (
  <span>
    <Button circular icon="user" color="blue" />
  </span>
);

class LoginRegister extends Component {
  state = {
    opened: null
  };

  handleDropdownBlur = () => {
    this.setState({
      opened: false
    });
  };
  render() {
    return (
      <div className="login-register-avatar">
        <Dropdown
          closeOnBlur
          closeOnChange
          onBlur={this.handleDropdownBlur}
          trigger={trigger}
          pointing="top right"
          icon={null}
        >
          <Dropdown.Menu
            open={this.state.opened}
            style={{
              padding: "10px"
            }}
          >
            <p className="mb-0">Already Registerd? </p>
            <p>
              <small> Login Below to continue with Bhetincha </small>
            </p>
            <Button
              fluid
              onClick={this.props.toggleLoginModal}
              variant="raised"
              color="blue"
            >
              Login
            </Button>

            <CustomModal
              // title="Login To Bhetincha"
              isOpen={this.props.loginModal}
              toggle={this.props.toggleLoginModal}
              className={"modal-xs" + this.props.className}
            >
              <LoginModal {...{ history: this.props.history }} />
            </CustomModal>

            <Dropdown.Divider />
            <p className="mb-0">Not Registerd yet? </p>
            <p>
              <small> Create your Account Now!</small>
            </p>
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
              color="green"
              fluid
            >
              Register
            </Button>
          </Dropdown.Menu>
        </Dropdown>
        {/* <Button circular icon="user" color="blue" /> */}
        {/* <Button
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
        </Button> */}
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
