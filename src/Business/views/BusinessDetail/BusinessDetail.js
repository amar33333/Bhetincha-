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
  Button,
  Label,
  FormGroup
} from "reactstrap";

import {
  onBusinessSubmit,
  onIndustryList,
  onIndustryEachList,
  onCategoryEachList,
  onUnmountSubCategories
} from "../../actions";

class BusinessDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      industry: "",
      category: "",
      sub_category: []
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;
  }

  componentWillMount() {
    this.props.onIndustryList({ access_token: this.access_token });
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

  onFormSubmit = event => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      username,
      password,
      group,
      email
    } = this.state;

    this.props.onUserSubmit({
      first_name,
      last_name,
      username,
      email,
      password,
      group,
      access_token: this.access_token
    });
    this.clearState();
  };

  clearState = () =>
    this.setState({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      group: ""
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
    console.log("business; ", this.props);
    const industries = this.props.industries
      ? this.props.industries.map(industry => {
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

    const { category } = this.state;
    const valueCategory = category && category.value;

    const { industry } = this.state;
    const valueIndustry = industry && industry.value;

    const { sub_category } = this.state;
    const valueSubCategory = sub_category;

    console.log("categorry: ", valueCategory);
    console.log("sub_categorry: ", valueSubCategory);

    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Add New Business</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onFormSubmit}>
                <Row>
                  <Col xs="12" md="12">
                    <FormGroup>
                      <Label for="group">Business Industry</Label>
                      <Select
                        autoFocus
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
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        required
                        type="text"
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
    BusinessContainer: { business_reducer, industry_reducer, category_reducer },
    auth
  }) => ({
    business_reducer,
    ...industry_reducer,
    ...category_reducer,
    ...auth
  }),
  {
    onBusinessSubmit,
    onIndustryList,
    onIndustryEachList,
    onCategoryEachList,
    onUnmountSubCategories
  }
)(BusinessDetail);
