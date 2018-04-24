import React, { Component } from "react";

import { connect } from "react-redux";

import Select from "react-select";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  FormGroup
} from "reactstrap";

import {
  onIndustryList,
  onIndustryEachList,
  onCategoryEachList,
  onUnmountSubCategories,
  onPaymentMethodsList
} from "../../actions";

class SubBusinessDetail extends Component {
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
      payment_method: []
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  componentWillMount() {
    console.log("acces: ", this.access_token);
    this.props.onIndustryList({ access_token: this.access_token });
    this.props.onPaymentMethodsList({ access_token: this.access_token });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onSubmit) this.props.onSubmit(nextState);
  }

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
    }
  };

  clearState = () => {
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
      payment_method: []
    });
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

    const { payment_method } = this.state;
    const valuePaymentMethod = payment_method;

    const { category } = this.state;
    const valueCategory = category && category.value;

    const { industry } = this.state;
    const valueIndustry = industry && industry.value;

    const { sub_category } = this.state;
    const valueSubCategory = sub_category;

    return (
      <div className="animated fadeIn">
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
                    required
                    type="text"
                    value={this.state.business_tagline}
                    onChange={this.onChange.bind(this, "business_tagline")}
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
                    onChange={this.handleSelectChange.bind(this, "industry")}
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
                    onChange={this.handleSelectChange.bind(this, "category")}
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
                    onChange={this.onChange.bind(this, "business_email")}
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
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { business_reducer, industries, categories }, auth }) => ({
    ...auth,
    ...business_reducer,
    ...industries,
    ...categories
  }),
  {
    onIndustryList,
    onIndustryEachList,
    onCategoryEachList,
    onUnmountSubCategories,

    onPaymentMethodsList
  }
)(SubBusinessDetail);
