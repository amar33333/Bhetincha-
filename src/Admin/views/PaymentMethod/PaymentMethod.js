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
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { connect } from "react-redux";

import { onPaymentMethodSubmit } from "../../actions";

class PaymentMethod extends Component {
  state = {
    payment_method: ""
  };

  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  onFormSubmit = event => {
    event.preventDefault();
    const { payment_method } = this.state;
    this.props.onPaymentMethodSubmit({
      payment_method,
      access_token: this.access_token
    });
    this.setState({ payment_method: "" });
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    return (
      <div>
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Payment Method</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-industry" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus
                        required
                        type="text"
                        placeholder="Type Payment Method"
                        value={this.state.payment_method}
                        onChange={this.onChange.bind(this, "payment_method")}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button color="primary">
                    <span className="fa fa-plus" /> Add
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { business_reducer }, auth }) => ({
    ...business_reducer,
    ...auth
  }),
  { onPaymentMethodSubmit }
)(PaymentMethod);
