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
import Select from "react-select";

import { connect } from "react-redux";
import ReactTable from "react-table";
import { PopoverDelete } from "../../../Common/components";
import "react-table/react-table.css";

import {
  onCategorySubmit,
  onCategoryList,
  onIndustryList,
  onUnmountIndustry,
  onUnmountCategory,
  onCategoryDelete
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
        filterMethod: (filter, row) => {
          if (filter && filter.value) {
            if (filter.value.id === "all") return true;
            return filter.value.id === row.industry;
          } else return true;
        },
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            value={filter ? filter.value : "All"}
            onChange={onChange}
            valueKey="id"
            labelKey="name"
            options={[
              { id: "all", name: "All" },
              ...this.props.industries.industries
            ]}
          />
        )
        // filterMethod: (filter, row) => {
        //   if (filter.value === "all") return true;
        //   return filter.value === row.industry;
        // },
        // Filter: ({ filter, onChange }) => (
        //   <select
        //     onChange={event => onChange(event.target.value)}
        //     style={{ width: "100%" }}
        //     value={filter ? filter.value : "all"}
        //   >
        //     <option value="all">Show All</option>
        //     {this.props.industries.industries.map(industry => (
        //       <option key={industry.id} value={industry.id}>
        //         {industry.name}
        //       </option>
        //     ))}
        //   </select>
        // )
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

  componentWillMount() {
    this.props.onIndustryList();
    this.props.onCategoryList();
  }

  componentWillUnmount() {
    this.props.onUnmountIndustry();
    this.props.onUnmountCategory();
  }

  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null) {
      return row[id] !== undefined
        ? String(row[id].toLowerCase()).indexOf(filter.value.toLowerCase()) !==
            -1
        : true;
    }
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { category, industry } = this.state;
    console.log("asdqwew;asdad;A: ", category, industry);
    this.props.onCategorySubmit({
      industry: industry.value,
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
    const industries = this.props.industries.industries
      ? this.props.industries.industries.map(industry => {
          return { value: industry.id, label: industry.name };
        })
      : null;

    const { industry } = this.state;
    const value = industry && industry.value;

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
          data={this.props.categories.categories}
          loading={this.props.categories.fetchLoading}
          defaultFilterMethod={this.filterCaseInsensitive}
          {...this.tableProps}
        />
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
    onIndustryList,
    onUnmountIndustry,
    onUnmountCategory,
    onCategoryList,
    onCategoryDelete
  }
)(Categories);
