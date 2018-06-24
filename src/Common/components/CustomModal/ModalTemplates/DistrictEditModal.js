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

class DistrictEditModal extends Component {
  state = { state: "", country: "" };

  componentDidMount() {
    this.setState({
      district: this.props.data ? this.props.data : "",
      country: this.props.data
        ? { id: this.props.data.country, name: this.props.data.country }
        : "",
      state: this.props.data
        ? { id: this.props.data.state, name: this.props.data.state }
        : ""
    });
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
    console.log("distrit edit props: ", this.props);
    console.log("distrit edit state: ", this.state);

    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="country">Country</Label>
              <Select
                autoFocus
                autosize
                clearable
                disabled={this.props.loading}
                required
                name="country"
                className="select-industry"
                value={this.state.country}
                onChange={this.handleSelectChange.bind(this, "country")}
                options={this.props.countries}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="State">State</Label>
              <Select
                autosize
                clearable
                disabled={this.props.loading}
                required
                name="State"
                className="select-industry"
                value={this.state.state}
                onChange={this.handleSelectChange.bind(this, "state")}
                options={this.props.states}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="5">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-industry" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                required
                disabled={this.props.loading}
                type="text"
                innerRef={ref => (this.focusableInput = ref)}
                placeholder="Type District Name"
                value={this.state.district ? this.state.district.name : ""}
                onChange={this.onChange.bind(this, "district")}
              />
            </InputGroup>
          </Col>
          <Col xs="12" md="5">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-industry" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                required
                type="text"
                disabled={this.props.loading}
                placeholder="Type District Code"
                value={
                  this.state.district ? this.state.district.districtCode : ""
                }
                onChange={this.onChange.bind(this, "districtCode")}
              />
            </InputGroup>
          </Col>
          <Col xs="12" md="2">
            <Button color="primary">
              <span className="fa fa-plus" /> SAVE
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default DistrictEditModal;
