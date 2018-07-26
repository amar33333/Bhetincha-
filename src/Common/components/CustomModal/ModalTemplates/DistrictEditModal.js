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

class DistrictEditModal extends Component {
  state = { state: "", country: "", district: "" };

  countries = [];
  states = [];

  componentDidMount() {
    this.props.onGetAddressTreeList({
      countryId: this.props.data.country.id,
      access_token: this.props.access_token
    });

    this.setState({
      district: this.props.data,
      country: this.props.data.country,
      state: this.props.data.state
    });
  }

  componentWillUnmount() {
    this.props.resetGeneralSetupErrors();
  }

  onChange = (key, event) => {
    this.setState({
      district: {
        ...this.state.district,
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({
        state: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          ADDRESS_KEY: key
        });
    }
  };

  onFormEdit = event => {
    event.preventDefault();
    const { state, district } = this.state;
    this.props.onDistrictEdit({
      state: state.id,
      district
    });
  };

  render() {
    console.log("disreriec prpops: ", this.props);
    console.log("disreriec: ", this.state);
    try {
      this.states = this.props.countries.length
        ? this.props.countries.find(country => {
            if (country.id === this.state.country.id) {
              return true;
            }
          }).states
        : [];
    } catch (error) {
      this.states = [];
    }

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
                value={this.state.country && this.state.country.id}
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
                options={this.states}
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
                <InputGroupText>Name</InputGroupText>
              </InputGroupAddon>
              <Input
                required
                disabled={this.props.loading}
                type="text"
                innerRef={ref => (this.focusableInput = ref)}
                placeholder="Type District Name"
                value={this.state.district ? this.state.district.name : ""}
                onChange={this.onChange.bind(this, "name")}
              />
            </InputGroup>
            <ErrorHandling
              error={
                this.props.generalSetupEditErrors &&
                this.props.generalSetupEditErrors.name
              }
            />
          </Col>
          <Col xs="12" md="4">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Code</InputGroupText>
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
          <ErrorHandling
            error={
              this.props.generalSetupEditErrors &&
              this.props.generalSetupEditErrors.code
            }
          />
          <Col xs="12" md="2">
            <Button color="primary" disabled={this.props.districtLoading}>
              <span className="fa fa-check" /> Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default DistrictEditModal;
