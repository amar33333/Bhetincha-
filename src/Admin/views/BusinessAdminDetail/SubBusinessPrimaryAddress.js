import React, { Component } from "react";

import Select from "react-select";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  FormGroup
} from "reactstrap";

import SubBusinessContactWrapper from "./SubBusinessContactWrapper.js";

let countries = null;
let states = null;
let districts = null;
let cities = null;
let areas = null;

class SubBusinessPrimaryAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary_country: "",
      primary_state: "",
      primary_district: "",
      primary_city: "",
      primary_area: "",
      landline: "",
      other_landline_number: "",
      house_no: "",
      landmark: "",
      address_line_1: "",
      address_line_2: "",
      post_box: "",
      toll_free: ""
    };

    this.propsData = {};
    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log("this.props contact: ", this.propsData);
  //   if (this.props.onSubmit) this.props.onSubmit(nextState, this.propsData);
  // }

  // propsDataCallback = value => {
  //   console.log("contact ;", value.contacts);
  //   this.setState({ contacts: value.contacts });

  //   this.propsData = { ...this.propsData, ...value };
  //   console.log("props contact ; ", this.propsData);
  // };

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "primary_country") {
      this.setState({
        primary_state: "",
        primary_district: "",
        primary_city: "",
        primary_area: ""
      });

      this.props.onCountryEachList({
        id: value.value,
        access_token: this.access_token
      });
      districts = null;
      cities = null;
      areas = null;
      // this.props.onUnmountDistrict();
      // this.props.onUnmountCity();
      // this.props.onUnmountArea();
    } else if (key === "primary_state") {
      this.setState({
        primary_district: "",
        primary_city: "",
        primary_area: ""
      });

      this.props.onStateEachList({
        id: value.value,
        access_token: this.access_token
      });
      cities = null;
      areas = null;
      // this.props.onUnmountCity();
      // this.props.onUnmountArea();
    } else if (key === "primary_district") {
      this.setState({
        primary_city: "",
        primary_area: ""
      });

      this.props.onDistrictEachList({
        id: value.value,
        access_token: this.access_token
      });
      areas = null;
      // this.props.onUnmountArea();
    } else if (key === "primary_city") {
      this.setState({
        primary_area: ""
      });

      this.props.onCityEachList({
        id: value.value,
        access_token: this.access_token
      });
      // this.props.onUnmountSubCategories();
    }
  };

  clearState = () => {
    this.setState({
      primary_country: "",
      primary_state: "",
      primary_district: "",
      primary_city: "",
      primary_area: "",
      landline: "",
      other_landline_number: "",
      house_no: "",
      landmark: "",
      address_line_1: "",
      address_line_2: "",
      post_box: "",
      toll_free: ""
    });
  };

  getState = () => ({
    ...this.state,
    ...this.subBusinessContactWrapperRef.getState()
  });

  render() {
    //PRIMARY ADDRESS
    countries = this.props.countries
      ? this.props.countries.map(industry => {
          return { value: industry.id, label: industry.name };
        })
      : null;

    console.log("countryData branch: ", this.props.countryData);
    states = this.props.countryData
      ? this.props.countryData.states.map(state => {
          return { value: state.id, label: state.name };
        })
      : null;

    districts = this.props.stateData
      ? this.props.stateData.districts.map(district => {
          return { value: district.id, label: district.name };
        })
      : null;

    cities = this.props.districtData
      ? this.props.districtData.cities.map(city => {
          return { value: city.id, label: city.name };
        })
      : null;

    areas = this.props.cityData
      ? this.props.cityData.areas.map(area => {
          return { value: area.id, label: area.name };
        })
      : null;

    const { primary_country } = this.state;
    const valuePrimaryCountry = primary_country && primary_country.value;

    const { primary_state } = this.state;
    const valuePrimaryState = primary_state && primary_state.value;

    const { primary_district } = this.state;
    const valuePrimaryDistrict = primary_district && primary_district.value;

    const { primary_city } = this.state;
    const valuePrimaryCity = primary_city && primary_city.value;

    const { primary_area } = this.state;
    const valuePrimaryArea = primary_area && primary_area.value;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Business Primary Address</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label for="group">Country</Label>
                  <Select
                    required
                    name="Country"
                    placeholder="Select a Country"
                    noResultsText="No Data Found"
                    value={valuePrimaryCountry}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "primary_country"
                    )}
                    options={countries}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label for="group">State</Label>
                  <Select
                    required
                    name="State"
                    placeholder="Select a State"
                    noResultsText="No Data Found"
                    value={valuePrimaryState}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "primary_state"
                    )}
                    options={states}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label for="group">District</Label>
                  <Select
                    required
                    name="District"
                    placeholder="Select a District"
                    noResultsText="No Data Found"
                    value={valuePrimaryDistrict}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "primary_district"
                    )}
                    options={districts}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label for="group">City</Label>
                  <Select
                    required
                    name="City"
                    placeholder="Select a City"
                    noResultsText="No Data Found"
                    value={valuePrimaryCity}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "primary_city"
                    )}
                    options={cities}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label for="group">Area</Label>
                  <Select
                    required
                    name="Area"
                    placeholder="Select an Area"
                    noResultsText="No Data Found"
                    value={valuePrimaryArea}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "primary_area"
                    )}
                    options={areas}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6" md="6">
                <FormGroup>
                  <Label for="bname">Landline Number</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.landline}
                    onChange={this.onChange.bind(this, "landline")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bname">OtherLandLineNumber</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.other_landline_number}
                    onChange={this.onChange.bind(this, "other_landline_number")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bname">House No.</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.house_no}
                    onChange={this.onChange.bind(this, "house_no")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bname">Landmark</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.landmark}
                    onChange={this.onChange.bind(this, "landmark")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bname">Address Line 1</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.address_line_1}
                    onChange={this.onChange.bind(this, "address_line_1")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bname">Address Line 2</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.address_line_2}
                    onChange={this.onChange.bind(this, "address_line_2")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bname">Post Box No.</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.post_box}
                    onChange={this.onChange.bind(this, "post_box")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bname">Toll Free No.</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.toll_free}
                    onChange={this.onChange.bind(this, "toll_free")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
              </Col>
            </Row>
            <SubBusinessContactWrapper
              ref={ref => (this.subBusinessContactWrapperRef = ref)}
              /* onSubmit={this.propsDataCallback} */
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessPrimaryAddress;
