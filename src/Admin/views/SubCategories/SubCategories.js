import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
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
import {
  Select,
  PopoverDelete,
  PaginationComponent
} from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";
import ReactTable from "react-table";
import "react-table/react-table.css";

import {
  onIndustryList,
  onIndustryEachList,
  onExtraSectionList,
  onSubCategorySubmit,
  onSubCategoryList,
  onCategoryList,
  onSubCategoryDelete,
  onUnmountCategory,
  onUnmountExtraSection,
  onUnmountSubCategory
} from "../../actions";

class SubCategories extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.subCategorySubmit && !nextProps.error && !nextProps.loading
      ? {
          extraSections: [],
          tags: [],
          subCategory: "",
          subCategorySubmit: false
        }
      : null;

  state = {
    subCategory: "",
    category: "",
    industry: "",
    extraSections: [],
    tags: [],
    subCategorySubmit: false
  };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Sub-Category", accessor: "name" },
      {
        Header: "Extra Sections",
        accessor: "extra_section",
        Cell: ({ value }) => value.join(", "),
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              found =
                found || row.extra_section.includes(filter.value[i].value);
            }
            return found;
          } else return true;
        },
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            multi
            value={filter ? filter.value : null}
            onChange={onChange}
            options={this.props.extra_sections.data}
          />
        )
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ value }) => value.join(", "),
        filterMethod: (filter, row) => {
          if (!filter) return true;
          let found = false;
          row.tags.forEach(tag => {
            if (tag.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1)
              found = true;
          });
          return found;
        }
      },
      {
        Header: "Category",
        accessor: "category",
        id: "category",
        Cell: ({ value }) => {
          const category = this.props.categories.find(
            category => category.id === value
          );
          return category ? category.name : "Not Found";
        },
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              found = found || filter.value[i].id === row.category;
            }
            return found;
          } else return true;
        },
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            multi
            value={filter ? filter.value : null}
            onChange={onChange}
            valueKey="id"
            labelKey="name"
            options={this.props.categories}
          />
        )
      },
      {
        Header: "Industry",
        accessor: "category",
        id: "industry",
        Cell: ({ value }) => {
          const category = this.props.categories.find(
            category => category.id === value
          );
          if (category) {
            const industry = this.props.industries.find(
              industry => industry.id === category.industry
            );
            return industry ? industry.name : "Not Found";
          } else return "Not Found";
        },
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              const categories = this.props.categories
                .filter(category => category.industry === filter.value[i].id)
                .map(category => category.id);
              found = found || categories.includes(row.category);
            }
            return found;
          } else return true;
        },
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            multi
            value={filter ? filter.value : null}
            onChange={onChange}
            valueKey="id"
            labelKey="name"
            options={this.props.industries}
          />
        )
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={event => console.log("Edit clicked for id: ", value)}
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => this.props.onSubCategoryDelete({ id: value })}
            />
          </div>
        )
      }
    ],
    minRows: 5,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true,
    PaginationComponent
  };

  componentDidMount() {
    this.props.onSubCategoryList();
    this.props.onCategoryList();
    this.props.onIndustryList();
    this.props.onExtraSectionList();
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.subCategorySubmit && prevProps.loading)
      this.focusableInput.focus();
  };

  componentWillUnmount() {
    this.props.onUnmountCategory();
    this.props.onUnmountExtraSection();
  }

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  handleSelectChange = (key, value) => this.setState({ [key]: value });

  handleIndustryChange = value => {
    this.setState({ industry: value, category: "" });
    value && this.props.onIndustryEachList({ id: value.id });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { category, subCategory, extraSections, tags } = this.state;
    this.setState({ subCategorySubmit: true }, () =>
      this.props.onSubCategorySubmit({
        category: category.id,
        extraSection: extraSections.map(extraSection => extraSection.value),
        subCategory,
        tags
      })
    );
  };

  handleTagsChange = tags => this.setState({ tags });

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
                          autoFocus
                          clearable
                          required
                          name="Industry"
                          className="select-category"
                          value={this.state.industry}
                          onChange={this.handleIndustryChange}
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
                          required
                          name="Category"
                          className="select-category"
                          value={this.state.category}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "category"
                          )}
                          options={this.props.partialCategories}
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
                      required
                      innerRef={ref => (this.focusableInput = ref)}
                      type="text"
                      placeholder="New Sub Category Name"
                      value={this.state.subCategory}
                      onChange={this.onChange.bind(this, "subCategory")}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="12" md="12">
                      <TagsInput
                        onlyUnique
                        addKeys={[9, 32, 188]}
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
        <ReactTable
          {...this.tableProps}
          data={this.props.subCategories}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      sub_categories,
      categories: { categories },
      extra_sections,
      industries: { industries, industriesData }
    }
  }) => ({
    industries,
    partialCategories: industriesData,
    categories,
    extra_sections,
    ...sub_categories
  }),
  {
    onIndustryList,
    onIndustryEachList,
    onExtraSectionList,
    onSubCategorySubmit,
    onSubCategoryList,
    onCategoryList,
    onSubCategoryDelete,
    onUnmountCategory,
    onUnmountExtraSection,
    onUnmountSubCategory
  }
)(SubCategories);
