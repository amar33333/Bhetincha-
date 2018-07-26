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

class CompanyTypeEditModal extends Component {
  state = { company_type: "" };

  componentDidMount() {
    this.setState({
      company_type: this.props.data ? this.props.data : ""
    });
  }

  componentWillUnmount = () => {
    this.props.resetPaymentCompanyErrors();
  };

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.company_type,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { company_type } = this.state;
    this.props.onCompanyTypeEdit({ company_type });
  };

  render() {
    return (
      <Form onSubmit={this.onFormEdit} inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-company_type" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              autoFocus
              required
              //disabled={this.props.loading}
              type="text"
              placeholder="Type company_type Name"
              value={
                this.state.company_type ? this.state.company_type.name : ""
              }
              onChange={this.onChange.bind(this, "company_type")}
            />
          </InputGroup>
        </FormGroup>
        <ErrorHandling
          error={
            this.props.paymentCompanyEditErrors &&
            this.props.paymentCompanyEditErrors.name
          }
        />
        <Button color="primary" disabled={this.props.companyTypeLoading}>
          <span className="fa fa-check" /> Save
        </Button>
      </Form>
    );
  }
}

export default CompanyTypeEditModal;
