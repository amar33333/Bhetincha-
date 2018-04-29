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
      business_tagline: "",
      // first_name: "",
      // last_name: "",
      // username: "",
      // password: "",
      business_email: "",
      industry: "",
      category: "",
      sub_category: [],
      payment_method: []
      // collapsed: true
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  static getDerivedStateFromProps = nextProps =>
    nextProps.businessData && nextProps.edit
      ? {
          business_name: nextProps.businessData.business_name,
          business_email: nextProps.businessData.business_email,
          payment_method: nextProps.businessData.payment_method.map(each => ({
            id: each,
            name: each
          })),
          sub_category: nextProps.businessData.sub_categories.map(each => ({
            id: each,
            name: each
          }))
        }
      : null;

  // toggleCollapse = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed
  //   });
  // };

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  handleSelectChange = (key, value) => {
    console.log("vavas: ", key, value);
    this.setState({ [key]: value });
    if (key === "industry" && value) {
      this.setState({ category: "", sub_category: [] });

      this.props.onIndustryEachList({
        id: value.id,
        access_token: this.access_token
      });
      this.props.onUnmountSubCategories();
    } else if (key === "category" && value) {
      this.setState({ sub_category: [] });

      console.log("detaiL : ", key, value);
      this.props.onCategoryEachList({
        id: value.id,
        access_token: this.access_token
      });
    }
  };

  clearState = () => {
    this.setState({
      business_name: "",
      business_tagline: "",
      // first_name: "",
      // last_name: "",
      // username: "",
      // password: "",
      business_email: "",
      industry: "",
      category: "",
      sub_category: [],
      payment_method: []
    });
  };

  getState = () => this.state;

  render() {
    // console.log("businessdetail props: ", this.props);
    // console.log("businessdetail states: ", this.state);
    const industries = this.props.industries;

    const categories = this.props.industryData
      ? this.props.industryData.categories
      : [];

    const subCategories = this.props.categoryData
      ? this.props.categoryData.subcategories
      : [];

    const paymentMethods = this.props.payment_methods;

    const { payment_method } = this.state;
    const valuePaymentMethod = payment_method;

    const { category } = this.state;
    const valueCategory = category && category.id;

    const { industry } = this.state;
    const valueIndustry = industry && industry.id;

    const { sub_category } = this.state;
    const valueSubCategory = sub_category;

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
                      valueKey="id"
                      labelKey="name"
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
                      valueKey="id"
                      labelKey="name"
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
                      valueKey="id"
                      labelKey="name"
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
                      valueKey="id"
                      labelKey="name"
                    />
                  </FormGroup>
                </Col>
              </Row>
              {/* <Row>
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
              </Row> */}
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessDetail;
