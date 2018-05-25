import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup
} from "reactstrap";

class PaymentMethodEditModal extends Component {
  state = { payment_method: "" };

  componentDidMount() {
    this.setState({
      payment_method: this.props.data ? this.props.data : ""
    });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.payment_method,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { payment_method } = this.state;
    this.props.onPaymentMethodEdit({ payment_method });
  };

  render() {
    console.log("payment_method edit state: ", this.state);
    return (
      <Form onSubmit={this.onFormEdit} inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-payment_method" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              autoFocus
              required
              disabled={this.props.loading}
              type="text"
              placeholder="Type payment_method Name"
              value={
                this.state.payment_method ? this.state.payment_method.name : ""
              }
              onChange={this.onChange.bind(this, "payment_method")}
            />
          </InputGroup>
        </FormGroup>
        <Button color="primary">
          <span className="fa fa-plus" /> EDIT
        </Button>
      </Form>
    );
  }
}

export default PaymentMethodEditModal;
