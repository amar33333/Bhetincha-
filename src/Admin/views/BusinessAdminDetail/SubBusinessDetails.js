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

import {
  validatePhone,
  validateEmail,
  validateWebsiteURL,
  ErrorHandling
} from "../../../Common/utils/Extras";

class SubBusinessDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business_name: "",
      business_email: null,
      business_phone: null,
      website: "",
      industry: null,
      categories: [],
      sub_categories: [],
      paymentMethod: [],
      phone_validation_error: false,
      email_validation_error: false,
      website_url_validation_error: false
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  static getDerivedStateFromProps = nextProps => {
    const { businessData } = nextProps;

    if (!nextProps.businessGet && businessData && nextProps.EDIT) {
      nextProps.onInitialPropsReceived();

      return {
        business_name: businessData.business_name
          ? businessData.business_name
          : "",
        business_phone: businessData.business_phone
          ? businessData.business_phone
          : null,
        phone_validation_error: businessData.business_phone
          ? !validatePhone(businessData.business_phone)
          : false,

        business_email: businessData.business_email
          ? businessData.business_email
          : null,
        email_validation_error: businessData.business_email
          ? !validateEmail(businessData.business_email)
          : false,
        website: businessData.website ? businessData.website : "",
        website_url_validation_error: businessData.website
          ? !validateWebsiteURL(businessData.website)
          : false,
        industry: businessData.industry
          ? { id: businessData.industry.id, name: businessData.industry.name }
          : null,
        categories: businessData.categories
          ? businessData.categories.map(each => ({
              id: each.id,
              name: each.name
            }))
          : [],
        sub_categories: businessData.sub_categories
          ? businessData.sub_categories.map(each => ({
              id: each.id,
              name: each.name
            }))
          : [],
        paymentMethod: businessData.paymentMethod
          ? businessData.paymentMethod.map(each => ({
              id: each.id,
              name: each.name
            }))
          : []
      };
    }
    return null;
  };

  doesInclude = (array, obj) => {
    let result = false;

    array.find(each => {
      if (each.id === obj.id) {
        result = true;
      }
    });

    return result;
  };

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "business_name") {
      let newBusinessName = val.replace(/\b\w/g, l => l.toUpperCase());
      this.setState({
        [key]: newBusinessName
      });
    } else if (key === "business_email") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (
          this.state.business_email &&
          !validateEmail(this.state.business_email)
        ) {
          this.setState({ email_validation_error: true });
        } else this.setState({ email_validation_error: false });
      });
    } else if (key === "business_phone") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (
          this.state.business_phone &&
          !validatePhone(this.state.business_phone)
        ) {
          this.setState({ phone_validation_error: true });
        } else this.setState({ phone_validation_error: false });
      });
    } else if (key === "website") {
      this.setState({ [key]: val }, () => {
        if (this.state.website && !validateWebsiteURL(this.state.website)) {
          this.setState({ website_url_validation_error: true });
        } else this.setState({ website_url_validation_error: false });
      });
    } else {
      this.setState({
        [key]: val
      });
    }
  };

  displayPhoneValidationInfo = () => {
    if (this.state.business_phone)
      if (this.state.phone_validation_error)
        return <p style={{ color: "red" }}>Invalid Phone Number</p>;
      else return <p style={{ color: "green" }}>Phone Number Valid</p>;
  };

  displayEmailValidationInfo = () => {
    if (this.state.business_email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
  };

  displayWebsiteURLValidationInfo = () => {
    if (this.state.website)
      if (this.state.website_url_validation_error)
        return <p style={{ color: "red" }}>Invalid Website URL</p>;
      else return <p style={{ color: "green" }}>Valid Website URL </p>;
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });

    if (key === "industry") {
      this.setState({ categories: [], sub_categories: [] });

      if (value) {
        this.props.onUnmountIndustryData();
        this.props.onUnmountCategoryData();

        this.props.onIndustryEachList({
          id: value.id,
          access_token: this.access_token
        });
      } else {
      }

      if (!value) {
        this.props.onUnmountIndustryData();
        this.props.onUnmountCategoryData();
      }
      // No use
      // this.props.onUnmountSubCategories();
    } else if (key === "categories") {
      // this.setState({ sub_categories: [] });

      let diff = {};
      let ADDED = false;

      if (value.length > this.state.categories.length) {
        for (let i = 0; i < value.length; i++) {
          if (!this.doesInclude(this.state.categories, value[i])) {
            // console.log("unique found");
            diff = value[i];
            ADDED = true;
          }
        }
      } else {
        for (let i = 0; i < this.state.categories.length; i++) {
          if (!this.doesInclude(value, this.state.categories[i])) {
            // console.log("unique found: ");
            diff = this.state.categories[i];
            ADDED = false;
          }
        }
      }

      if (ADDED) {
        this.props.onCategoryEachList({
          id: diff.id,
          access_token: this.access_token
        });
      } else {
        if (diff) this.props.onRemoveCategoryData({ obj: diff });
      }
    }
  };

  clearState = () => {
    this.setState({
      business_name: "",
      business_phone: null,
      business_email: null,
      website: "",
      industry: null,
      categories: [],
      sub_categories: [],
      paymentMethod: [],
      phone_validation_error: false
    });
  };

  getState = () => {
    const category_list = this.state.categories.map(category => category.id);

    const sub_category_list = this.state.sub_categories.map(
      sub_category => sub_category.id
    );

    const payment_methods_list = this.state.paymentMethod.map(
      payment_method => payment_method.id
    );

    // return {
    //   ...this.state,
    //   categories: category_list,
    //   sub_categories: sub_category_list,
    //   paymentMethod: payment_methods_list,
    //   industry: this.state.industry ? this.state.industry.id : undefined,
    //   business_email: this.state.business_email
    //     ? this.state.business_email
    //     : undefined,
    //   website: this.state.website ? this.state.website : undefined,
    //   business_phone: this.state.business_phone
    //     ? this.state.business_phone
    //     : undefined
    // };

    return {
      ...this.state,
      industry: this.state.industry ? this.state.industry.id : null,
      categories: category_list,
      sub_categories: sub_category_list,
      paymentMethod: payment_methods_list
      // business_email: undefined
    };
  };

  render() {
    const industries = this.props.industries;

    const categories =
      this.state.industry && this.props.industryData
        ? this.props.industryData.categories
        : [];

    let subCategories = [];

    if (
      this.state.industry &&
      this.state.categories.length &&
      this.props.categoryData &&
      this.props.categoryData.length
    ) {
      this.props.categoryData.map(each => {
        subCategories = [...subCategories, ...each.subcategories];
      });
    }

    const paymentMethods = this.props.payment_methods;

    const { paymentMethod } = this.state;
    const valuePaymentMethod = paymentMethod;

    const { industry } = this.state;
    const valueIndustry = industry && industry.id;

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
              <strong>Business Detail</strong>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" md="6">
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
                <ErrorHandling
                  error={
                    this.props.businessCreateErrors &&
                    this.props.businessCreateErrors.business_name
                  }
                />
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="bphone">Business Phone</Label>
                  <Input
                    type="text"
                    placeholder="Mobile Number Eg. 9843041699, (984)-3041699"
                    value={this.state.business_phone}
                    onChange={this.onChange.bind(this, "business_phone")}
                    onKeyDown={this._handleKeyPress}
                  />
                </FormGroup>
                {this.displayPhoneValidationInfo()}
                <ErrorHandling
                  error={
                    this.props.businessCreateErrors &&
                    this.props.businessCreateErrors.abusiness_phone
                  }
                />
                {
                  // For Business Dashboard
                }
                <ErrorHandling
                  error={
                    this.props.businessDetailsEditErrors &&
                    this.props.businessDetailsEditErrors.abusiness_phone
                  }
                />
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="business_email">Business Email</Label>
                  <Input
                    //required
                    type="text"
                    value={this.state.business_email}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "business_email")}
                  />
                </FormGroup>
                {this.displayEmailValidationInfo()}
                <ErrorHandling
                  error={
                    this.props.businessCreateErrors &&
                    this.props.businessCreateErrors.business_email
                  }
                />
                {
                  // For Business Dashboard
                }
                <ErrorHandling
                  error={
                    this.props.businessDetailsEditErrors &&
                    this.props.businessDetailsEditErrors.business_email
                  }
                />
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="website">Business Website</Label>
                  <Input
                    //required
                    type="text"
                    value={this.state.website}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "website")}
                  />
                </FormGroup>
                {this.displayWebsiteURLValidationInfo()}
                <ErrorHandling
                  error={
                    this.props.businessCreateErrors &&
                    this.props.businessCreateErrors.business_website
                  }
                />
                {
                  // For Business Dashboard
                }
                <ErrorHandling
                  error={
                    this.props.businessDetailsEditErrors &&
                    this.props.businessDetailsEditErrors.business_website
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="group">Business Industry</Label>
                  <Select
                    required
                    name="Industry"
                    placeholder="Select an Industry"
                    noResultsText="No Data Found"
                    value={valueIndustry}
                    onChange={this.handleSelectChange.bind(this, "industry")}
                    options={industries}
                    tabSelectsValue={false}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
                <ErrorHandling
                  error={
                    this.props.businessCreateErrors &&
                    this.props.businessCreateErrors.industry
                  }
                />
                {
                  // For Business Dashboard
                }
                <ErrorHandling
                  error={
                    this.props.businessDetailsEditErrors &&
                    this.props.businessDetailsEditErrors.industry
                  }
                />
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="group">Business Category</Label>
                  <Select
                    required
                    name="Category"
                    placeholder="Select Category (Multiple if any)"
                    noResultsText="No Data Found"
                    value={this.state.categories}
                    onChange={this.handleSelectChange.bind(this, "categories")}
                    options={categories}
                    multi
                    tabSelectsValue={false}
                    //closeOnSelect={false}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
                <ErrorHandling
                  error={
                    this.props.businessCreateErrors &&
                    this.props.businessCreateErrors.categories
                  }
                />
                {
                  // For Business Dashboard
                }
                <ErrorHandling
                  error={
                    this.props.businessDetailsEditErrors &&
                    this.props.businessDetailsEditErrors.categories
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="group">Business Sub Category</Label>
                  <Select
                    name="Industry"
                    placeholder="Select Sub Category (Multiple if any)"
                    noResultsText="No Data Found"
                    multi
                    tabSelectsValue={false}
                    //removeSelected={false}
                    //closeOnSelect={false}
                    value={this.state.sub_categories}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "sub_categories"
                    )}
                    options={subCategories}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
                <ErrorHandling
                  error={
                    this.props.businessCreateErrors &&
                    this.props.businessCreateErrors.sub_categories
                  }
                />
                {
                  // For Business Dashboard
                }
                <ErrorHandling
                  error={
                    this.props.businessDetailsEditErrors &&
                    this.props.businessDetailsEditErrors.sub_categories
                  }
                />
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="group">Payment Methods</Label>
                  <Select
                    name="Payment Method"
                    multi
                    tabSelectsValue={false}
                    //closeOnSelect={false}
                    placeholder="Select Payment Methods (Multiple if any)"
                    noResultsText="No Data Found"
                    value={valuePaymentMethod}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "paymentMethod"
                    )}
                    options={paymentMethods}
                    valueKey="id"
                    labelKey="name"
                  />
                </FormGroup>
                <ErrorHandling
                  error={
                    this.props.businessCreateErrors &&
                    this.props.businessCreateErrors.paymentMethod
                  }
                />
                {
                  // For Business Dashboard
                }
                <ErrorHandling
                  error={
                    this.props.businessDetailsEditErrors &&
                    this.props.businessDetailsEditErrors.paymentMethod
                  }
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessDetail;
