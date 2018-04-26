import React, { Component } from "react";

import Select from "react-select";

import {
  Button,
  Card,
  CardHeader,
  Row,
  Col,
  CardBody,
  Input,
  Label,
  FormGroup
} from "reactstrap";

import SubBusinessContactWrapper from "./SubBusinessContactWrapper";
import { ON_KEY_PRESS_ENTER } from "../../../config/CONSTANTS";

let countries = null;
let states = null;
let districts = null;
let cities = null;
let areas = null;

class SubBusinessBranch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      branch_country: "",
      branch_state: "",
      branch_district: "",
      branch_city: "",
      branch_area: "",
      branch_landline: "",
      branch_other_landline_number: "",
      branch_house_no: "",
      branch_landmark: "",
      branch_address_line_1: "",
      branch_address_line_2: "",
      branch_post_box: "",
      branch_toll_free: ""
    };

    this.propsData = {};

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  componentWillMount() {
    this.props.onCountryList({ access_token: this.access_token });
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.add && this.props.onValueChange) {
  //     console.log("willUpdate called: ", nextState);
  //     this.props.onValueChange(nextState, this.props.id, this.propsData);
  //     this.setState({ add: false });
  //   } else {
  //     // console.log(" NOO willUpdate: ", nextState);
  //   }
  // }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "branch_country") {
      this.setState({
        branch_state: "",
        branch_district: "",
        branch_city: "",
        branch_area: ""
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
    } else if (key === "branch_state") {
      this.setState({
        branch_district: "",
        branch_city: "",
        branch_area: ""
      });

      this.props.onStateEachList({
        id: value.value,
        access_token: this.access_token
      });
      cities = null;
      areas = null;
      // this.props.onUnmountCity();
      // this.props.onUnmountArea();
    } else if (key === "branch_district") {
      this.setState({
        branch_city: "",
        branch_area: ""
      });

      this.props.onDistrictEachList({
        id: value.value,
        access_token: this.access_token
      });
      areas = null;
      // this.props.onUnmountArea();
    } else if (key === "branch_city") {
      this.setState({
        branch_area: ""
      });

      this.props.onCityEachList({
        id: value.value,
        access_token: this.access_token
      });
      // this.props.onUnmountSubCategories();
    }
  };

  onDelete = () => {
    this.clearState();
    this.props.onDelete(this.props.id);
  };

  clearState = () => {
    this.setState({
      branch_country: "",
      branch_state: "",
      branch_district: "",
      branch_city: "",
      branch_area: "",
      branch_landline: "",
      branch_other_landline_number: "",
      branch_house_no: "",
      branch_landmark: "",
      branch_address_line_1: "",
      branch_address_line_2: "",
      branch_post_box: "",
      branch_toll_free: ""
    });
  };

  // getState = () => ({
  //   ...this.state,
  //   ...this.subBusinessContactWrapperRef2.getState()
  // });

  _handleKeyPress = event => {
    if (event.keyCode === ON_KEY_PRESS_ENTER) {
      console.log("enter entered");
      // form.elements[index + 1].focus();
      event.preventDefault();
      this.setState({ key_press: ON_KEY_PRESS_ENTER });
    }
  };

  render() {
    //branch ADDRESS
    countries = this.props.countries
      ? this.props.countries.map(industry => {
          return { value: industry.id, label: industry.name };
        })
      : null;

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

    const { branch_country } = this.state;
    const valueBranchCountry = branch_country && branch_country.value;

    const { branch_state } = this.state;
    const valueBranchState = branch_state && branch_state.value;

    const { branch_district } = this.state;
    const valueBranchDistrict = branch_district && branch_district.value;

    const { branch_city } = this.state;
    const valueBranchCity = branch_city && branch_city.value;

    const { branch_area } = this.state;
    const valueBranchArea = branch_area && branch_area.value;

    return (
      <Card>
        <CardHeader>
          <strong>Business Branch - {this.props.serial_num + 1} Address</strong>
          <Button
            color="primary"
            onClick={this.onDelete}
            style={{ float: "right" }}
          >
            DELETE
          </Button>
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
                  value={valueBranchCountry}
                  onChange={this.handleSelectChange.bind(
                    this,
                    "branch_country"
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
                  value={valueBranchState}
                  onChange={this.handleSelectChange.bind(this, "branch_state")}
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
                  value={valueBranchDistrict}
                  onChange={this.handleSelectChange.bind(
                    this,
                    "branch_district"
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
                  value={valueBranchCity}
                  onChange={this.handleSelectChange.bind(this, "branch_city")}
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
                  value={valueBranchArea}
                  onChange={this.handleSelectChange.bind(this, "branch_area")}
                  options={areas}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="6" md="6">
              <FormGroup>
                <Label for="bname">Branch Landline Number</Label>
                <Input
                  required
                  type="text"
                  value={this.state.branch_landline}
                  onChange={this.onChange.bind(this, "branch_landline")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bname">Other Branch LandLine Number</Label>
                <Input
                  required
                  type="text"
                  value={this.state.branch_other_landline_number}
                  onChange={this.onChange.bind(
                    this,
                    "branch_other_landline_number"
                  )}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bname">House No.</Label>
                <Input
                  required
                  type="text"
                  value={this.state.branch_house_no}
                  onChange={this.onChange.bind(this, "branch_house_no")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bname">Branch Landmark</Label>
                <Input
                  required
                  type="text"
                  value={this.state.branch_landmark}
                  onChange={this.onChange.bind(this, "branch_landmark")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bname">Address Line 1</Label>
                <Input
                  required
                  type="text"
                  value={this.state.branch_address_line_1}
                  onChange={this.onChange.bind(this, "branch_address_line_1")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bname">Address Line 2</Label>
                <Input
                  required
                  type="text"
                  value={this.state.branch_address_line_2}
                  onChange={this.onChange.bind(this, "branch_address_line_2")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bname">Post Box No.</Label>
                <Input
                  required
                  type="text"
                  value={this.state.branch_post_box}
                  onChange={this.onChange.bind(this, "branch_post_box")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bname">Toll Free No.</Label>
                <Input
                  required
                  type="text"
                  value={this.state.branch_toll_free}
                  onChange={this.onChange.bind(this, "branch_toll_free")}
                />
              </FormGroup>
            </Col>
          </Row>
          <SubBusinessContactWrapper
            ref={ref => (this.subBusinessContactWrapperRef2 = ref)}
            /* onSubmit={value => {
              this.propsData = { ...this.propsData, ...value };
            }} */
          />
          <Row style={{ marginBottom: 15 }}>
            <Col xs="6" md="6">
              <Button
                color="primary"
                onClick={() =>
                  this.props.onAdd(
                    this.state,
                    this.props.id,
                    this.subBusinessContactWrapperRef2.getState()
                  )
                }
              >
                ADD
              </Button>
            </Col>
            <Col xs="6" md="6">
              <Button color="primary" onClick={this.onDelete}>
                DELETE
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default SubBusinessBranch;
