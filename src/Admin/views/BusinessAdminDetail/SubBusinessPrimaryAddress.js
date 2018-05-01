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
      // collapsed: true
    };

    this.propsData = {};
    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  static getDerivedStateFromProps = (nextProps, prevState) =>
    nextProps.address && nextProps.edit
      ? {
          landlineNumber: nextProps.address.landline,
          house_no: nextProps.address.house_no,
          landmark: nextProps.address.landmark,
          addressLine1: nextProps.address.addressLine1,
          addressLine2: nextProps.address.addressLine2,
          po_box: nextProps.address.po_box,
          tollFreeNumber: nextProps.address.tollFreeNumber,
          email: nextProps.address.email,
          country: {
            id: nextProps.address.country.id,
            name: nextProps.address.country.name
          },
          state: {
            id: nextProps.address.state.id,
            name: nextProps.address.state.name
          },
          district: {
            id: nextProps.address.district.id,
            name: nextProps.address.district.name
          },
          city: {
            id: nextProps.address.city.id,
            name: nextProps.address.city.name
          },
          area: {
            id: nextProps.address.area.id,
            name: nextProps.address.area.name
          }
        }
      : null;

  getContacts = () =>
    this.props.address && this.props.edit
      ? this.props.address.contactPerson
      : null;

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

  // toggleCollapse = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // };
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
      // this.props.onUnmountDistrict();
      // this.props.onUnmountCity();
      // this.props.onUnmountArea();
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
      // this.props.onUnmountCity();
      // this.props.onUnmountArea();
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
      // this.props.onUnmountArea();
    } else if (key === "city" && value) {
      this.setState({
        area: ""
      });

      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
      // this.props.onUnmountSubCategories();
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

  getState = () => ({
    address: {
      ...this.state,
      area: this.state.area.id,
      city: this.state.city.id,
      district: this.state.district.id,
      state: this.state.state.id,
      country: this.state.country.id,
      ...this.subBusinessContactWrapperRef.getState()
    }
  });

  render() {
    //PRIMARY ADDRESS
    // console.log("address props: ", this.props);
    // console.log("address state: ", this.state);

    countries = this.props.countries;
    // console.log("coutrnri: ", countries);

    try {
      states = this.props.countries
        ? this.props.countries.find(country => {
            // console.log("cuontry states: ", country.id);
            // console.log("cu state id: ", this.state.country);

            if (country.id === this.state.country.id) {
              // console.log("COUNTRY FOND");
              return true;
            }
          }).states
        : [];
    } catch (error) {
      states = [];
    }

    // console.log("states found: ", states);

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

    // console.log("districts found: ", districts);

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

    // console.log("cities found: ", cities);

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

    // console.log("areas found: ", areas);

    // try {
    //   if (this.props.countries) {
    //     states = this.props.countries.find(country => {
    //       if (country.states) {
    //         districts = country.states.find(state => {
    //           if (state.districts) {
    //             cities = state.districts.find(district => {
    //               if (district.cities) {
    //                 areas = district.cities.find(city => {
    //                   return (
    //                     city.areas && city.id === this.state.city.id
    //                   );
    //                 }).areas;
    //               }
    //             }).cities;
    //           }
    //         }).districts;
    //       }
    //     }).states;
    //   }
    // } catch (error) {
    //   states = [];
    //   districts = [];
    //   cities = [];
    //   areas = [];
    // }
    // console.log("states found: ", states);
    // console.log("districts found: ", districts);
    // console.log("cities found: ", cities);
    // console.log("areas found: ", areas);

    // countries = this.props.countries
    //   ? this.props.countries.map(country => ({
    //       value: country.id,
    //       label: country.name
    //     }))
    //   : null;

    // states = this.props.countries
    //   ? this.props.countries.map(
    //       country =>
    //         country.states && country.id === this.state.country.value
    //           ? country.states.map(state => {
    //               console.log("estate: ", state);
    //               return {
    //                 value: state.id,
    //                 label: state.name
    //               };
    //             })
    //           : null
    //     )
    //   : null;

    // if (this.props.countries) {
    //   this.props.countries.map(country => {
    //     if (country.states && country.id === this.state.country.id) {
    //       states = country.states;
    //     } else states = [];
    //   });
    // }

    // console.log("states: ", states);

    // districts = this.props.stateData
    //   ? this.props.stateData.districts.map(district => {
    //       return { value: district.id, label: district.name };
    //     })
    //   : null;

    // cities = this.props.districtData
    //   ? this.props.districtData.cities.map(city => {
    //       return { value: city.id, label: city.name };
    //     })
    //   : null;

    // areas = this.props.cityData
    //   ? this.props.cityData.areas.map(area => {
    //       return { value: area.id, label: area.name };
    //     })
    //   : null;

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
                <Col xs="12" md="12">
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
              </Row>
              <Row>
                <Col xs="12" md="12">
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
              </Row>
              <Row>
                <Col xs="12" md="12">
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
                <Col xs="12" md="12">
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
              </Row>
              <Row>
                <Col xs="12" md="12">
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
              </Row>
              <Row>
                <Col xs="12" md="12">
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
              </Row>
              <Row>
                <Col xs="6" md="6">
                  <FormGroup>
                    <Label for="bname">Landline Number</Label>
                    <Input
                      type="text"
                      value={this.state.landlineNumber}
                      onChange={this.onChange.bind(this, "landlineNumber")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
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
                  <FormGroup>
                    <Label for="bname">House No.</Label>
                    <Input
                      type="text"
                      value={this.state.house_no}
                      onChange={this.onChange.bind(this, "house_no")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="bname">Landmark</Label>
                    <Input
                      type="text"
                      value={this.state.landmark}
                      onChange={this.onChange.bind(this, "landmark")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="bname">Address Line 1</Label>
                    <Input
                      type="text"
                      value={this.state.addressLine1}
                      onChange={this.onChange.bind(this, "addressLine1")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="bname">Address Line 2</Label>
                    <Input
                      type="text"
                      value={this.state.addressLine2}
                      onChange={this.onChange.bind(this, "addressLine2")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="bname">Post Box No.</Label>
                    <Input
                      type="text"
                      value={this.state.po_box}
                      onChange={this.onChange.bind(this, "po_box")}
                      onKeyDown={this._handleKeyPress}
                    />
                  </FormGroup>
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
                /* onSubmit={this.propsDataCallback} */
              />
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessPrimaryAddress;
