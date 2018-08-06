import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Button,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

import Select from "react-select";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

import {
  onIndividualPersonalDetailsList,
  onIndividualPersonalDetailsEdit,
  onCountryList,
  onCountryEachList,
  onStateEachList,
  onDistrictEachList,
  onCityEachList,
  ToogleEDIT
} from "../actions";

import {
  ErrorHandling,
  validateEmail,
  validatePhone
} from "../../Common/utils/Extras";

class PersonalDetails extends Component {
  state = {
    // Personal Details
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",

    // Address
    country: "",
    state: "",
    district: "",
    city: "",
    area: "",

    phone_validation_error: false,
    email_validation_error: false
  };

  componentDidMount() {
    this.props.ToogleEDIT(true);
    this.props.onCountryList();
    this.props.onIndividualPersonalDetailsList({
      id: this.props.individual_id
    });
  }

  componentDidUpdate = prevProps => {
    if (this.props.personal_details !== prevProps.personal_details) {
      if (
        !this.props.personal_details_get &&
        this.props.personal_details &&
        this.props.EDIT
      ) {
        this.props.ToogleEDIT(!this.props.EDIT);
        this.setState({
          // Personal Details
          email: this.props.personal_details.email,
          first_name: this.props.personal_details.first_name,
          last_name: this.props.personal_details.last_name,
          phone_number: this.props.personal_details.phone_number,
          gender: this.props.personal_details.gender,
          date_of_birth: moment(this.props.personal_details.date_of_birth),

          // Address
          country: this.props.personal_details.address
            ? this.props.personal_details.address.country
            : "",
          state: this.props.personal_details.address
            ? this.props.personal_details.address.state
            : "",
          district: this.props.personal_details.address
            ? this.props.personal_details.address.district
            : "",
          city: this.props.personal_details.address
            ? this.props.personal_details.address.city
            : "",
          area: this.props.personal_details.address
            ? this.props.personal_details.address.area
            : ""
        });
      }
    }
  };

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "email") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (this.state.email && !validateEmail(this.state.email)) {
          this.setState({ email_validation_error: true });
        } else this.setState({ email_validation_error: false });
      });
    } else if (key === "phone_number") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (
          this.state.phone_number &&
          !validatePhone(this.state.phone_number)
        ) {
          this.setState({ phone_validation_error: true });
        } else this.setState({ phone_validation_error: false });
      });
    } else this.setState({ [key]: val });
  };

  displayPhoneValidationInfo = () => {
    if (this.state.phone_number)
      if (this.state.phone_validation_error)
        return <p style={{ color: "red" }}>Invalid Phone Number</p>;
      else return <p style={{ color: "green" }}>Phone Number Valid</p>;
  };

  displayEmailValidationInfo = () => {
    if (this.state.email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({ state: "", district: "", city: "", area: "" });
      value && this.props.onCountryEachList({ id: value.id });
    } else if (key === "state") {
      this.setState({ district: "", city: "", area: "" });
      value && this.props.onStateEachList({ id: value.id });
    } else if (key === "district") {
      this.setState({ city: "", area: "" });
      value && this.props.onDistrictEachList({ id: value.id });
    } else if (key === "city") {
      this.setState({ area: "" });
      value && this.props.onCityEachList({ id: value.id });
    }
  };

  onFormSubmit = event => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      email,
      gender,
      date_of_birth,
      phone_number,
      phone_validation_error,
      email_validation_error,
      country,
      state,
      district,
      city,
      area
    } = this.state;

    if (!phone_validation_error && !email_validation_error)
      this.props.onIndividualPersonalDetailsEdit({
        id: this.props.individual_id,
        body: {
          first_name,
          last_name,
          email,
          gender,
          phone_number,
          address: {
            country: country ? country.id : null,
            state: state ? state.id : null,
            district: district ? district.id : null,
            city: city ? city.id : null,
            area: area ? area.id : null
          },
          date_of_birth: moment(date_of_birth).format("YYYY-MM-DDTHH:mmZ")
        }
      });
  };

  render() {
    console.log("state: ", this.state);

    console.log("props: ", this.props);
    return (
      <div className="animated fadeIn">
        <form onSubmit={this.onFormSubmit}>
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
                <strong>Personal Details</strong>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="First Name">First Name</Label>
                    <Input
                      required
                      type="text"
                      value={this.state.first_name}
                      onChange={this.onChange.bind(this, "first_name")}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  {" "}
                  <FormGroup>
                    <Label for="Last Name">Last Name</Label>
                    <Input
                      type="text"
                      value={this.state.last_name}
                      onChange={this.onChange.bind(this, "last_name")}
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
                      onChange={this.onChange.bind(this, "email")}
                    />
                  </FormGroup>
                  {this.displayEmailValidationInfo()}
                  <ErrorHandling
                    error={
                      this.props.personal_details_error &&
                      this.props.personal_details_error.email
                    }
                  />
                </Col>
                {/* <Col xs="12" md="4">
                <FormGroup>
                  <Label for="Desgination">Designation</Label>
                  <Input
                    type="text"
                    value={this.state.designation}
                    onChange={this.onChange.bind(this, "designation")}
                  />
                </FormGroup>
              </Col> */}
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label for="Mobile Number">Mobile Number</Label>
                    <Input
                      type="text"
                      value={this.state.phone_number}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "phone_number")}
                    />
                  </FormGroup>
                  {this.displayPhoneValidationInfo()}
                  <ErrorHandling
                    error={
                      this.props.personal_details_error &&
                      this.props.personal_details_error.aphone_number
                    }
                  />
                </Col>
                <FormGroup>
                  <Label for="gender">Gender </Label>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      className="radio"
                      value="Male"
                      onChange={this.onChange.bind(this, "gender")}
                      checked={this.state.gender === "Male"}
                    />{" "}
                    Male
                    <input
                      type="radio"
                      className="radio"
                      name="gender"
                      value="Female"
                      onChange={this.onChange.bind(this, "gender")}
                      checked={this.state.gender === "Female"}
                    />{" "}
                    Female
                    <input
                      type="radio"
                      className="radio"
                      name="gender"
                      value="Other"
                      onChange={this.onChange.bind(this, "gender")}
                      checked={this.state.gender === "Other"}
                    />{" "}
                    Other
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label>Date of Birth</Label>
                  <Datetime
                    //disabled={this.props.loading}
                    value={this.state.date_of_birth}
                    onChange={time => {
                      this.setState({
                        date_of_birth: moment(time)
                      });
                    }}
                    timeFormat={false}
                    // utc={true}
                    disableOnClickOutside={false}
                  />
                </FormGroup>
              </Row>
            </CardBody>
          </Card>

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
                <strong>Address</strong>
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
                              value={this.state.country}
                              onChange={this.handleSelectChange.bind(
                                this,
                                "country"
                              )}
                              options={this.props.countries}
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
                              value={this.state.state}
                              onChange={this.handleSelectChange.bind(
                                this,
                                "state"
                              )}
                              options={
                                this.state.country ? this.props.states : []
                              }
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
                              value={this.state.district}
                              onChange={this.handleSelectChange.bind(
                                this,
                                "district"
                              )}
                              options={
                                this.state.state ? this.props.districts : []
                              }
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
                              value={this.state.city}
                              onChange={this.handleSelectChange.bind(
                                this,
                                "city"
                              )}
                              options={
                                this.state.district ? this.props.cities : []
                              }
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
                              value={this.state.area}
                              onChange={this.handleSelectChange.bind(
                                this,
                                "area"
                              )}
                              options={this.state.city ? this.props.areas : []}
                              valueKey="id"
                              labelKey="name"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Row>
            <Col xs="12">
              <Button color="primary" size="lg" style={{ marginRight: 20 }}>
                SAVE
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default connect(
  ({
    auth: {
      cookies: {
        user_data: { individual_id }
      }
    },
    IndividualContainer: { name_of_reducer, personal_details }
  }) => ({
    name_of_reducer,
    ...personal_details,

    individual_id
  }),
  {
    onIndividualPersonalDetailsList,
    onIndividualPersonalDetailsEdit,
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onCityEachList,
    ToogleEDIT
  }
)(PersonalDetails);
