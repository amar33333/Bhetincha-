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

import { connect } from "react-redux";
import ReactTable from "react-table";
import { PopoverDelete, Select } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";
import "react-table/react-table.css";

import CustomModal from "../../../Common/components/CustomModal";
import CategoryEditModal from "../../../Common/components/CustomModal/ModalTemplates/CategoryEditModal";

import {
  onCategorySubmit,
  onCategoryEdit,
  onCategoryList,
  onIndustryList,
  onUnmountIndustry,
  onUnmountCategory,
  onCategoryDelete,
  toggleCategoryEditModal
} from "../../actions";

class Categories extends Component {
  state = {
    category: "",
    industry: ""
  };

  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  tableProps = {
    columns: [
      {
        Header: "S. No.",
        accessor: "s_no",
        filterable: false,
        searchable: false,
        width: 70
      },
      { Header: "Category", accessor: "name" },
      {
        Header: "Industry",
        accessor: "industry",
        Cell: ({ value }) => {
          const industry = this.props.industries.industries.find(
            industry => industry.id === value
          );
          return industry ? industry.name : "Not Found";
        },
        // Multiple filter option
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              found = found || filter.value[i].id === row.industry;
            }
            return found;
          } else return true;
        },
        // Single filter option
        // filterMethod: (filter, row) =>
        //   filter && filter.value ? filter.value.id === row.industry : true,
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
        Cell: ({ value, original: { id, industry, name } }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={() =>
                this.props.toggleCategoryEditModal({ id, industry, name })
              }
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

  componentWillMount() {
    this.props.onIndustryList();
    this.props.onCategoryList();
  }

  componentWillUnmount() {
    this.props.onUnmountIndustry();
    this.props.onUnmountCategory();
  }

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { category, industry } = this.state;
    console.log("asdqwew;asdad;A: ", category, industry);
    this.props.onCategorySubmit({
      industry: industry.id,
      category,
      access_token: this.access_token
    });
    this.setState({ category: "", industry: "" });
  };

  handleIndustryChange = industry => {
    this.setState({ industry });
    // console.log(`Selected: ${industry.label}`);
  };

  render() {
    const industries = this.props.industries.industries;

    const { industry } = this.state;
    const value = industry && industry.id;

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
                          value={value}
                          onChange={this.handleIndustryChange}
                          options={industries}
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
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            autoFocus
                            required
                            type="text"
                            placeholder="Type Category Name"
                            value={this.state.category.replace(/\b\w/g, l =>
                              l.toUpperCase()
                            )}
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
          data={this.props.categories.categories}
          loading={this.props.categories.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
        <CustomModal
          title="Edit Category Data"
          isOpen={this.props.categories.categoryEditModal}
          toggle={this.props.categories.toggleCategoryEditModal}
          className={"modal-xs" + this.props.className}
        >
          <CategoryEditModal
            data={this.props.categories.categoryEditData}
            onCategoryEdit={this.props.onCategoryEdit}
            industries={industries}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { industries, categories }, auth }) => ({
    industries,
    categories,
    ...auth
  }),
  {
    onCategorySubmit,
    toggleCategoryEditModal,
    onCategoryEdit,
    onIndustryList,
    onUnmountIndustry,
    onUnmountCategory,
    onCategoryList,
    onCategoryDelete
  }
)(Categories);
