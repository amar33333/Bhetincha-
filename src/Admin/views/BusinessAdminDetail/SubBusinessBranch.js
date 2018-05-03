import React, { Component } from "react";
import MapComponent from "../../../Common/components/MapComponent";

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
      country: "",
      state: "",
      district: "",
      city: "",
      area: "",
      email: "",
      landlineNumber: "",
      otherLandlineNumber: [],
      house_no: "",
      landmark: "",
      addressLine1: "",
      addressLine2: "",
      po_box: "",
      tollFreeNumber: "",
      latitude: 27.7172453,
      longitude: 85.32391758465576
    };

    this.propsData = {};

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }
  onChangeLatLng = ({ latLng }) => {
    console.log("latLang: ", this.state.latitude, this.state.longitude);
    this.setState({ latitude: latLng.lat(), longitude: latLng.lng() });
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { branch } = nextProps;

    return branch && nextProps.edit
      ? {
          landlineNumber: branch.landlineNumber ? branch.landlineNumber : "",
          otherLandlineNumber: branch.otherLandlineNumber
            ? branch.otherLandlineNumber
            : "",
          house_no: branch.house_no ? branch.house_no : "",
          landmark: branch.landmark ? branch.landmark : "",
          addressLine1: branch.addressLine1 ? branch.addressLine1 : "",
          addressLine2: branch.addressLine2 ? branch.addressLine2 : "",
          po_box: branch.po_box ? branch.po_box : "",
          tollFreeNumber: branch.tollFreeNumber ? branch.tollFreeNumber : "",
          email: branch.email ? branch.email : "",
          country: {
            id: branch.country ? branch.country.id : "",
            name: branch.country ? branch.country.name : ""
          },
          state: {
            id: branch.state ? branch.state.id : "",
            name: branch.state ? branch.state.name : ""
          },
          district: {
            id: branch.district ? branch.district.id : "",
            name: branch.district ? branch.district.name : ""
          },
          city: {
            id: branch.city ? branch.city.id : "",
            name: branch.city ? branch.city.name : ""
          },
          area: {
            id: branch.area ? branch.area.id : "",
            name: branch.area ? branch.area.name : ""
          }
        }
      : null;
  };

  onChange = (key, event) => {
    if (key === "landmark" || "addressLine1" || "addressLine2") {
      this.setState({
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      });
    } else {
      this.setState({ [key]: event.target.value });
    }
  };

  getContacts = () =>
    this.props.branch && this.props.edit
      ? this.props.branch.contactPerson
      : null;

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "country") {
      this.setState({
        state: "",
        district: "",
        city: "",
        area: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          access_token: this.access_token,
          ADDRESS_KEY: key
        });
      districts = [];
      cities = [];
      areas = [];
    } else if (key === "state") {
      this.setState({
        district: "",
        city: "",
        area: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          access_token: this.access_token,
          ADDRESS_KEY: key
        });
      cities = [];
      areas = [];
    } else if (key === "district") {
      this.setState({
        city: "",
        area: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          access_token: this.access_token,
          ADDRESS_KEY: key
        });
      areas = [];
    } else if (key === "city") {
      this.setState({
        area: ""
      });
      if (value)
        this.props.onAddressTreeList({
          id: value.id,
          access_token: this.access_token,
          ADDRESS_KEY: key
        });
    }
  };

  handleAreaSelectChange = value => {
    console.log("Value: ", value.name);
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: value.name }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        var latLng = new window.google.maps.LatLng(
          location.lat(),
          location.lng()
        );
        this.mapComponentEl.googleMapEl.panTo(latLng);
        this.setState({
          area: value,
          latitude: location.lat(),
          longitude: location.lng()
        });
        console.log("latLang: ", this.state.latitude, this.state.longitude);
      } else {
        console.log("Location not found in map. Select Manually");
      }
    });
  };

  onDelete = () => {
    this.clearState();
    this.props.onDelete(this.props.id);
  };

  clearState = () => {
    this.setState({
      country: "",
      state: "",
      district: "",
      city: "",
      area: "",
      email: "",
      landlineNumber: "",
      otherLandlineNumber: [],
      house_no: "",
      landmark: "",
      addressLine1: "",
      addressLine2: "",
      po_box: "",
      tollFreeNumber: ""
    });

    this.subBusinessBranchContactWrapperRef.clearState();
  };

  _handleKeyPress = event => {
    if (event.keyCode === ON_KEY_PRESS_ENTER) {
      console.log("enter entered");
      event.preventDefault();
      this.setState({ key_press: ON_KEY_PRESS_ENTER });
    }
  };

  render() {
    // console.log("branch props:", this.props);
    // console.log("branch state:", this.state);

    countries = this.props.countries;

    try {
      states = this.props.countries
        ? this.props.countries.find(
            country => country.states && country.id === this.state.country.id
          ).states
        : [];
    } catch (error) {
      states = [];
    }

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts && state.id === this.state.state.id) {
                districts = state.districts;
              }
            });
          }
        });
      }
    } catch (error) {
      districts = [];
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

    try {
      if (this.props.countries) {
        this.props.countries.map(country => {
          if (country.states) {
            country.states.map(state => {
              if (state.districts) {
                state.districts.map(district => {
                  if (district.cities) {
                    district.cities.map(city => {
                      if (city.areas && city.id === this.state.city.id) {
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

    const { country } = this.state;
    const valueBranchCountry = country && country.id;

    const { state } = this.state;
    const valueBranchState = state && state.id;

    const { district } = this.state;
    const valueBranchDistrict = district && district.id;

    const { city } = this.state;
    const valueBranchCity = city && city.id;

    const { area } = this.state;
    const valueBranchArea = area && area.id;

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
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">Country</Label>
                  <Select
                    name="Country"
                    placeholder="Select a Country"
                    noResultsText="No Data Found"
                    value={valueBranchCountry}
                    onChange={this.handleSelectChange.bind(this, "country")}
                    options={countries}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">State</Label>
                  <Select
                    name="State"
                    placeholder="Select a State"
                    noResultsText="No Data Found"
                    value={valueBranchState}
                    onChange={this.handleSelectChange.bind(this, "state")}
                    options={states}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">District</Label>
                  <Select
                    name="District"
                    placeholder="Select a District"
                    noResultsText="No Data Found"
                    value={valueBranchDistrict}
                    onChange={this.handleSelectChange.bind(this, "district")}
                    options={districts}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">City</Label>
                  <Select
                    name="City"
                    placeholder="Select a City"
                    noResultsText="No Data Found"
                    value={valueBranchCity}
                    onChange={this.handleSelectChange.bind(this, "city")}
                    options={cities}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="group">Area</Label>
                  <Select
                    name="Area"
                    placeholder="Select an Area"
                    noResultsText="No Data Found"
                    value={valueBranchArea}
                    onChange={this.handleAreaSelectChange.bind(this)}
                    options={areas}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Branch Landmark</Label>
                  <Input
                    type="text"
                    value={this.state.landmark}
                    onChange={this.onChange.bind(this, "landmark")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <Card className="p-3">
                  <strong className="mb-2">
                    Select your Branch Location from the map displayed below
                  </strong>
                  <MapComponent
                    ref={ref => (this.mapComponentEl = ref)}
                    position={{
                      lat: this.state.latitude,
                      lng: this.state.longitude
                    }}
                    onClick={this.onChangeLatLng}
                    onDragEnd={this.onChangeLatLng}
                  />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    type="email"
                    value={this.state.email}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "email")}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Branch Landline Number</Label>
                  <Input
                    type="text"
                    value={this.state.landlineNumber}
                    onChange={this.onChange.bind(this, "landlineNumber")}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Other Branch LandLine Number</Label>
                  <Input
                    type="text"
                    value={this.state.otherLandlineNumber}
                    onChange={event => {
                      this.setState({
                        otherLandlineNumber: [event.target.value]
                      });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">House No.</Label>
                  <Input
                    type="text"
                    value={this.state.house_no}
                    onChange={this.onChange.bind(this, "house_no")}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Post Box No.</Label>
                  <Input
                    type="text"
                    value={this.state.po_box}
                    onChange={this.onChange.bind(this, "po_box")}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup>
                  <Label for="bname">Toll Free No.</Label>
                  <Input
                    type="text"
                    value={this.state.tollFreeNumber}
                    onChange={this.onChange.bind(this, "tollFreeNumber")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6" md="6">
                <FormGroup>
                  <Label for="bname">Address Line 1</Label>
                  <Input
                    type="text"
                    value={this.state.addressLine1}
                    onChange={this.onChange.bind(this, "addressLine1")}
                  />
                </FormGroup>
              </Col>
              <Col xs="6" md="6">
                <FormGroup>
                  <Label for="bname">Address Line 2</Label>
                  <Input
                    type="text"
                    value={this.state.addressLine2}
                    onChange={this.onChange.bind(this, "addressLine2")}
                  />
                </FormGroup>
              </Col>
            </Row>

            <SubBusinessContactWrapper
              ref={ref => (this.subBusinessBranchContactWrapperRef = ref)}
              contactPerson={this.getContacts()}
              edit
            />
            <Row style={{ marginBottom: 15 }}>
              <Col xs="6" md="6">
                <Button
                  color="success"
                  onClick={() =>
                    this.props.onAdd(
                      this.state,
                      this.props.id,
                      this.subBusinessBranchContactWrapperRef.getState()
                    )
                  }
                >
                  <i className="fa fa-save" /> SAVE BRANCH
                </Button>
              </Col>
              <Col xs="6" md="6">
                <Button color="danger" onClick={this.onDelete}>
                  <i className="fa fa-remove" /> DELETE
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
