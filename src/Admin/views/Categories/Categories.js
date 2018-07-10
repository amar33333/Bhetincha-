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
  FormGroup,
  Label,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import debounce from "lodash.debounce";

import { connect } from "react-redux";
import ReactTable from "react-table";
import {
  PopoverDelete,
  Select,
  PaginationComponent
} from "../../../Common/components";
import "react-table/react-table.css";

import CustomModal from "../../../Common/components/CustomModal";
import CategoryEditModal from "../../../Common/components/CustomModal/ModalTemplates/CategoryEditModal";

import {
  onCategorySubmit,
  onCategoryEdit,
  onCategoryList,
  onIndustryList,
  handleSortChangeCategory,
  handleOnCategoryFilterChange,
  onUnmountIndustry,
  onUnmountCategory,
  onCategoryDelete,
  toggleCategoryEditModal
} from "../../actions";

class Categories extends Component {
  state = {
    category: "",
    industry: "",
    categorySubmit: false
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
      { Header: "Category", accessor: "name", id: "category" },
      {
        Header: "Industry",
        accessor: "industry.name",
        id: "industry",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            value={this.props.filterIndustry}
            onChange={filterIndustry =>
              this.props.handleOnCategoryFilterChange({ filterIndustry })
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
        Cell: ({ value, original: { id, industry, name } }) => (
          <div>
            <Button
              data-tooltip="Edit"
              data-position="bottom center"
              color="secondary"
              className="mr-2"
              onClick={() =>
                this.props.toggleCategoryEditModal({ id, industry, name })
              }
            >
              <i className="fa fa-pencil" />
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => this.props.onCategoryDelete({ id: value })}
            />
          </div>
        )
      }
    ],
    onFilteredChange: (column, value) => {
      value.id === "category" && this.debouncedSearch(column);
    },
    manual: true,
    sortable: true,
    minRows: 5,
    className: "-striped -highlight",
    filterable: true,
    PaginationComponent
  };

  componentDidMount() {
    this.props.onIndustryList();
    this.props.onCategoryList();
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.categorySubmit && !this.props.loading) {
      const updates = { categorySubmit: false };
      if (!this.props.error) {
        updates.category = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount() {
    this.props.onUnmountIndustry();
    this.props.onUnmountCategory();
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnCategoryFilterChange({
        name: column.filter(x => x.id === "category").length
          ? column.find(x => x.id === "category").value
          : ""
      }),
    200
  );

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    const { category, industry } = this.state;
    this.setState({ categorySubmit: true }, () =>
      this.props.onCategorySubmit({ industry: industry.id, category })
    );
  };

  handleIndustryChange = industry => this.setState({ industry });

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Categories</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="12">
                      <FormGroup>
                        <Label for="Industries">Industry</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="Industries"
                          className="select-industry"
                          value={this.state.industry}
                          onChange={this.handleIndustryChange}
                          options={this.props.industries}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="10">
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Name</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            required
                            innerRef={ref => (this.focusableInput = ref)}
                            type="text"
                            placeholder="Type Category Name"
                            value={this.state.category}
                            onChange={this.onChange.bind(this, "category")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="2">
                      <Button color="primary">
                        <span className="fa fa-plus" /> Add
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
          data={this.props.categories}
          pageSize={this.props.rows}
          sorted={this.props.sort_by}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex =>
            this.props.onCategoryList({ page: pageIndex + 1 })
          }
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.onCategoryList({ page: pageIndex + 1, rows: pageSize })
          }
          onSortedChange={this.props.handleSortChangeCategory}
          page={this.props.page - 1}
          pages={this.props.pages}
          rowCount={this.props.rowCount}
        />
        <CustomModal
          title="Edit Category Data"
          isOpen={this.props.categoryEditModal}
          toggle={this.props.toggleCategoryEditModal}
          className={"modal-xs" + this.props.className}
        >
          <CategoryEditModal
            data={this.props.categoryEditData}
            onCategoryEdit={this.props.onCategoryEdit}
            industries={this.props.industries}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      industries: { industries },
      categories,
      filterCategory
    }
  }) => ({
    industries,
    ...categories,
    ...filterCategory
  }),
  {
    onCategorySubmit,
    toggleCategoryEditModal,
    onCategoryEdit,
    onIndustryList,
    handleOnCategoryFilterChange,
    handleSortChangeCategory,
    onUnmountIndustry,
    onUnmountCategory,
    onCategoryList,
    onCategoryDelete
  }
)(Categories);
