import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Col,
  Row,
  FormGroup
} from "reactstrap";

import { ErrorHandling } from "../../../../Common/utils/Extras";

class CountryEditModal extends Component {
  state = { country: "" };

  componentDidMount() {
    this.setState({
      country: this.props.data ? this.props.data : ""
    });
  }

  componentWillUnmount() {
    this.props.resetGeneralSetupErrors();
  }

  onChange = (key, event) => {
    this.setState({
      country: {
        ...this.state.country,
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { country } = this.state;
    this.props.onCountryEdit({ country });
  };

  render() {
    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="9">
            <FormGroup>
              <InputGroup className="mb-2">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Code</InputGroupText>
                </InputGroupAddon>
                <Input
                  autoFocus
                  required
                  disabled={this.props.loading}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Type Country Code"
                  value={
                    this.state.country ? this.state.country.countryCode : ""
                  }
                  onChange={this.onChange.bind(this, "countryCode")}
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input
                  required
                  disabled={this.props.loading}
                  type="text"
                  placeholder="Type Country Name"
                  value={this.state.country ? this.state.country.name : ""}
                  onChange={this.onChange.bind(this, "name")}
                />
              </InputGroup>
            </FormGroup>
            <ErrorHandling
              error={
                this.props.generalSetupEditErrors &&
                this.props.generalSetupEditErrors.name
              }
            />
            <Button color="primary" disabled={this.props.countryLoading}>
              <span className="fa fa-check" /> Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CountryEditModal;
