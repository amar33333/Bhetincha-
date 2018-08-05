import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class CustomModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.toggleModal}>
          {this.props.title}
        </ModalHeader>
        <ModalBody>{this.props.children}</ModalBody>
      </Modal>
    );
  }
}

export default CustomModal;
