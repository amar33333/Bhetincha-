import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form
} from "reactstrap";

import { connect } from "react-redux";
import Select from "react-select";

import {
  onCategoryList,
  onExtraSectionList,
  onSubCategorySubmit,
  onUnmountCategory,
  onUnmountExtraSection,
  onUnmountSubCategory
} from "../../actions";

class SubCategories extends Component {
  state = { subCategory: "", category: "", extraSection: [] };

  componentWillMount() {
    this.props.onCategoryList();
    this.props.onExtraSectionList();
  }

  componentWillUnmount() {
    this.props.onUnmountCategory();
    this.props.onUnmountExtraSection();
  }

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value }, () => {
      console.log("print stte: ", this.state);
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { category, subCategory, extraSection } = this.state;
    this.props.onSubCategorySubmit({
      category: category.value,
      extraSection: extraSection,
      subCategory
    });
    this.setState({ subCategory: "", category: "", extraSection: [] });
  };

  render() {
    // console.log("subcategories: ", this.props);

    const categories = this.props.categories.data
      ? this.props.categories.data.map(category => {
          return { value: category.id, label: category.name };
        })
      : null;

    const extraSections = this.props.extra_sections.data
      ? this.props.extra_sections.data.extra_sections.map(extra_section => {
          return { value: extra_section, label: extra_section };
        })
      : null;

    // console.log("extasd: ", extra_sections);

    const { category } = this.state;
    const valueCategory = category && category.value;

    const { extraSection } = this.state;
    const valueExtraSection = extraSection;

    return (
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
          onChange={this.handleSelectChange.bind(this, "extraSection")}
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
    );
  }
}

export default connect(
  ({ AdminContainer: { categories, extra_sections } }) => ({
    categories,
    extra_sections
  }),
  {
    onCategoryList,
    onExtraSectionList,
    onSubCategorySubmit,
    onUnmountCategory,
    onUnmountExtraSection,
    onUnmountSubCategory
  }
)(SubCategories);