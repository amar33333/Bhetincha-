import React, { Component } from "react";
import { connect } from "react-redux";

import Select from "react-select";

import FileBase64 from "react-file-base64";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Label,
  FormGroup
} from "reactstrap";

import {
  onBusinessCreate,
  onIndustryList,
  onIndustryEachList,
  onCategoryEachList,
  onUnmountSubCategories,
  onCountryList,
  onCountryEachList,
  onStateEachList,
  onDistrictEachList,
  onCityEachList,
  onUnmountArea,
  onUnmountCity,
  onUnmountDistrict,
  onPaymentMethodsList,
  onCompanyTypeList
} from "../../actions";

class BusinessAdminDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business_name: "",
      business_tagline: "",
      first_name: "",
      last_name: "",
      username: "",
      business_email: "",
      password: "",
      industry: "",
      category: "",
      sub_category: [],
      primary_country: "",
      primary_state: "",
      primary_district: "",
      primary_city: "",
      primary_area: "",
      business_logo: [],
      business_cover_image: [],
      landline: "",
      other_landline_number: "",
      house_no: "",
      landmark: "",
      address_line_1: "",
      address_line_2: "",
      post_box: "",
      toll_free: "",
      contact_person_name: "",
      contact_person_email: "",
      contact_person_designation: "",
      contact_person_mobile_number: "",
      about_us_tagline: "",
      about_us: "",
      established_year: "",
      company_type: "",
      payment_method: []
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  componentWillMount() {
    this.props.onIndustryList({ access_token: this.access_token });
    this.props.onCountryList({ access_token: this.access_token });
    this.props.onPaymentMethodsList({ access_token: this.access_token });
    this.props.onCompanyTypeList({ access_token: this.access_token });
  }

  // Callback~
  getFiles = (key, files) => {
    this.setState({ [key]: files }, () => {
      console.log("files base64: ", this.state);
    });
  };

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = (key, value) => {
    console.log("vavas: ", key, value);
    this.setState({ [key]: value });
    if (key === "industry") {
      this.setState({ category: "", sub_category: [] });

      this.props.onIndustryEachList({
        id: value.value,
        access_token: this.access_token
      });
      this.props.onUnmountSubCategories();
    } else if (key === "category") {
      this.setState({ sub_category: [] });

      console.log("detaiL : ", key, value);
      this.props.onCategoryEachList({
        id: value.value,
        access_token: this.access_token
      });
    } else if (key === "primary_country") {
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
      this.props.onUnmountDistrict();
      this.props.onUnmountCity();
      this.props.onUnmountArea();
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
      this.props.onUnmountCity();
      this.props.onUnmountArea();
    } else if (key === "primary_district") {
      this.setState({
        primary_city: "",
        primary_area: ""
      });

      this.props.onDistrictEachList({
        id: value.value,
        access_token: this.access_token
      });
      this.props.onUnmountArea();
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

  onFormSubmit = event => {
    event.preventDefault();
    console.log("stte data: ", this.state);
    this.props.onBusinessCreate({
      data: this.state,
      access_token: this.access_token
    });
    this.clearState();
  };

  clearState = () =>
    this.setState({
      business_name: "",
      business_tagline: "",
      first_name: "",
      last_name: "",
      username: "",
      business_email: "",
      password: "",
      industry: "",
      category: "",
      sub_category: [],
      primary_country: "",
      primary_state: "",
      primary_district: "",
      primary_city: "",
      primary_area: "",
      business_logo: [],
      business_cover_image: [],
      landline: "",
      other_landline_number: "",
      house_no: "",
      landmark: "",
      address_line_1: "",
      address_line_2: "",
      post_box: "",
      toll_free: "",
      contact_person_name: "",
      contact_person_email: "",
      contact_person_designation: "",
      contact_person_mobile_number: "",
      about_us_tagline: "",
      about_us: "",
      established_year: "",
      company_type: "",
      payment_method: []
    });

  _handleKeyPress = event => {
    this.setState({ event });
    // // console.log('eventasdsa: ', this.state.event);

    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);

    if (
      (event.keyCode === 13 || event.keyCode === 40) &&
      form.elements[index].type !== "submit"
    ) {
      // // console.log('enter & down');

      form.elements[index + 1].focus();
      event.preventDefault();
    }

    if (event.keyCode === 38) {
      // // console.log('up');
      // const form = event.target.form;
      // const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index - 1].focus();
      // form.elements[index - 1].click();
      event.preventDefault();
    }
  };

  render() {
    const industries = this.props.data
      ? this.props.data.map(industry => {
          return { value: industry.id, label: industry.name };
        })
      : null;

    const categories =
      this.props.industryData && this.props.industryData.categories
        ? this.props.industryData.categories.map(category => {
            return { value: category.id, label: category.name };
          })
        : null;

    const subCategories =
      this.props.categoryData && this.props.categoryData.subcategories
        ? this.props.categoryData.subcategories.map(subCategory => {
            return { value: subCategory.id, label: subCategory.name };
          })
        : null;

    const paymentMethods = this.props.payment_methods
      ? this.props.payment_methods.map(paymentMethod => {
          return { value: paymentMethod.id, label: paymentMethod.name };
        })
      : null;

    const companyTypes = this.props.company_types
      ? this.props.company_types.map(companyType => {
          return { value: companyType.id, label: companyType.name };
        })
      : null;

    const { company_type } = this.state;
    const valueCompanyType = company_type && company_type.value;

    const { payment_method } = this.state;
    const valuePaymentMethod = payment_method;

    const { category } = this.state;
    const valueCategory = category && category.value;

    const { industry } = this.state;
    const valueIndustry = industry && industry.value;

    const { sub_category } = this.state;
    const valueSubCategory = sub_category;

    //PRIMARY ADDRESS
    const countries = this.props.countries
      ? this.props.countries.map(industry => {
          return { value: industry.id, label: industry.name };
        })
      : null;

    const states = this.props.countryData
      ? this.props.countryData.states.map(state => {
          return { value: state.id, label: state.name };
        })
      : null;

    const districts = this.props.stateData
      ? this.props.stateData.districts.map(district => {
          return { value: district.id, label: district.name };
        })
      : null;

    const cities = this.props.districtData
      ? this.props.districtData.cities.map(city => {
          return { value: city.id, label: city.name };
        })
      : null;

    const areas = this.props.cityData
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
        <Col>
          <Card>
            <CardHeader>
              <strong>Add New Business</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onFormSubmit}>
                <Card>
                  <CardHeader>
                    <strong>Business Details</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="bname">Business Name</Label>
                          <Input
                            autoFocus
                            required
                            type="text"
                            value={this.state.business_name}
                            onChange={this.onChange.bind(this, "business_name")}
                            onKeyDown={this._handleKeyPress}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="bname">Business Tagline</Label>
                          <Input
                            type="text"
                            value={this.state.business_tagline}
                            onChange={this.onChange.bind(
                              this,
                              "business_tagline"
                            )}
                            onKeyDown={this._handleKeyPress}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="group">Business Industry</Label>
                          <Select
                            required
                            name="Industry"
                            placeholder="Select an Industry"
                            noResultsText="No Data Found"
                            value={valueIndustry}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "industry"
                            )}
                            options={industries}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="group">Business Category</Label>
                          <Select
                            required
                            name="Industry"
                            placeholder="Select a Category"
                            noResultsText="No Data Found"
                            value={valueCategory}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "category"
                            )}
                            options={categories}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="group">Business Sub Category</Label>
                          <Select
                            required
                            name="Industry"
                            placeholder="Select Sub Category (Multiple if any)"
                            noResultsText="No Data Found"
                            multi
                            //removeSelected={false}
                            closeOnSelect={false}
                            value={valueSubCategory}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "sub_category"
                            )}
                            options={subCategories}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="business_email">Business_email</Label>
                          <Input
                            required
                            type="email"
                            value={this.state.business_email}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(
                              this,
                              "business_email"
                            )}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="group">Payment Methods</Label>
                          <Select
                            required
                            name="Payment Method"
                            multi
                            //removeSelected={false}
                            closeOnSelect={false}
                            placeholder="Select Payment Methods (Multiple if any)"
                            noResultsText="No Data Found"
                            value={valuePaymentMethod}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "payment_method"
                            )}
                            options={paymentMethods}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" md="6">
                        <FormGroup>
                          <Label for="fname">First Name</Label>
                          <Input
                            required
                            type="text"
                            value={this.state.first_name}
                            onChange={this.onChange.bind(this, "first_name")}
                            innerRef={input => {
                              this.nameInput = input;
                            }}
                            onKeyDown={this._handleKeyPress}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="6" md="6">
                        <FormGroup>
                          <Label for="lname">Last Name</Label>
                          <Input
                            required
                            type="text"
                            value={this.state.last_name}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(this, "last_name")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="6">
                        <FormGroup>
                          <Label for="username">Username</Label>
                          <Input
                            required
                            type="text"
                            value={this.state.username}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(this, "username")}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="6">
                        <FormGroup>
                          <Label for="pass">Password</Label>
                          <Input
                            required
                            type="password"
                            value={this.state.password}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(this, "password")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
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
                            type="text"
                            value={this.state.landline}
                            onChange={this.onChange.bind(this, "landline")}
                            onKeyDown={this._handleKeyPress}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="bname">OtherLandLineNumber</Label>
                          <Input
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
                            value={this.state.address_line_1}
                            onChange={this.onChange.bind(
                              this,
                              "address_line_1"
                            )}
                            onKeyDown={this._handleKeyPress}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="bname">Address Line 2</Label>
                          <Input
                            type="text"
                            value={this.state.address_line_2}
                            onChange={this.onChange.bind(
                              this,
                              "address_line_2"
                            )}
                            onKeyDown={this._handleKeyPress}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="bname">Post Box No.</Label>
                          <Input
                            type="text"
                            value={this.state.post_box}
                            onChange={this.onChange.bind(this, "post_box")}
                            onKeyDown={this._handleKeyPress}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="bname">Toll Free No.</Label>
                          <Input
                            type="text"
                            value={this.state.toll_free}
                            onChange={this.onChange.bind(this, "toll_free")}
                            onKeyDown={this._handleKeyPress}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <strong>Upload Business Logo</strong>
                  </CardHeader>
                  <CardBody>
                    <FileBase64
                      multiple={false}
                      onDone={this.getFiles.bind(this, "business_logo")}
                    />
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <strong>Upload Business Cover Image</strong>
                  </CardHeader>
                  <CardBody>
                    <FileBase64
                      multiple={false}
                      onDone={this.getFiles.bind(this, "business_cover_image")}
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <strong>Contact Person Details</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="Name">Full Name</Label>
                          <Input
                            required
                            type="text"
                            value={this.state.contact_person_name}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(
                              this,
                              "contact_person_name"
                            )}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="Email">Email</Label>
                          <Input
                            type="email"
                            value={this.state.contact_person_email}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(
                              this,
                              "contact_person_email"
                            )}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="Desgination">Designation</Label>
                          <Input
                            type="text"
                            value={this.state.contact_person_designation}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(
                              this,
                              "contact_person_designation"
                            )}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="Mobile Number">Mobile Number</Label>
                          <Input
                            type="text"
                            value={this.state.contact_person_mobile_number}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(
                              this,
                              "contact_person_mobile_number"
                            )}
                          />
                        </FormGroup>
                        {/* <FormGroup check>
                          <Label for="visible_to_public" check>
                            <Input type="checkbox" /> Visible To Public
                          </Label>
                        </FormGroup> */}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <strong>About Us</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="12">
                        <FormGroup>
                          <Label for="About_Tagline">Tagline</Label>
                          <Input
                            type="text"
                            value={this.state.about_us_tagline}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(
                              this,
                              "about_us_tagline"
                            )}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="about_us">About Us</Label>
                          <Input
                            type="text"
                            value={this.state.about_us}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(this, "about_us")}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="year">Established Year</Label>
                          <Input
                            type="text"
                            value={this.state.established_year}
                            onKeyDown={this._handleKeyPress}
                            onChange={this.onChange.bind(
                              this,
                              "established_year"
                            )}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="company_type">Company Type</Label>
                          <Select
                            required
                            name="Company Type"
                            placeholder="Select Your Company Type"
                            noResultsText="No Data Found"
                            value={valueCompanyType}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "company_type"
                            )}
                            options={companyTypes}
                          />
                        </FormGroup>
                        {/* <FormGroup check>
                          <Label for="visible_to_public" check>
                            <Input type="checkbox" /> Visible To Public
                          </Label>
                        </FormGroup> */}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Row>
                  <Col xs="12">
                    <Button
                      color="primary"
                      onKeyDown={this._handleKeyPress}
                      size="lg"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: { business_reducer, industries, categories, general_setup },
    auth
  }) => ({
    ...business_reducer,
    ...industries,
    ...categories,
    ...auth,
    ...general_setup
  }),
  {
    onBusinessCreate,
    onIndustryList,
    onIndustryEachList,
    onCategoryEachList,
    onUnmountSubCategories,
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onCityEachList,

    onUnmountArea,
    onUnmountCity,
    onUnmountDistrict,

    onPaymentMethodsList,
    onCompanyTypeList
  }
)(BusinessAdminDetail);
