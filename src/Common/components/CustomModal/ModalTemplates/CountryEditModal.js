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

class CountryEditModal extends Component {
  state = { country: "" };

  componentDidMount() {
    this.setState({
      country: this.props.data ? this.props.data : ""
    });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.country,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { country } = this.state;
    this.props.onCountryEdit({ country });
  };

  render() {
    console.log("country edit state: ", this.state);
    return (
      <Form onSubmit={this.onFormEdit} inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-country" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              autoFocus
              required
              disabled={this.props.loading}
              type="text"
              placeholder="Type country Name"
              value={this.state.country ? this.state.country.name : ""}
              onChange={this.onChange.bind(this, "country")}
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

export default CountryEditModal;
