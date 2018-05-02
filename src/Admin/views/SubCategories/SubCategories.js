import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";

import { connect } from "react-redux";
import Select from "react-select";

import {
  onIndustryList,
  onIndustryEachList,
  onExtraSectionList,
  onSubCategorySubmit,
  onUnmountCategory,
  onUnmountExtraSection,
  onUnmountSubCategory
} from "../../actions";

class SubCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategory: "",
      category: "",
      industry: "",
      extraSection: []
    };
    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.props.onIndustryList({ access_token: this.access_token });
    this.props.onIndustryEachList({ access_token: this.access_token });
    this.props.onExtraSectionList({ access_token: this.access_token });
  }

  componentWillUnmount() {
    this.props.onUnmountCategory();
    this.props.onUnmountExtraSection();
  }

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value }, () => {});
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { category, subCategory, extraSection } = this.state;
    this.props.onSubCategorySubmit({
      category: category.value,
      extraSection: extraSection,
      subCategory,
      access_token: this.access_token
    });
    this.setState({ subCategory: "", category: "", extraSection: [] });
  };

  render() {
    const industries = this.props.industries.industries;

    const categories = this.props.industries.data
      ? this.props.categories.data.map(category => {
          return { value: category.id, label: category.name };
        })
      : null;
    console.log("categories: ", categories);

    const extraSections = this.props.extra_sections.data
      ? this.props.extra_sections.data.extra_sections.map(extra_section => {
          return { value: extra_section, label: extra_section };
        })
      : null;

    const { category } = this.state;
    const valueCategory = category && category.value;

    const { extraSection } = this.state;
    const valueExtraSection = extraSection;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Sub-Categories</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      autoFocus
                      required
                      type="text"
                      placeholder="Sub Category Name"
                      value={this.state.subCategory}
                      onChange={this.onChange.bind(this, "subCategory")}
                    />
                  </InputGroup>
                  Category:
                  <Select
                    autosize
                    clearable
                    required
                    name="Category"
                    className="select-category"
                    value={valueCategory}
                    onChange={this.handleSelectChange.bind(this, "category")}
                    options={categories}
                  />
                  Extra Section
                  <Select
                    autosize
                    clearable
                    required
                    multi
                    //removeSelected={false}
                    closeOnSelect={false}
                    name="Extra-Sections"
                    className="select-extra-sections"
                    value={valueExtraSection}
                    onChange={this.handleSelectChange.bind(
                      this,
                      "extraSection"
                    )}
                    options={extraSections}
                  />
                  <Row>
                    <Col xs="6">
                      <Button
                        color="primary"
                        className="px-4"
                        //onClick={() => this.onLoginBtnClick()}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { categories, extra_sections, industries }, auth }) => ({
    categories,
    extra_sections,
    industries,
    ...auth
  }),
  {
    onIndustryList,
    onIndustryEachList,
    onExtraSectionList,
    onSubCategorySubmit,
    onUnmountCategory,
    onUnmountExtraSection,
    onUnmountSubCategory
  }
)(SubCategories);
