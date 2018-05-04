import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Card,
  CardBody,
  CardHeader,
  FormGroup
} from "reactstrap";

import { connect } from "react-redux";
import { Select } from "../../../Common/components";

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
      extraSections: []
    };
    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.props.onIndustryList();
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
    this.setState({ [key]: value });
  };

  handleIndustryChange = value =>
    this.setState(
      { industry: value, category: "" },
      () =>
        this.state.industry && this.props.onIndustryEachList({ id: value.id })
    );

  onFormSubmit = event => {
    event.preventDefault();
    const { category, subCategory, extraSections } = this.state;
    console.log(category, extraSections, subCategory);
    this.props.onSubCategorySubmit({
      category: category.id,
      extraSection: extraSections.map(extraSection => extraSection.value),
      subCategory,
      access_token: this.access_token
    });
    this.setState({ subCategory: "", extraSections: [] });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Add Sub-Categories</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="6">
                      <FormGroup>
                        <Label> Industry </Label>
                        <Select
                          autosize
                          clearable
                          required
                          name="Category"
                          className="select-category"
                          disabled={this.props.industries.fetchLoading}
                          value={this.state.industry}
                          onChange={this.handleIndustryChange}
                          options={this.props.industries.industries}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="6">
                      <FormGroup>
                        <Label> Category </Label>
                        <Select
                          autosize
                          clearable
                          required
                          name="Category"
                          className="select-category"
                          disabled={this.props.industries.fetchLoadingData}
                          value={this.state.category}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "category"
                          )}
                          options={this.props.industries.industriesData}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
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
                      placeholder="New Sub Category Name"
                      value={this.state.subCategory.replace(/\b\w/g, l =>
                        l.toUpperCase()
                      )}
                      onChange={this.onChange.bind(this, "subCategory")}
                    />
                  </InputGroup>
                  <FormGroup>
                    <Label> Extra Section </Label>
                    <Select
                      autosize
                      clearable
                      required
                      multi
                      name="Extra-Sections"
                      className="select-extra-sections"
                      value={this.state.extraSections}
                      onChange={this.handleSelectChange.bind(
                        this,
                        "extraSections"
                      )}
                      options={this.props.extra_sections.data}
                    />
                  </FormGroup>
                  <Row>
                    <Col xs="6">
                      <Button color="primary" className="px-4">
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
