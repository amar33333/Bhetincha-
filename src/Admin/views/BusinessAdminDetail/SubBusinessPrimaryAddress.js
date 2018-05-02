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
  FormGroup,
  Button,
  Collapse
} from "reactstrap";

import SubBusinessContactWrapper from "./SubBusinessContactWrapper.js";

let countries = [];
let states = [];
let districts = [];
let cities = [];
let areas = [];

class SubBusinessPrimaryAddress extends Component {
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
      tollFreeNumber: ""
    };

    this.propsData = {};
    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { address } = nextProps;

    return nextProps.address && nextProps.edit
      ? {
          landlineNumber: nextProps.address.landline,
          house_no: nextProps.address.house_no,
          landmark: nextProps.address.landmark,
          addressLine1: nextProps.address.addressLine1,
          addressLine2: nextProps.address.addressLine2,
          po_box: nextProps.address.po_box,
          tollFreeNumber: nextProps.address.tollFreeNumber,
          email: nextProps.address.email
          // country: {
          //   id: nextProps.address.country.id,
          //   name: nextProps.address.country.name
          // },
          // state: {
          //   id: nextProps.address.state.id,
          //   name: nextProps.address.state.name
          // },
          // district: {
          //   id: nextProps.address.district.id,
          //   name: nextProps.address.district.name
          // },
          // city: {
          //   id: nextProps.address.city.id,
          //   name: nextProps.address.city.name
          // },
          // area: {
          //   id: nextProps.address.area.id,
          //   name: nextProps.address.area.name
          // }
        }
      : null;
  };

  getContacts = () =>
    this.props.address && this.props.edit
      ? this.props.address.contactPerson
      : null;
  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "country" && value) {
      this.setState({
        state: "",
        district: "",
        city: "",
        area: ""
      });
      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
      districts = [];
      cities = [];
      areas = [];
    } else if (key === "state" && value) {
      this.setState({
        district: "",
        city: "",
        area: ""
      });

      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
      cities = [];
      areas = [];
    } else if (key === "district" && value) {
      this.setState({
        city: "",
        area: ""
      });

      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
      areas = [];
    } else if (key === "city" && value) {
      this.setState({
        area: ""
      });

      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
    }
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

    this.subBusinessContactWrapperRef.clearState();
  };

  getState = () => {
    console.log("eachItem PRIMARY: ", this.state);

    let reformed = {};
    for (var property in this.state) {
      reformed =
        (this.state[property] !== "" &&
          this.state[property] !== null &&
          this.state[property] !== undefined) ||
        (this.state[property].constructor === Array &&
          this.state[property].length > 0)
          ? { ...reformed, [property]: this.state[property] }
          : reformed;
    }

    console.log("primary address reformed: ", reformed);
    return {
      address: {
        ...reformed,
        ...this.subBusinessContactWrapperRef.getState()
      }
    };
  };

  render() {
    countries = this.props.countries;

    try {
      states = this.props.countries
        ? this.props.countries.find(country => {
            if (country.id === this.state.country.id) {
              return true;
            }
          }).states
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
    const valuePrimaryCountry = country && country.id;

    const { state } = this.state;
    const valuePrimaryState = state && state.id;

    const { district } = this.state;
    const valuePrimaryDistrict = district && district.id;

    const { city } = this.state;
    const valuePrimaryCity = city && city.id;

    const { area } = this.state;
    const valuePrimaryArea = area && area.id;

    return (
      <div className="animated fadeIn">
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
              <strong>Business Primary Address</strong>
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
                      value={valuePrimaryCountry}
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
                      value={valuePrimaryState}
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
                      value={valuePrimaryDistrict}
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
                      value={valuePrimaryCity}
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
                      value={valuePrimaryArea}
                      onChange={this.handleSelectChange.bind(this, "area")}
                      options={areas}
                      valueKey="id"
                      labelKey="name"
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label for="bname">Landmark</Label>
                    <Input
                      type="text"
                      value={this.state.landmark}
                      onChange={this.onChange.bind(this, "landmark")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
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
                    <Label for="bname">Landline Number</Label>
                    <Input
                      type="text"
                      value={this.state.landlineNumber}
                      onChange={this.onChange.bind(this, "landlineNumber")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label for="bname">Other LandLine Number</Label>
                    <Input
                      type="text"
                      value={this.state.otherLandlineNumber}
                      onChange={event => {
                        this.setState({
                          otherLandlineNumber: [event.target.value]
                        });
                      }}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="bname">Address Line 1</Label>
                    <Input
                      type="text"
                      value={this.state.addressLine1}
                      onChange={this.onChange.bind(this, "addressLine1")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="bname">Address Line 2</Label>
                    <Input
                      type="text"
                      value={this.state.addressLine2}
                      onChange={this.onChange.bind(this, "addressLine2")}
                      onKeyDown={this._handleKeyPress}
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
                      onKeyDown={this._handleKeyPress}
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
                      onKeyDown={this._handleKeyPress}
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
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <SubBusinessContactWrapper
                ref={ref => (this.subBusinessContactWrapperRef = ref)}
                contactPerson={this.getContacts()}
                edit
              />
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessPrimaryAddress;
