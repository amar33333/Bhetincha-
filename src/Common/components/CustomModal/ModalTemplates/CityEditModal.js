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

class CityEditModal extends Component {
  state = { state: "", country: "", district: "", city: "" };

  countries = [];
  states = [];
  districts = [];

  componentDidMount() {
    this.props.onGetAddressTreeList({
      countryId: this.props.data.country.id,
      stateId: this.props.data.state.id,
      access_token: this.props.access_token
    });

    this.setState({
      country: this.props.data.country,
      state: this.props.data.state,
      district: this.props.data.district,
      city: this.props.data
    });
  }

  onChange = (key, event) => {
    this.setState({
      city: {
        ...this.state.city,
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({
        state: "",
        district: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          ADDRESS_KEY: key
        });
      this.districts = [];
    } else if (key === "state") {
      this.setState({
        district: ""
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
    const { city, district } = this.state;
    this.props.onCityEdit({
      district: district.id,
      city
    });
  };

  render() {
    console.log("city edit props: ", this.props);
    console.log("city edit state: ", this.state);

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

    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="4">
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
          <Col xs="12" md="4">
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
          <Col xs="12" md="4">
            <FormGroup>
              <Label for="District">District</Label>
              <Select
                autosize
                clearable
                required
                disabled={this.props.loading}
                name="District"
                className="select-industry"
                value={this.state.district}
                onChange={this.handleSelectChange.bind(this, "district")}
                options={this.districts}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="10" md="8">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-map-pin" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                required
                type="text"
                disabled={this.props.loading}
                placeholder="Type City Name"
                value={this.state.city ? this.state.city.name : ""}
                onChange={this.onChange.bind(this, "name")}
              />
            </InputGroup>
          </Col>

          <Col xs="12" md="2">
            <Button color="primary">
              <span className="fa fa-check" /> Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CityEditModal;
