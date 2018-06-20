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

class IndustryEditModal extends Component {
  state = { industry: "" };

  componentDidMount() {
    this.setState({
      industry: this.props.data ? this.props.data : ""
    });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.industry,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { industry } = this.state;
    this.props.onIndustryEdit({ industry });
  };

  render() {
    console.log("industry edit state: ", this.state);
    return (
      <Form onSubmit={this.onFormEdit} inline>
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
              disabled={this.props.loading}
              type="text"
              placeholder="Type Industry Name"
              value={this.state.industry ? this.state.industry.name : ""}
              onChange={this.onChange.bind(this, "industry")}
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

export default IndustryEditModal;
