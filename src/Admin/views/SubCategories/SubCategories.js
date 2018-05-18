import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import { connect } from "react-redux";
import orderBy from "lodash.orderby";
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
// import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import {
  onIndustryList,
  onIndustryEachList,
  onExtraSectionList,
  onSubCategorySubmit,
  onSubCategoryList,
  onCategoryList,
  onSubCategoryDelete,
  onUnmountIndustry,
  onUnmountCategory,
  onUnmountExtraSection,
  onUnmountSubCategory
} from "../../actions";

const SUB_CATEGORIES_CHANGED = "SUB_CATEGORIES_CHANGED";

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
    subCategorySubmit: false,
    filterIndustry: [],
    filterCategory: [],
    filterExtrasection: [],
    filterText: [],
    sortedData: [],
    pages: 1,
    page: 0,
    rows: 20,
    rowCount: 0,
    subCategories: []
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
        sortable: false,
        Filter: () => (
          <Select
            clearable
            multi
            value={this.state.filterExtrasection}
            onChange={this.handleSelectChange.bind(this, "filterExtrasection")}
            options={this.props.extra_sections.data}
          />
        )
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ value }) => value.join(", "),
        sortable: false
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
        Filter: () => (
          <Select
            clearable
            multi
            value={this.state.filterCategory}
            onChange={this.handleSelectChange.bind(this, "filterCategory")}
            valueKey="id"
            labelKey="name"
            options={this.props.categories.filter(category => {
              const { filterIndustry } = this.state;
              if (filterIndustry.length === 0) return true;
              for (let i = 0; i < filterIndustry.length; i++)
                if (category.industry === filterIndustry[i].id) return true;
              return false;
            })}
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
        Filter: () => (
          <Select
            clearable
            multi
            value={this.state.filterIndustry}
            onChange={this.handleSelectChange.bind(this, "filterIndustry")}
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
    manual: true,
    minRows: 5,
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

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.subCategories !== this.props.subCategories) {
      return SUB_CATEGORIES_CHANGED;
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.subCategorySubmit && prevProps.loading)
      this.focusableInput.focus();

    if (snapshot === SUB_CATEGORIES_CHANGED) this.updateTable();
  };

  componentWillUnmount() {
    this.props.onUnmountIndustry();
    this.props.onUnmountCategory();
    this.props.onUnmountSubCategory();
    this.props.onUnmountExtraSection();
  }

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
    this.setState(
      { [key]: value },
      () =>
        (key === "filterIndustry" ||
          key === "filterCategory" ||
          key === "filterExtrasection") &&
        this.updateTable()
    );
    if (key === "industry") {
      this.setState({ category: "" });
      value && this.props.onIndustryEachList({ id: value.id });
    }
    if (
      key === "filterIndustry" &&
      value.length > 0 &&
      this.state.filterCategory.length > 0
    ) {
      let changed = false;
      let filterCategory = this.state.filterCategory.filter(filter => {
        let found = false;
        for (let i = 0; i < value.length; i++) {
          found = found || value[i].id === filter.industry;
          if (found) break;
        }
        changed = !found;
        return found;
      });
      changed && this.updateData({ filterCategory });
    }
  };

  updateTable = () => {
    const {
      page,
      rows,
      filterText,
      filterCategory,
      filterIndustry,
      filterExtrasection,
      sortedData
    } = this.state;

    let subCategories = this.props.subCategories;
    // filter
    if (filterText.length) {
      filterText.forEach(filter => {
        subCategories = subCategories.filter(subCategory => {
          const text =
            filter.id === "tags"
              ? String(subCategory[filter.id].join(", ")).toLowerCase()
              : String(subCategory[filter.id]).toLowerCase();
          return text.indexOf(filter.value.toLowerCase()) !== -1;
        });
      });
    }
    if (filterExtrasection.length) {
      filterExtrasection.forEach(filter => {
        subCategories = subCategories.filter(
          subCategory =>
            String(subCategory.extra_section.join(", "))
              .toLowerCase()
              .indexOf(filter.value.toLowerCase()) !== -1
        );
      });
    }
    if (filterCategory.length) {
      subCategories = subCategories.filter(subCategory => {
        let found = false;
        for (let i = 0; i < filterCategory.length; i++) {
          found = found || filterCategory[i].id === subCategory.category;
          if (found) break;
        }
        return found;
      });
    } else if (filterIndustry.length) {
      subCategories = subCategories.filter(subCategory => {
        let found = false;
        for (let i = 0; i < filterIndustry.length; i++) {
          const categories = this.props.categories
            .filter(category => category.industry === filterIndustry[i].id)
            .map(category => category.id);
          found = found || categories.includes(subCategory.category);
          if (found) break;
        }
        return found;
      });
    }
    // sort
    if (sortedData.length > 0) {
      subCategories = subCategories.map(subCategory => {
        const category = this.props.categories.find(
          category => category.id === subCategory.category
        );

        const industry = this.props.industries.find(
          industry => (category ? category.industry === industry.id : false)
        );

        return {
          ...subCategory,
          categoryName: category ? category.name : "Not Found",
          industryName: industry ? industry.name : "Not Found"
        };
      });
      subCategories = orderBy(
        subCategories,
        sortedData.map(sort => {
          let id;
          switch (sort.id) {
            case "category":
              id = "categoryName";
              break;
            case "industry":
              id = "industryName";
              break;
            default:
              id = sort.id;
          }
          return row => {
            if (row[id] === null || row[id] === undefined) {
              return -Infinity;
            }
            return typeof row[id] === "string"
              ? row[id].toLowerCase()
              : row[id];
          };
        }),
        sortedData.map(d => (d.desc ? "desc" : "asc"))
      );
    }

    // pagination
    let newPage = subCategories.length <= rows * page ? 0 : page;

    this.setState({
      rowCount: subCategories.length,
      subCategories: subCategories.slice(rows * newPage, rows * newPage + rows),
      page: newPage,
      pages: Math.ceil(subCategories.length / rows)
    });
  };

  debouncedUpdate = debounce(this.updateTable, 100);

  updateData = params => this.setState(params, () => this.updateTable());

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
          data={this.state.subCategories}
          pages={this.state.pages}
          pageSize={this.state.rows}
          rowCount={this.state.rowCount}
          onPageChange={pageIndex => {
            this.updateData({ page: pageIndex });
          }}
          onPageSizeChange={(pageSize, pageIndex) =>
            this.updateData({
              page: pageIndex,
              rows: pageSize
            })
          }
          onSortedChange={newSorted =>
            this.updateData({ sortedData: newSorted })
          }
          onFilteredChange={(column, value) => {
            (value.id === "tags" || value.id === "name") &&
              this.setState({ filterText: column }, this.debouncedUpdate);
          }}
          loading={this.props.fetchLoading}
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
    onUnmountIndustry,
    onUnmountCategory,
    onUnmountExtraSection,
    onUnmountSubCategory
  }
)(SubCategories);
