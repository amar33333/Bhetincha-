import React, { Component } from "react";

import Select from "react-select";
import { toast } from "react-toastify";

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

// import SubBusinessContactWrapper from "./SubBusinessContactWrapper.js";
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
      latitude: 27.7172455,
      longitude: 85.32877,
      contactPerson: []
    };

    this.countries = [];
    this.states = [];
    this.districts = [];
    this.cities = [];
    this.areas = [];

    this.propsData = {};
  }
  onChangeLatLng = ({ latLng }) => {
    // console.log("latLang: ", this.state.latitude, this.state.longitude);
    this.setState({ latitude: latLng.lat(), longitude: latLng.lng() });
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { address } = nextProps;

    // console.log("props addres: ", nextProps);
    // console.log(" toogle addres : ", nextProps);
    // console.log("primary toogle before called: ", nextProps.EDIT);
    if (!nextProps.businessGet && address && nextProps.EDIT) {
      // console.log("initial state loaded: ", prevState);
      // console.log("primary toogle  success called: ", nextProps.EDIT);
      // nextProps.ToogleEDIT(!nextProps.EDIT);
      // console.log("asddd: ", address);
      nextProps.onInitialPropsReceived();

      return {
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
        latitude:
          address.latitude && !isNaN(address.latitude)
            ? Number(address.latitude)
            : 27.7172453,
        longitude:
          address.longitude && !isNaN(address.longitude)
            ? Number(address.longitude)
            : 85.32391758465576,
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
      };
    } else {
      // console.log("new initial state not loaded");
      return null;
    }
  };

  // getContacts = () =>
  //   this.props.address && this.props.edit
  //     ? this.props.address.contactPerson
  //     : null;

  onChange = (key, event) => {
    if (key === "addressLine1" || key === "addressLine2") {
      this.setState({
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      });
    } else {
      this.setState({ [key]: event.target.value });
    }
  };

  handleAreaSelectChange = value => {
    // console.log("Value: ", value.name);
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
        // console.log("latLang: ", this.state.latitude, this.state.longitude);
      } else {
        // console.log("Location not found in map. Select Manually");
      }
    });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    // console.log("access token in this case: ", this.access_token);
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

  onContactSave = (index, data) => {
    // console.log("herau: ", index, data);
    const newContactPerson = this.state.contactPerson.map(
      (contact, sub_index) => {
        return index !== sub_index ? contact : { ...contact, ...data };
      }
    );

    this.setState({ contactPerson: newContactPerson }, () => {
      // toast.success(`Contact - ${index + 1} Saved Successfully`);
    });
  };

  // DO NOT DELETE THIS COMMENTED CODE

  // onContactDelete(index) {
  //   return () => {
  //     this.setState(
  //       {
  //         contactPerson: this.state.contactPerson.filter(
  //           (contact, sub_index) => index !== sub_index
  //         )
  //       },
  //       () => toast.success(`Contact - ${index + 1} Deleted Successfully`)
  //     );
  //   };
  // }

  onContactDelete = index => () => {
    this.setState(
      {
        contactPerson: this.state.contactPerson.filter(
          (contact, sub_index) => index !== sub_index
        )
      },
      () => toast.success(`Contact - ${index + 1} Deleted Successfully`)
    );
  };

  getState = () => {
    // console.log("eachItem PRIMARY: ", this.state);
    // let contactPerson = this.state.contactPerson.map(eachItem => {
    //   let contactReformed = {};
    //   for (var property in eachItem) {
    //     contactReformed =
    //       eachItem[property] !== "" &&
    //       eachItem[property] !== null &&
    //       eachItem[property] !== undefined &&
    //       eachItem[property].length > 0
    //         ? { ...contactReformed, [property]: eachItem[property] }
    //         : contactReformed;
    //   }
    //   return contactReformed;
    // });
    // console.log("contact contactReformed: ", contactPerson);
    // contactPerson = contactPerson.length > 0 ? contactPerson : undefined;

    // const temp = {
    //   ...this.state,
    //   country: this.state.country ? this.state.country.id : "",
    //   state: this.state.state ? this.state.state.id : "",
    //   district: this.state.district ? this.state.district.id : "",
    //   city: this.state.city ? this.state.city.id : "",
    //   area: this.state.area ? this.state.area.id : ""
    // };

    // console.log("temp: ", temp);
    // let reformed = {};

    // for (var property in temp) {
    //   console.log("property: ", property);
    //   reformed =
    //     temp[property] !== "" &&
    //     temp[property] !== null &&
    //     temp[property] !== undefined
    //       ? { ...reformed, [property]: temp[property] }
    //       : reformed;
    // }

    // console.log("primary address reformed: ", reformed);
    // return {
    //   address: {
    //     ...reformed,
    //     contactPerson
    //     // ...this.subBusinessContactWrapperRef.getState()
    //   }
    // };

    return {
      address: {
        ...this.state,
        country: this.state.country ? this.state.country.id : "",
        state: this.state.state ? this.state.state.id : "",
        district: this.state.district ? this.state.district.id : "",
        city: this.state.city ? this.state.city.id : "",
        area: this.state.area ? this.state.area.id : ""
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

    // console.log("states: ", this.states);

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
          <CardHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>Business Primary Address</strong>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" md="12">
                <Row>
                  <Col xs="12" md="4">
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="Country">Country</Label>
                          <Select
                            required={
                              this.props.requiredParams &&
                              this.props.requiredParams.country
                            }
                            name="Country"
                            placeholder="Select a Country"
                            noResultsText="No Data Found"
                            value={valuePrimaryCountry}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "country"
                            )}
                            options={this.countries}
                            valueKey="id"
                            labelKey="name"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label for="State">State</Label>
                          <Select
                            required={
                              this.props.requiredParams &&
                              this.props.requiredParams.state
                            }
                            name="State"
                            placeholder="Select a State"
                            noResultsText="No Data Found"
                            value={valuePrimaryState}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "state"
                            )}
                            options={this.states}
                            valueKey="id"
                            labelKey="name"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label for="District">District</Label>
                          <Select
                            required={
                              this.props.requiredParams &&
                              this.props.requiredParams.district
                            }
                            name="District"
                            placeholder="Select a District"
                            noResultsText="No Data Found"
                            value={valuePrimaryDistrict}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "district"
                            )}
                            options={this.districts}
                            valueKey="id"
                            labelKey="name"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label for="City">City</Label>
                          <Select
                            required={
                              this.props.requiredParams &&
                              this.props.requiredParams.city
                            }
                            name="City"
                            placeholder="Select a City"
                            noResultsText="No Data Found"
                            value={valuePrimaryCity}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "city"
                            )}
                            options={this.cities}
                            valueKey="id"
                            labelKey="name"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="Area">Area</Label>
                          <Select
                            required={
                              this.props.requiredParams &&
                              this.props.requiredParams.area
                            }
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
                    </Row>
                    <Row>
                      <Col>
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
                  </Col>
                  <Col xs="12" md="8">
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
                  </Col>
                </Row>
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
                <CardHeader>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <strong>Contact Person Details</strong>
                  </div>
                </CardHeader>
                <CardBody>
                  {this.state.contactPerson.map((contact, index) => (
                    <SubBusinessContact
                      contact={contact}
                      key={index}
                      id={index}
                      onContactSave={this.onContactSave.bind(this, index)}
                      onContactDelete={this.onContactDelete(index)}
                    />
                  ))}
                  <Row style={{ marginTop: 15 }}>
                    <Col xs="6" md="6">
                      <Button color="primary" onClick={this.onContactPersonAdd}>
                        <i className="fa fa-plus" /> Add New Contact
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

            {/* <SubBusinessContactWrapper
                ref={ref => (this.subBusinessContactWrapperRef = ref)}
                contactPerson={this.getContacts()}
                edit
              /> */}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessPrimaryAddress;
