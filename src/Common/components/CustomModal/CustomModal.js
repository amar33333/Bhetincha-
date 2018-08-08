import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class CustomModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
        size={this.props.size}
      >
        {this.props.title ? (
          <ModalHeader toggle={this.props.toggle}>
            {this.props.title}
          </ModalHeader>
        ) : null}

        <ModalBody>{this.props.children}</ModalBody>
      </Modal>
    );
  }
}

export default CustomModal;
