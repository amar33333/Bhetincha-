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
  onStateList,
  onDistrictSubmit
} from "../../actions";

class Districts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      state: "",
      district: "",
      districtCode: ""
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.props.onCountryList({ access_token: this.access_token });
  }

  onFormSubmit = event => {
    event.preventDefault();

    const { district, districtCode, state } = this.state;

    this.props.onDistrictSubmit({
      district,
      districtCode,
      state: state.value,
      access_token: this.access_token
    });
    this.setState({ district: "", districtCode: "", state: "" });
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
    }
  };

  render() {
    const countries = this.props.general_setup.countries;
    console.log("district props: ", this.props);

    const states = this.props.general_setup.countryData
      ? this.props.general_setup.countryData.states
      : null;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Add District</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="6">
                      <FormGroup>
                        <Label for="Industies">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="country"
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
                    <Col xs="12" md="6">
                      <FormGroup>
                        <Label for="Industies">State</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="State"
                          className="select-industry"
                          value={this.state.state.id}
                          onChange={this.handleSelectChange.bind(this, "state")}
                          options={states}
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
                          autoFocus
                          required
                          type="text"
                          placeholder="Type District Name"
                          value={this.state.district}
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
                          autoFocus
                          required
                          type="text"
                          placeholder="Type District Code"
                          value={this.state.districtCode}
                          onChange={this.onChange.bind(this, "districtCode")}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="12" md="2">
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
    onStateList,
    onDistrictSubmit,
    onCountryList,
    onCountryEachList
  }
)(Districts);
