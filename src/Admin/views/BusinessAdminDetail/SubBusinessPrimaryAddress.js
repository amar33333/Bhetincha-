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
      toll_free: "",
      collapse: false
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

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "primary_country" && value) {
      this.setState({
        primary_state: "",
        primary_district: "",
        primary_city: "",
        primary_area: ""
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
    } else if (key === "primary_state" && value) {
      this.setState({
        primary_district: "",
        primary_city: "",
        primary_area: ""
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
    } else if (key === "primary_district" && value) {
      this.setState({
        primary_city: "",
        primary_area: ""
      });

      this.props.onAddressTreeList({
        id: value.id,
        access_token: this.access_token,
        ADDRESS_KEY: key
      });
      areas = [];
      // this.props.onUnmountArea();
    } else if (key === "primary_city" && value) {
      this.setState({
        primary_area: ""
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

    this.subBusinessContactWrapperRef.clearState();
  };

  getState = () => ({
    ...this.state,
    ...this.subBusinessContactWrapperRef.getState()
  });

  render() {
    //PRIMARY ADDRESS

    countries = this.props.countries;

    try {
      states = this.props.countries
        ? this.props.countries.find(
            country =>
              country.states && country.id === this.state.primary_country.id
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
              if (state.districts && state.id === this.state.primary_state.id) {
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
                    district.id === this.state.primary_district.id
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
                      if (
                        city.areas &&
                        city.id === this.state.primary_city.id
                      ) {
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
    //                     city.areas && city.id === this.state.primary_city.id
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
    //         country.states && country.id === this.state.primary_country.value
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
    //     if (country.states && country.id === this.state.primary_country.id) {
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

    const { primary_country } = this.state;
    const valuePrimaryCountry = primary_country && primary_country.id;

    const { primary_state } = this.state;
    const valuePrimaryState = primary_state && primary_state.id;

    const { primary_district } = this.state;
    const valuePrimaryDistrict = primary_district && primary_district.id;

    const { primary_city } = this.state;
    const valuePrimaryCity = primary_city && primary_city.id;

    const { primary_area } = this.state;
    const valuePrimaryArea = primary_area && primary_area.id;

    return (
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
              <strong>Business Primary Address</strong>
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
                {this.state.collapse ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
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
                      value={valuePrimaryState}
                      onChange={this.handleSelectChange.bind(
                        this,
                        "primary_state"
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
                      value={valuePrimaryDistrict}
                      onChange={this.handleSelectChange.bind(
                        this,
                        "primary_district"
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
                      value={valuePrimaryCity}
                      onChange={this.handleSelectChange.bind(
                        this,
                        "primary_city"
                      )}
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
                      value={valuePrimaryArea}
                      onChange={this.handleSelectChange.bind(
                        this,
                        "primary_area"
                      )}
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
                      onChange={this.onChange.bind(
                        this,
                        "other_landline_number"
                      )}
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
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessPrimaryAddress;
