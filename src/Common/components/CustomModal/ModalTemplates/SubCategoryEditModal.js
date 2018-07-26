import React, { Component } from "react";
import {
  Row,
  Col,
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup
} from "reactstrap";

import TagsInput from "react-tagsinput";

import "react-table/react-table.css";
import "react-tagsinput/react-tagsinput.css";

import Select from "react-select";
import { ErrorHandling } from "../../../utils/Extras";

class SubCategoryEditModal extends Component {
  state = {
    subCategory: "",
    category: "",
    industry: "",
    extraSections: [],
    tags: []
  };

  componentDidMount() {
    this.setState(
      {
        category: {
          id: this.props.data.category.id,
          name: this.props.data.category.name
        },
        industry: {
          id: this.props.data.industry.id,
          name: this.props.data.industry.name
        },
        subCategory: this.props.data.name,
        extraSections: this.props.data.extra_sections.map(extraSection => ({
          label: extraSection,
          value: extraSection
        })),
        tags: this.props.data.tags
      },
      () => this.props.onIndustryEachList({ id: this.state.industry.id })
    );
  }

  componentWillUnmount = () => {
    this.props.resetSubCategoryErrors();
  };

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value
    });
  };

  handleTagsChange = tags => this.setState({ tags });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "industry") {
      this.setState({ category: "" });
      value && this.props.onIndustryEachList({ id: value.id });
    }
  };

  onFormEdit = event => {
    event.preventDefault();
    const { category, subCategory, extraSections, tags } = this.state;

    this.props.onSubCategoryEdit({
      id: this.props.data.id,
      body: {
        category: category.id,
        extra_sections: extraSections.map(extraSection => extraSection.value),
        name: subCategory,
        tags
      }
    });
  };

  render() {
    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="6">
            <FormGroup>
              <Label> Industry </Label>
              <Select
                autosize
                autoFocus
                clearable
                required
                //disabled={this.props.loading}
                name="Industry"
                className="select-category"
                value={this.state.industry}
                onChange={this.handleSelectChange.bind(this, "industry")}
                options={this.props.industries}
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
                //disabled={this.props.loading}
                required
                name="Category"
                className="select-category"
                value={this.state.category}
                onChange={this.handleSelectChange.bind(this, "category")}
                options={
                  this.state.industry ? this.props.partialCategories : []
                }
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
        </Row>

        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Name</InputGroupText>
          </InputGroupAddon>
          <Input
            required
            innerRef={ref => (this.focusableInput = ref)}
            //disabled={this.props.loading}
            type="text"
            placeholder="New Sub Category Name"
            value={this.state.subCategory}
            onChange={this.onChange.bind(this, "subCategory")}
          />
        </InputGroup>
        <ErrorHandling
          error={
            this.props.subCategoryEditErrors &&
            this.props.subCategoryEditErrors.name
          }
        />
        <Row>
          <Col xs="12" md="12">
            <TagsInput
              onlyUnique
              disabled={this.props.loading}
              addKeys={[9, 188]}
              value={this.state.tags}
              onChange={this.handleTagsChange}
            />
          </Col>
        </Row>
        <FormGroup>
          <Label> Extra Section </Label>
          <Select
            autosize
            clearable
            disabled={this.props.loading}
            //required
            tabSelectsValue={false}
            multi
            name="Extra-Sections"
            className="select-extra-sections"
            value={this.state.extraSections}
            onChange={this.handleSelectChange.bind(this, "extraSections")}
            options={this.props.extra_sections.data}
          />
        </FormGroup>
        <Row>
          <Col xs="6">
            <Button
              color="primary"
              disabled={this.props.loading}
              className="px-4"
            >
              <i className="fa fa-plus" /> SAVE
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SubCategoryEditModal;
