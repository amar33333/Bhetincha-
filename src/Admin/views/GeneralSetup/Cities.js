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
  onDistrictList,
  onCitySubmit
} from "../../actions";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      state: "",
      district: "",
      city: ""
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.props.onCountryList({ access_token: this.access_token });
  }

  onFormSubmit = event => {
    event.preventDefault();

    const { city, district } = this.state;

    this.props.onCitySubmit({
      city,
      district: district.id,
      access_token: this.access_token
    });
    this.setState({ city: "" });
  };

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
        id: value.id,
        access_token: this.access_token
      });
    } else if (key === "state") {
      this.setState({
        district: ""
      });
      this.props.onStateEachList({
        id: value.id,
        access_token: this.access_token
      });
    }
  };

  render() {
    const countries = this.props.general_setup.countries;
    const states = this.props.general_setup.countryData
      ? this.props.general_setup.countryData.states
      : null;

    const districts = this.props.general_setup.stateData
      ? this.props.general_setup.stateData.districts
      : null;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add City</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="Industies">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="countries"
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
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="Industies">State</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="states"
                          className="select-industry"
                          value={this.state.state.id}
                          onChange={this.handleSelectChange.bind(this, "state")}
                          options={states}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="Industies">District</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="Industies"
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
                  </Row>
                  <Row>
                    <Col xs="10" md="10">
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
                          placeholder="Type City Name"
                          value={this.state.city}
                          onChange={this.onChange.bind(this, "city")}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="2" md="2">
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
    onCitySubmit,
    onCountryList,
    onCountryEachList,
    onStateEachList
  }
)(Cities);
