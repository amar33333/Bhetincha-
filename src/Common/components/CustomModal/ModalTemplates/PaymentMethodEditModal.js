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
import { ErrorHandling } from "../../../utils/Extras";

class PaymentMethodEditModal extends Component {
  state = { payment_method: "" };

  componentDidMount() {
    this.setState({
      payment_method: this.props.data ? this.props.data : ""
    });
  }

  componentWillUnmount = () => {
    this.props.resetPaymentCompanyErrors();
  };

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.payment_method,
        name: event.target.value.toUpperCase()
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { payment_method } = this.state;
    this.props.onPaymentMethodEdit({ payment_method });
  };

  render() {
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
              //disabled={this.props.loading}
              type="text"
              placeholder="Type payment_method Name"
              value={
                this.state.payment_method ? this.state.payment_method.name : ""
              }
              onChange={this.onChange.bind(this, "payment_method")}
            />
          </InputGroup>
        </FormGroup>
        <ErrorHandling
          error={
            this.props.paymentCompanyEditErrors &&
            this.props.paymentCompanyEditErrors.name
          }
        />
        <Button color="primary" disabled={this.props.paymentMethodLoading}>
          <span className="fa fa-check" /> Save
        </Button>
      </Form>
    );
  }
}

export default PaymentMethodEditModal;
