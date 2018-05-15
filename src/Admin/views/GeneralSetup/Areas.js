import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader,
  Label
} from "reactstrap";

import Select from "react-select";

import {
  onCountryList,
  onCountryEachList,
  onStateEachList,
  onDistrictEachList,
  onAreaSubmit
} from "../../actions";

class Areas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      state: "",
      district: "",
      area: "",
      city: ""
    };
    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
    this.props.onCountryList({ access_token: this.access_token });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({
        state: ""
      });
      this.props.onCountryEachList({
        id: value.id
      });
    } else if (key === "state") {
      this.setState({
        district: ""
      });
      this.props.onStateEachList({
        id: value.id
      });
    } else if (key === "district") {
      this.setState({
        city: ""
      });
      this.props.onDistrictEachList({
        id: value.id
      });
    }
  };

  onFormSubmit = event => {
    event.preventDefault();

    const { area, city } = this.state;
    console.log("form submit: ", this.state);

    this.props.onAreaSubmit({
      area,
      city: city.id,
      access_token: this.access_token
    });
    this.setState({ area: "" });
  };

  render() {
    const countries = this.props.general_setup.countries;
    const states = this.props.general_setup.countryData;
    const districts = this.props.general_setup.stateData;
    const cities = this.props.general_setup.districtData;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="10">
            <Card>
              <CardHeader>
                <strong>Add Area</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Countries">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="Countries"
                          className="select-industry"
                          value={this.state.country.id}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "country"
                          )}
                          options={countries}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="States">State</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="States"
                          className="select-industry"
                          value={this.state.state.id}
                          onChange={this.handleSelectChange.bind(this, "state")}
                          options={states}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Districts">District</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="Districts"
                          className="select-industry"
                          value={this.state.district.id}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "district"
                          )}
                          options={districts}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Cities">City</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="Cities"
                          className="select-industry"
                          value={this.state.city.id}
                          onChange={this.handleSelectChange.bind(this, "city")}
                          options={cities}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="8">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-industry" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoFocus
                          required
                          type="text"
                          placeholder="Type Area Name"
                          value={this.state.area}
                          onChange={this.onChange.bind(this, "area")}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="12" md="4">
                      <Button color="primary">
                        <span className="fa fa-plus" /> Add
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { general_setup }, auth }) => ({ general_setup, ...auth }),
  {
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onAreaSubmit
  }
)(Areas);
