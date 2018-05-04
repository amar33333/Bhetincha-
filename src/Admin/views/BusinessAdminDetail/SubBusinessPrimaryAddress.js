import React, { Component } from "react";

import Select from "react-select";

import MapComponent from "../../../Common/components/MapComponent";

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
import SubBusinessContact from "./SubBusinessContact";

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
      tollFreeNumber: "",
      latitude: 27.7172453,
      longitude: 85.32391758465576,
      contactPerson: []
    };

    this.countries = [];
    this.states = [];
    this.districts = [];
    this.cities = [];
    this.areas = [];

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
    const { address } = nextProps;

    console.log("props addres: ", nextProps);
    return address && nextProps.edit
      ? {
          contactPerson: address.contactPerson ? address.contactPerson : [],
          landlineNumber: address.landlineNumber ? address.landlineNumber : "",
          otherLandlineNumber: address.otherLandlineNumber
            ? address.otherLandlineNumber
            : "",
          house_no: address.house_no ? address.house_no : "",
          landmark: address.landmark ? address.landmark : "",
          addressLine1: address.addressLine1 ? address.addressLine1 : "",
          addressLine2: address.addressLine2 ? address.addressLine2 : "",
          po_box: address.po_box ? address.po_box : "",
          tollFreeNumber: address.tollFreeNumber ? address.tollFreeNumber : "",
          email: address.email ? address.email : "",
          country: {
            id: address.country ? address.country.id : "",
            name: address.country ? address.country.name : ""
          },
          state: {
            id: address.state ? address.state.id : "",
            name: address.state ? address.state.name : ""
          },
          district: {
            id: address.district ? address.district.id : "",
            name: address.district ? address.district.name : ""
          },
          city: {
            id: address.city ? address.city.id : "",
            name: address.city ? address.city.name : ""
          },
          area: {
            id: address.area ? address.area.id : "",
            name: address.area ? address.area.name : ""
          }
        }
      : null;
  };

  getContacts = () =>
    this.props.address && this.props.edit
      ? this.props.address.contactPerson
      : null;

  onChange = (key, event) => {
    if (key === "landmark" || "addressLine1" || "addressLine2") {
      this.setState({
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      });
    } else {
      this.setState({ [key]: event.target.value });
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

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    console.log("access token in this case: ", this.access_token);
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
      this.districts = [];
      this.cities = [];
      this.areas = [];
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
      this.cities = [];
      this.areas = [];
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
      this.areas = [];
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
      tollFreeNumber: "",
      contactPerson: []
    });

    // this.subBusinessContactWrapperRef.clearState();
  };

  onContactPersonAdd = () => {
    this.setState({
      contactPerson: [
        ...this.state.contactPerson,
        {
          name: "",
          email: "",
          designation: "",
          mobileNumber: "",
          department: "",
          collapsed: false
        }
      ]
    });
  };

  onContactChange = (index, data) => {
    console.log("herau: ", index, data);
    const newContactPerson = this.state.contactPerson.map(
      (contact, sub_index) => {
        return index !== sub_index ? contact : { ...contact, ...data };
      }
    );

    this.setState({ contactPerson: newContactPerson });
  };

  onContactDelete = index => () => {
    this.setState({
      contactPerson: this.state.contactPerson.filter(
        (contact, sub_index) => index !== sub_index
      )
    });
  };

  getState = () => {
    console.log("eachItem PRIMARY: ", this.state);
    let contactPerson = this.state.contactPerson.map(eachItem => {
      let contactReformed = {};
      for (var property in eachItem) {
        contactReformed =
          eachItem[property] !== "" &&
          eachItem[property] !== null &&
          eachItem[property] !== undefined &&
          eachItem[property].length > 0
            ? { ...contactReformed, [property]: eachItem[property] }
            : contactReformed;
      }
      return contactReformed;
    });
    console.log("contact contactReformed: ", contactPerson);
    contactPerson = contactPerson.length > 0 ? contactPerson : undefined;

    const temp = {
      ...this.state,
      country: this.state.country ? this.state.country.id : "",
      state: this.state.state ? this.state.state.id : "",
      district: this.state.district ? this.state.district.id : "",
      city: this.state.city ? this.state.city.id : "",
      area: this.state.area ? this.state.area.id : ""
    };

    console.log("temp: ", temp);
    let reformed = {};

    for (var property in temp) {
      console.log("property: ", property);
      reformed =
        temp[property] !== "" &&
        temp[property] !== null &&
        temp[property] !== undefined
          ? { ...reformed, [property]: temp[property] }
          : reformed;
    }

    console.log("primary address reformed: ", reformed);
    return {
      address: {
        ...reformed,
        contactPerson
        // ...this.subBusinessContactWrapperRef.getState()
      }
    };
  };

  render() {
    // console.log("primasdd addr props: ", this.props);
    // console.log("primasdd addr state: ", this.state);
    // console.log("primasdd addr contact state: ", this.state.contactPerson);
    this.countries = this.props.countries;

    try {
      this.states = this.props.countries
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
                        this.areas = city.areas;
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
      this.areas = [];
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
                      options={this.countries}
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
                      options={this.states}
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
                      options={this.districts}
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
                      options={this.cities}
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
                      onChange={this.handleAreaSelectChange.bind(this)}
                      options={this.areas}
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
                <Col xs="12" md="12">
                  <Card className="p-3">
                    <strong className="mb-2">
                      Select your Business Location from the map displayed below
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
              <div className="animated fadeIn">
                <Card>
                  <CardHeader onClick={this.toggleCollapse}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <strong>Contact Person Details</strong>
                      <Button
                        color="primary"
                        onClick={this.toggleCollapse}
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
                        {!this.state.collapsed ? (
                          <i className="fa fa-angle-up" />
                        ) : (
                          <i className="fa fa-angle-down" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <Collapse isOpen={!this.state.collapsed}>
                    <CardBody>
                      {this.state.contactPerson.map((contact, index) => (
                        <SubBusinessContact
                          contact={contact}
                          key={index}
                          id={index}
                          onContactChange={this.onContactChange.bind(
                            this,
                            index
                          )}
                          onContactDelete={this.onContactDelete(index)}
                          edit={this.props.edit}
                        />
                      ))}
                      <Row style={{ marginTop: 15 }}>
                        <Col xs="6" md="6">
                          <Button
                            color="primary"
                            onClick={this.onContactPersonAdd}
                          >
                            <i className="fa fa-plus" /> Add New Contact
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
              </div>

              {/* <SubBusinessContactWrapper
                ref={ref => (this.subBusinessContactWrapperRef = ref)}
                contactPerson={this.getContacts()}
                edit
              /> */}
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessPrimaryAddress;
