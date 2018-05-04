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
import { Select, PopoverDelete } from "../../../Common/components";
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

    this.props.onSubCategoryList();
    this.props.onCategoryList();
    this.props.onIndustryList();
    this.props.onExtraSectionList({ access_token: this.access_token });
  }

  tableProps = {
    columns: [
      {
        Header: "S. No.",
        accessor: "s_no",
        filterable: false,
        searchable: false,
        width: 70
      },
      { Header: "Sub-Category", accessor: "name" },
      {
        Header: "Extra Sections",
        accessor: "extra_section",
        Cell: ({ value }) => value.join(","),
        // Multiple filter option
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
        // Single filter option
        // filterMethod: (filter, row) =>
        //   filter && filter.value ? filter.value.id === row.category : true,
        Filter: value => {
          const { filter, onChange } = value;
          // console.log(value);
          return (
            <Select
              clearable
              multi
              value={filter ? filter.value : null}
              onChange={onChange}
              options={this.props.extra_sections.data}
            />
          );
        }
      },
      {
        Header: "Category",
        accessor: "category",
        id: "category",
        Cell: ({ value }) => {
          const category = this.props.categories.categories.find(
            category => category.id === value
          );
          return category ? category.name : "Not Found";
        },
        // Multiple filter option
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              found = found || filter.value[i].id === row.category;
            }
            return found;
          } else return true;
        },
        // Single filter option
        // filterMethod: (filter, row) =>
        //   filter && filter.value ? filter.value.id === row.category : true,
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            multi
            value={filter ? filter.value : null}
            onChange={onChange}
            valueKey="id"
            labelKey="name"
            options={this.props.categories.categories}
          />
        )
      },
      {
        Header: "Industry",
        accessor: "category",
        id: "industry",
        Cell: ({ value }) => {
          const category = this.props.categories.categories.find(
            category => category.id === value
          );
          if (category) {
            const industry = this.props.industries.industries.find(
              industry => industry.id === category.industry
            );
            return industry ? industry.name : "Not Found";
          } else return "Not Found";
        },
        // Multiple filter option
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              const categories = this.props.categories.categories
                .filter(category => category.industry === filter.value[i].id)
                .map(category => category.id);
              found = found || categories.includes(row.category);
            }
            return found;
          } else return true;
        },
        // Single filter option
        // filterMethod: (filter, row) =>
        //   filter && filter.value ? filter.value.id === row.category : true,
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            multi
            value={filter ? filter.value : null}
            onChange={onChange}
            valueKey="id"
            labelKey="name"
            options={this.props.industries.industries}
          />
        )
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 130,
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
              onClick={() => this.props.onCategoryDelete({ id: value })}
            />
          </div>
        )
      }
    ],
    minRows: 5,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true
  };

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
                          name="Industry"
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
        <ReactTable
          {...this.tableProps}
          data={this.props.sub_categories.subCategories}
          loading={this.props.sub_categories.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: { sub_categories, categories, extra_sections, industries },
    auth
  }) => ({
    industries,
    categories,
    extra_sections,
    sub_categories,
    ...auth
  }),
  {
    onIndustryList,
    onIndustryEachList,
    onExtraSectionList,
    onSubCategorySubmit,
    onSubCategoryList,
    onCategoryList,
    onUnmountCategory,
    onUnmountExtraSection,
    onUnmountSubCategory
  }
)(SubCategories);
