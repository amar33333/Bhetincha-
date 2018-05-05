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

class SubBusinessDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business_name: "",
      business_email: "",
      industry: "",
      categories: [],
      sub_categories: [],
      paymentMethod: []
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  static getDerivedStateFromProps = nextProps => {
    const { businessData } = nextProps;

    console.log("subbusiness detail props: ", nextProps);
    if (!nextProps.businessGet && businessData && nextProps.EDIT) {
      console.log("sbbusines detail: ", nextProps);
      nextProps.onInitialPropsReceived();
      console.log("sbbusines detail: ", nextProps);

      return {
        business_name: businessData.business_name
          ? businessData.business_name
          : "",
        business_email: businessData.business_email
          ? businessData.business_email
          : "",
        industry: businessData.industry
          ? { id: businessData.industry.id, name: businessData.industry.name }
          : "",
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
        paymentMethod: businessData.payment_method
          ? businessData.payment_method.map(each => ({
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
    if (key === "business_name") {
      let newBusinessName = event.target.value.replace(/\b\w/g, l =>
        l.toUpperCase()
      );
      this.setState({
        [key]: newBusinessName
      });
    } else {
      this.setState({ [key]: event.target.value });
    }
  };

  handleSelectChange = (key, value) => {
    console.log("vavas: ", key, value);
    this.setState({ [key]: value });

    if (key === "industry") {
      this.setState({ categories: [], sub_categories: [] });

      console.log("indsustr value: ", value);
      if (value) {
        console.log("indsutry each Called: ", value);

        this.props.onIndustryEachList({
          id: value.id,
          access_token: this.access_token
        });
      } else {
        console.log("indsutry each NOT called: ", value);
      }

      if (!value) {
        this.props.onUnmountIndustryData();
        this.props.onUnmountCategoryData();
      }
      // No use
      // this.props.onUnmountSubCategories();
    } else if (key === "categories") {
      console.log("categories state: ", this.state.categories);
      console.log("detaiL : ", key, value);

      this.setState({ sub_categories: [] });

      let diff = {};
      let ADDED = false;

      if (value.length > this.state.categories.length) {
        for (let i = 0; i < value.length; i++) {
          if (!this.doesInclude(this.state.categories, value[i])) {
            console.log("unique found");
            diff = value[i];
            ADDED = true;
          }
        }
      } else {
        for (let i = 0; i < this.state.categories.length; i++) {
          if (!this.doesInclude(value, this.state.categories[i])) {
            console.log("unique found: ");
            diff = this.state.categories[i];
            ADDED = false;
          }
        }
      }

      console.log("diff: ", diff);
      if (ADDED) {
        console.log("ADDED: ", ADDED);
        this.props.onCategoryEachList({
          id: diff.id,
          access_token: this.access_token
        });
      } else {
        console.log("ADDED: ", ADDED);

        if (diff) this.props.onRemoveCategoryData({ obj: diff });
      }
    }
  };

  clearState = () => {
    this.setState({
      business_name: "",
      business_email: "",
      industry: "",
      categories: [],
      sub_categories: [],
      paymentMethod: []
    });
  };

  getState = () => this.state;

  render() {
    // console.log("props subbusiness: ", this.props);
    // console.log("state subbusiness: ", this.state);

    const industries = this.props.industries;

    const categories =
      this.state.industry && this.props.industryData
        ? this.props.industryData.categories
        : [];

    let subCategories = [];
    // console.log("categoryData: ", this.props.categoryData);

    if (
      this.state.industry &&
      this.state.categories.length &&
      this.props.categoryData &&
      this.props.categoryData.length
    ) {
      this.props.categoryData.map(each => {
        // console.log("subca: ", each.subcategories);
        subCategories = [...subCategories, ...each.subcategories];
      });
    }

    // console.log("subcate: ", subCategories);

    const paymentMethods = this.props.payment_methods;

    const { paymentMethod } = this.state;
    const valuePaymentMethod = paymentMethod;

    const { industry } = this.state;
    const valueIndustry = industry && industry.id;

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
              <strong>Business Detail</strong>
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
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="business_email">Business Email</Label>
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
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="group">Business Industry</Label>
                    <Select
                      name="Industry"
                      placeholder="Select an Industry"
                      noResultsText="No Data Found"
                      value={valueIndustry}
                      onChange={this.handleSelectChange.bind(this, "industry")}
                      options={industries}
                      valueKey="id"
                      labelKey="name"
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="group">Business Category</Label>
                    <Select
                      name="Industry"
                      placeholder="Select Category (Multiple if any)"
                      noResultsText="No Data Found"
                      value={this.state.categories}
                      onChange={this.handleSelectChange.bind(
                        this,
                        "categories"
                      )}
                      options={categories}
                      multi
                      closeOnSelect={false}
                      valueKey="id"
                      labelKey="name"
                    />
                  </FormGroup>
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
                      //removeSelected={false}
                      closeOnSelect={false}
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
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="group">Payment Methods</Label>
                    <Select
                      name="Payment Method"
                      multi
                      closeOnSelect={false}
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
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessDetail;
