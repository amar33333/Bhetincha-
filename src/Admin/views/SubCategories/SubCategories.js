import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import ReactTable from "react-table";

import "react-table/react-table.css";
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

import {
  Select,
  PopoverDelete,
  PaginationComponent
} from "../../../Common/components";

import CustomModal from "../../../Common/components/CustomModal";
import SubCategoryEditModal from "../../../Common/components/CustomModal/ModalTemplates/SubCategoryEditModal";

import {
  onIndustryList,
  onIndustryEachList,
  onExtraSectionList,
  onSubCategorySubmit,
  onSubCategoryList,
  handleSortChangeSubCategory,
  handleOnSubCategoryFilterChange,
  handleOnCategoryFilterChange,
  onSubCategoryEdit,
  toggleSubCategoryEditModal,
  onCategoryList,
  onSubCategoryDelete,
  onUnmountIndustry,
  onUnmountCategory,
  onUnmountExtraSection,
  onUnmountSubCategory
} from "../../actions";

class SubCategories extends Component {
  state = {
    subCategory: "",
    category: "",
    industry: "",
    extraSections: [],
    tags: [],
    subCategorySubmit: false,
    categorySearchText: ""
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
      { Header: "Sub-Category", accessor: "name", id: "subcategory" },
      // {
      //   Header: "Extra Sections",
      //   accessor: "extra_section",
      //   Cell: ({ value }) => value.join(", "),
      //   sortable: false,
      //   filterable: false
      //   // Filter: () => (
      //   //   <Select
      //   //     clearable
      //   //     tabSelectsValue={false}
      //   //     multi
      //   //     value={this.state.filterExtrasection}
      //   //     onChange={this.handleSelectChange.bind(this, "filterExtrasection")}
      //   //     options={this.props.extra_sections.data}
      //   //   />
      //   // )
      // },
      // {
      //   Header: "Tags",
      //   accessor: "tags",
      //   Cell: ({ value }) => value.join(", "),
      //   sortable: false,
      //   filterable: false
      // },
      {
        Header: "Category",
        accessor: "category",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            isLoading={this.props.categoriesFetchLoading}
            onInputChange={categorySearchText => {
              this.setState(
                { categorySearchText },
                () =>
                  categorySearchText &&
                  this.debouncedCategoryAutocomplete(categorySearchText)
              );
            }}
            value={this.props.filterCategory}
            onChange={filterCategory =>
              this.props.handleOnSubCategoryFilterChange({ filterCategory })
            }
            valueKey="id"
            labelKey="name"
            filterOptions={options => options}
            options={
              this.state.categorySearchText &&
              !this.props.categoriesFetchLoading
                ? this.props.categories.filter(
                    category =>
                      !this.props.filterCategory.length ||
                      !this.props.filterCategory
                        .map(x => x.id)
                        .includes(category.id)
                  )
                : []
            }
            noResultsText={
              this.state.categorySearchText &&
              !this.props.categoriesFetchLoading
                ? "No Results Found"
                : "Start Typing..."
            }
          />
        )
      },
      {
        Header: "Industry",
        accessor: "industry",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            multi
            tabSelectsValue={false}
            value={this.props.filterIndustry}
            onChange={filterIndustry =>
              this.props.handleOnSubCategoryFilterChange({ filterIndustry })
            }
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
        Cell: ({ value, original }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={
                () => console.log("sub cat table: ", original)
                //this.props.toggleSubCategoryEditModal({ id, industry, name })
              }
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
    onFilteredChange: (column, value) => {
      value.id === "subcategory" && this.debouncedSearch(column);
    },
    manual: true,
    minRows: 5,
    className: "-striped -highlight",
    filterable: true,
    PaginationComponent
  };

  componentDidMount() {
    this.props.onSubCategoryList();
    this.props.onIndustryList();
    this.props.onExtraSectionList();
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.subCategorySubmit && !this.props.loading) {
      const updates = { subCategorySubmit: false };
      if (!this.props.error) {
        updates.extraSections = [];
        updates.tags = [];
        updates.subCategory = "";
        updates.subCategorySubmit = false;
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount() {
    this.props.onUnmountIndustry();
    this.props.onUnmountCategory();
    this.props.onUnmountSubCategory();
    this.props.onUnmountExtraSection();
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnSubCategoryFilterChange({
        name: column.length ? column[0].value : ""
      }),
    200
  );

  debouncedCategoryAutocomplete = debounce(
    name =>
      this.props.handleOnCategoryFilterChange({
        name,
        filterIndustry: this.props.filterIndustry
      }),
    200
  );

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

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

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "industry") {
      this.setState({ category: "" });
      value && this.props.onIndustryEachList({ id: value.id });
    }
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
                          autoFocus
                          clearable
                          required
                          disabled={this.props.loading}
                          name="Industry"
                          className="select-category"
                          value={this.state.industry}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "industry"
                          )}
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
                          disabled={this.props.loading}
                          required
                          name="Category"
                          className="select-category"
                          value={this.state.category}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "category"
                          )}
                          options={
                            this.state.industry
                              ? this.props.partialCategories
                              : []
                          }
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
                      disabled={this.props.loading}
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
                        disabled={this.props.loading}
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
                      disabled={this.props.loading}
                      required
                      tabSelectsValue={false}
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
                      <Button
                        color="primary"
                        disabled={this.props.loading}
                        className="px-4"
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
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.subCategories}
          defaultPageSize={this.props.rows}
          defaultSorted={this.props.sort_by}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex =>
            this.props.onSubCategoryList({ page: pageIndex + 1 })
          }
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.onSubCategoryList({
              page: pageIndex + 1,
              rows: pageSize
            })
          }
          onSortedChange={this.props.handleSortChangeSubCategory}
          page={this.props.page - 1}
          pages={this.props.pages}
          rowCount={this.props.rowCount}
        />
        <CustomModal
          title="Edit Sub Category Data"
          isOpen={this.props.SubCategoryEditModal}
          toggle={this.props.toggleSubCategoryEditModal}
          className={"modal-xs" + this.props.className}
        >
          <SubCategoryEditModal
            data={this.props.subCategoryEditData}
            onCategoryEdit={this.props.onSubCategoryEdit}
            industries={this.props.industries}
            categories={this.props.categories}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      sub_categories,
      categories: { categories, fetchLoading: categoriesFetchLoading },
      extra_sections,
      industries: { industries, industriesData },
      filterSubCategory
    }
  }) => ({
    industries,
    partialCategories: industriesData,
    categories,
    extra_sections,
    categoriesFetchLoading,
    ...sub_categories,
    ...filterSubCategory
  }),
  {
    onIndustryList,
    onIndustryEachList,
    onExtraSectionList,
    onSubCategorySubmit,
    onSubCategoryList,
    handleOnCategoryFilterChange,
    handleOnSubCategoryFilterChange,
    handleSortChangeSubCategory,
    onSubCategoryEdit,
    toggleSubCategoryEditModal,
    onCategoryList,
    onSubCategoryDelete,
    onUnmountIndustry,
    onUnmountCategory,
    onUnmountExtraSection,
    onUnmountSubCategory
  }
)(SubCategories);
