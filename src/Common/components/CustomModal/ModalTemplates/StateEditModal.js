import React, { Component } from "react";
import {
  Row,
  Col,
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup
} from "reactstrap";

import Select from "react-select";
import { ErrorHandling } from "../../../utils/Extras";

class StateEditModal extends Component {
  state = { state: "", country: "" };

  componentDidMount() {
    this.props.data &&
      this.setState({
        state: this.props.data,
        country: this.props.data.country
      });
  }

  componentWillUnmount() {
    this.props.resetGeneralSetupErrors();
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.state,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  handleSelectChange = country => this.setState({ country });

  onFormEdit = event => {
    event.preventDefault();
    const {
      state,
      country: { id }
    } = this.state;
    this.props.onStateEdit({ state, country: id });
  };

  render() {
    console.log("state edit props: ", this.props);
    console.log("state edit state: ", this.state);

    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label for="Countries">Country</Label>
              <Select
                autoFocus
                autosize
                clearable
                required
                name="Industries"
                className="select-country"
                value={this.state.country && this.state.country.id}
                onChange={this.handleSelectChange}
                options={this.props.countries}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="9">
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input
                  //autoFocus
                  required
                  disabled={this.props.loading}
                  type="text"
                  placeholder="Type state Name"
                  value={this.state.state ? this.state.state.name : ""}
                  onChange={this.onChange.bind(this, "state")}
                />
              </InputGroup>
            </FormGroup>
            <ErrorHandling
              error={
                this.props.generalSetupEditErrors &&
                this.props.generalSetupEditErrors.name
              }
            />
          </Col>
          <Col xs="12" md="2">
            <Button fluid color="primary" disabled={this.props.stateLoading}>
              <span className="fa fa-check" /> Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default StateEditModal;
