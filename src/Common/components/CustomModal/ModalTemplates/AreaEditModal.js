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

class AreaEditModal extends Component {
  state = { state: "", country: "", district: "", city: "", area: "" };

  countries = [];
  states = [];
  districts = [];
  cities = [];

  componentDidMount() {
    this.props.onGetAddressTreeList({
      countryId: this.props.data.country.id,
      stateId: this.props.data.state.id,
      districtId: this.props.data.district.id,
      access_token: this.props.access_token
    });

    this.setState({
      country: this.props.data.country,
      state: this.props.data.state,
      district: this.props.data.district,
      city: this.props.data.city,
      area: this.props.data
    });
  }

  componentWillUnmount() {
    this.props.resetGeneralSetupErrors();
  }

  onChange = (key, event) => {
    this.setState({
      area: {
        ...this.state.area,
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({
        state: "",
        district: "",
        city: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          ADDRESS_KEY: key
        });
      this.districts = [];
      this.cities = [];
    } else if (key === "state") {
      this.setState({
        district: "",
        city: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          ADDRESS_KEY: key
        });
      this.cities = [];
    } else if (key === "district") {
      this.setState({
        city: ""
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
    const { city, area } = this.state;
    this.props.onAreaEdit({
      city: city.id,
      area
    });
  };

  render() {
    console.log("area edit props: ", this.props);
    console.log("area edit state: ", this.state);

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

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts && state.id === this.state.state.id) {
                this.districts = state.districts;
              }
            });
          }
        });
      }
    } catch (error) {
      this.districts = [];
    }

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts) {
                state.districts.map(district => {
                  if (
                    district.cities &&
                    district.id === this.state.district.id
                  ) {
                    this.cities = district.cities;
                  }
                });
              }
            });
          }
        });
      }
    } catch (error) {
      this.cities = [];
    }

    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="Countries">Country</Label>
              <Select
                autoFocus
                autosize
                clearable
                required
                disabled={this.props.loading}
                name="Countries"
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
              <Label for="States">State</Label>
              <Select
                autosize
                clearable
                required
                disabled={this.props.loading}
                name="States"
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
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="Districts">District</Label>
              <Select
                autosize
                clearable
                required
                disabled={this.props.loading}
                name="Districts"
                className="select-industry"
                value={this.state.district}
                onChange={this.handleSelectChange.bind(this, "district")}
                options={this.districts}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="Cities">City</Label>
              <Select
                autosize
                clearable
                required
                disabled={this.props.loading}
                name="Cities"
                className="select-industry"
                value={this.state.city}
                onChange={this.handleSelectChange.bind(this, "city")}
                options={this.cities}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
        </Row>{" "}
        <Row>
          <Col xs="10" md="8">
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
                placeholder="Type Area Name"
                value={this.state.area ? this.state.area.name : ""}
                onChange={this.onChange.bind(this, "name")}
              />
            </InputGroup>
          </Col>
          <ErrorHandling
            error={
              this.props.generalSetupEditErrors &&
              this.props.generalSetupEditErrors.name
            }
          />

          <Col xs="12" md="2">
            <Button color="primary" disabled={this.props.areaLoading}>
              <span className="fa fa-check" /> Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default AreaEditModal;
