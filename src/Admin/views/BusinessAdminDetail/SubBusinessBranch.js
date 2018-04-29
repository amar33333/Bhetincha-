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
  FormGroup,
  Collapse
} from "reactstrap";

import SubBusinessContactWrapper from "./SubBusinessContactWrapper";
import { ON_KEY_PRESS_ENTER } from "../../../config/CONSTANTS";

let countries = [];
let states = [];
let districts = [];
let cities = [];
let areas = [];

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
      // collapsed: true
    };

    this.propsData = {};

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }
  // toggleCollapse = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // };
  // componentWillMount() {
  //   this.props.onCountryList({ access_token: this.access_token });
  // }

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

    if (key === "branch_country" && value) {
      this.setState({
        branch_state: "",
        branch_district: "",
        branch_city: "",
        branch_area: ""
      });
      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
      districts = [];
      cities = [];
      areas = [];
      // this.props.onUnmountDistrict();
      // this.props.onUnmountCity();
      // this.props.onUnmountArea();
    } else if (key === "branch_state" && value) {
      this.setState({
        branch_district: "",
        branch_city: "",
        branch_area: ""
      });

      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
      cities = [];
      areas = [];
      // this.props.onUnmountCity();
      // this.props.onUnmountArea();
    } else if (key === "branch_district" && value) {
      this.setState({
        branch_city: "",
        branch_area: ""
      });

      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
      areas = [];
      // this.props.onUnmountArea();
    } else if (key === "branch_city" && value) {
      this.setState({
        branch_area: ""
      });

      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
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

    this.subBusinessBranchContactWrapperRef.clearState();
  };

  // not used... instead callback function is used
  // getState = () => ({
  //   ...this.state,
  //   ...this.subBusinessBranchContactWrapperRef.getState()
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

    countries = this.props.countries;

    try {
      states = this.props.countries
        ? this.props.countries.find(
            country =>
              country.states && country.id === this.state.branch_country.id
          ).states
        : [];
    } catch (error) {
      states = [];
    }

    console.log("states found: ", states);

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts && state.id === this.state.branch_state.id) {
                districts = state.districts;
              }
            });
          }
        });
      }
    } catch (error) {
      districts = [];
    }

    console.log("districts found: ", districts);

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts) {
                state.districts.map(district => {
                  if (
                    district.cities &&
                    district.id === this.state.branch_district.id
                  ) {
                    cities = district.cities;
                  }
                });
              }
            });
          }
        });
      }
    } catch (error) {
      cities = [];
    }

    console.log("cities found: ", cities);

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts) {
                state.districts.map(district => {
                  if (district.cities) {
                    district.cities.map(city => {
                      if (city.areas && city.id === this.state.branch_city.id) {
                        areas = city.areas;
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    } catch (error) {
      areas = [];
    }
    console.log("areas found: ", areas);

    const { branch_country } = this.state;
    const valueBranchCountry = branch_country && branch_country.id;

    const { branch_state } = this.state;
    const valueBranchState = branch_state && branch_state.id;

    const { branch_district } = this.state;
    const valueBranchDistrict = branch_district && branch_district.id;

    const { branch_city } = this.state;
    const valueBranchCity = branch_city && branch_city.id;

    const { branch_area } = this.state;
    const valueBranchArea = branch_area && branch_area.id;

    return (
      <Card>
        <CardHeader onClick={this.props.toggleCollapse}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <strong>
              Business Branch - {this.props.serial_num + 1} Address
            </strong>
            <Button
              color="danger"
              onClick={this.onDelete}
              style={{ float: "right" }}
            >
              DELETE
            </Button>
            <Button
              color="primary"
              onClick={this.props.toggleCollapse}
              style={{
                marginBottom: "0rem",
                backgroundColor: "rgb(230, 228, 241)",
                color: "black",
                fontSize: "1.3rem",
                border: "1px solid #2e219036",
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {!this.props.collapsed ? (
                <i className="fa fa-angle-up" />
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Button>
          </div>
        </CardHeader>
        <Collapse isOpen={!this.props.collapsed}>
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
                    valueKey="id"
                    labelKey="name"
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
                    onChange={this.handleSelectChange.bind(
                      this,
                      "branch_state"
                    )}
                    options={states}
                    valueKey="id"
                    labelKey="name"
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
                    valueKey="id"
                    labelKey="name"
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
                    valueKey="id"
                    labelKey="name"
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
                    valueKey="id"
                    labelKey="name"
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
              ref={ref => (this.subBusinessBranchContactWrapperRef = ref)}
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
                      this.subBusinessBranchContactWrapperRef.getState()
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
        </Collapse>
      </Card>
    );
  }
}

export default SubBusinessBranch;
