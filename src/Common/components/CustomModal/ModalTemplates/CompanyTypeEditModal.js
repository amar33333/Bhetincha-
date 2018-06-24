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

class CompanyTypeEditModal extends Component {
  state = { company_type: "" };

  componentDidMount() {
    this.setState({
      company_type: this.props.data ? this.props.data : ""
    });
  }

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
    console.log("company_type edit state: ", this.state);
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
              disabled={this.props.loading}
              type="text"
              placeholder="Type company_type Name"
              value={
                this.state.company_type ? this.state.company_type.name : ""
              }
              onChange={this.onChange.bind(this, "company_type")}
            />
          </InputGroup>
        </FormGroup>
        <Button color="primary">
          <span className="fa fa-plus" /> SAVE
        </Button>
      </Form>
    );
  }
}

export default CompanyTypeEditModal;
