import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input as InputR,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardGroup,
  CardBody
} from "reactstrap";

class CustomModal extends Component {
  render() {
    // const ModalBodyy = this.props.;

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.toggleModal}>
          Login To Bhetincha
        </ModalHeader>
        <ModalBody>{this.props.children}</ModalBody>
        {/* <ModalBody>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-user" />
              </InputGroupText>
            </InputGroupAddon>
            <InputR
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onUsernameChange}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock" />
              </InputGroupText>
            </InputGroupAddon>
            <InputR
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              placeholder="Password"
            />
          </InputGroup>
          <Row>
            <Col xs="6">
              <Button
                color="primary"
                className="px-4"
                onClick={() => this.onLoginBtnClick()}
              >
                Login
              </Button>
            </Col>
            <Col xs="6" className="text-right">
              <Button
                color="link"
                className="px-0"
                onClick={() => this.onForgotPassBtnClick()}
              >
                Forgot password?
              </Button>
            </Col>
          </Row>
        </ModalBody> */}
      </Modal>
    );
  }
}

export default CustomModal;
