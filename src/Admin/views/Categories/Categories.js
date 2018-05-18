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
import {
  PopoverDelete,
  Select,
  PaginationComponent
} from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";
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
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.categorySubmit && !nextProps.error && !nextProps.loading
      ? { category: "", categorySubmit: false }
      : null;

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
      { Header: "Category", accessor: "name" },
      {
        Header: "Industry",
        accessor: "industry",
        Cell: ({ value }) => {
          const industry = this.props.industries.find(
            industry => industry.id === value
          );
          return industry ? industry.name : "Not Found";
        },
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              found = found || filter.value[i].id === row.industry;
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
              onClick={() => this.props.onCategoryDelete({ id: value })}
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
    this.props.onIndustryList();
    this.props.onCategoryList();
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.categorySubmit && prevProps.loading)
      this.focusableInput.focus();
  };

  componentWillUnmount() {
    this.props.onUnmountIndustry();
    this.props.onUnmountCategory();
  }

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
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
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
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { industries: { industries }, categories } }) => ({
    industries,
    ...categories
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
