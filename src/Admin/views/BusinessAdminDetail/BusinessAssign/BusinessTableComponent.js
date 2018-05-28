import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import moment from "moment";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Form,
  Label
} from "reactstrap";

import Select from "react-select";
import {
  Tooltip,
  PopoverDelete,
  PaginationComponent
} from "../../../../Common/components";

import {
  onAssignBusinessList,
  onFilterClearedAssignBusiness,
  handleOnAssignBusinessFilterChange,
  handleSearchKeywordClearedAssignBusiness,
  handleSortChangeAssignBusiness,
  // onAssignBusinessEachRemove,
  onIndustryList,
  onUnmountIndustry
} from "../../../actions";

class BusinessTableComponent extends Component {
  state = { selectedBusiness: [] };
  tableProps = {
    columns: [
      {
        Header: "Assign",
        accessor: "id",
        id: "assign",
        Cell: ({ value }) => (
          <FormGroup check>
            <Label check>
              <Input
                checked={this.state.selectedBusiness.includes(value)}
                onChange={() => {
                  console.log(value);
                  this.setState({
                    selectedBusiness: this.state.selectedBusiness.includes(
                      value
                    )
                      ? this.state.selectedBusiness.filter(
                          business => business !== value
                        )
                      : [...this.state.selectedBusiness, value]
                  });
                }}
                type="checkbox"
              />{" "}
              Check to assign
            </Label>
          </FormGroup>
        )
      },
      {
        Header: "Business Name",
        id: "name",
        accessor: "business_name",
        minWidth: 150,
        Cell: props => {
          const business = props.original;
          return (
            <div style={{ paddingLeft: "10px" }}>
              <Link to={`/${business.slug}`}>
                <strong>{props.value}</strong>
              </Link>
              <div>Email: {business.business_email}</div>
              <div>Mobile: {business.phone_number}</div>
              {business.creation && (
                <Tooltip
                  content={business.creation.created_date.slice(0, 10)}
                  placement="right"
                  id={`Tooltip-created-date-${business.id}`}
                >
                  <span id={`Tooltip-created-date-${business.id}`}>
                    Joined: {moment(business.creation.created_date).fromNow()}
                  </span>
                </Tooltip>
              )}
            </div>
          );
        }
      },
      {
        Header: "Profile",
        accessor: "is_active",
        width: 110,
        Cell: ({ value }) => <div>{value ? "Active" : "Not Active"}</div>,
        sortable: false,
        filterable: false
      },
      {
        Header: "Claimed",
        accessor: "claimed",
        width: 110,
        Cell: ({ value }) => <div>{value ? "Claimed" : "Not Claimed"}</div>,
        sortable: false,
        filterable: false
      },
      {
        Header: "Verified",
        accessor: "verified",
        width: 110,
        Cell: ({ value }) => <div>{value ? "Verified" : "Not Verified"}</div>,
        sortable: false,
        filterable: false
      },
      {
        Header: "Actions",
        accessor: "slug",
        width: 170,
        Cell: props => (
          <div>
            <Button
              color="primary"
              className="mr-2"
              onClick={() => {
                this.props.history.push(
                  `${this.props.match.path}/${props.value}/review`
                );
              }}
            >
              <i className="fa fa-pencil" /> Review
            </Button>

            {/* <PopoverDelete
              id={`delete-${props.original.id}`}
              onClick={
                () => console.log(props.original.id)
                // this.props.onAssignBusinessEachRemove({ id: props.original.id })
              }
            /> */}
          </div>
        ),
        sortable: false,
        filterable: false
      }
    ],
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    manual: true,
    sortable: true,
    minRows: 5,
    className: "-striped -highlight",
    PaginationComponent
  };

  componentDidMount = () => {
    this.props.onIndustryList();
    // this.props.onAssignBusinessList();
    this.props.onAssignBusinessList();
  };

  componentWillUnmount = () => {
    this.props.onUnmountIndustry();
  };

  handleChange = (key, event) =>
    this.props.handleOnAssignBusinessFilterChange({
      [key]: event.target.value
    });

  handleIndustryChange = industry =>
    this.props.handleOnAssignBusinessFilterChange({ industry });

  handleSearchKeywordSubmit = event => {
    event.preventDefault();
    this.props.onAssignBusinessList();
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Business table</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" md="12">
                <Card>
                  <CardHeader>
                    <strong>Filter and Search</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6" md="4">
                        <FormGroup>
                          <Select
                            // autosize
                            disabled={this.props.industryLoading}
                            isLoading={this.props.industryLoading}
                            labelKey="name"
                            multi
                            onChange={this.handleIndustryChange}
                            options={this.props.industries}
                            placeholder="Filter Industry"
                            value={this.props.industry}
                            valueKey="id"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="1" md="1">
                        <Button
                          color="primary"
                          onClick={this.props.onAssignBusinessList}
                        >
                          <i className="fa fa-filter" /> Filter
                        </Button>
                      </Col>
                      <Col xs="1" md="1">
                        <FormGroup>
                          <Button
                            color="danger"
                            onClick={this.props.onFilterClearedAssignBusiness}
                          >
                            <i className="fa fa-close" /> Clear
                          </Button>
                        </FormGroup>
                      </Col>
                      <Col xs="6" md="4">
                        <Form onSubmit={this.handleSearchKeywordSubmit}>
                          <InputGroup>
                            <Input
                              placeholder="Search for Business Name"
                              onChange={this.handleChange.bind(null, "q")}
                              value={this.props.q}
                            />
                            <InputGroupAddon addonType="append">
                              <Button color="warning">
                                <i className="fa fa-search" /> Search{" "}
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                          {/* <Input
                        placeholder="Search for Business Name"
                        onChange={this.handleChange.bind(null, "q")}
                        value={this.props.q}
                      />

                      <FormGroup>
                        <Button color="primary">
                          <i className="fa fa-search" /> Search
                        </Button>
                      </FormGroup> */}
                        </Form>
                      </Col>
                      <Col xs="2" md="1">
                        <FormGroup>
                          <Button
                            color="danger"
                            onClick={
                              this.props
                                .handleSearchKeywordClearedAssignBusiness
                            }
                          >
                            <i className="fa fa-close" /> Clear Search
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {this.state.selectedBusiness}

            <ReactTable
              {...this.tableProps}
              style={{ background: "white" }}
              data={this.props.assignBusinesses}
              defaultPageSize={this.props.rows}
              defaultSorted={this.props.sort_by}
              loading={this.props.fetchAssignBusinessLoading}
              onPageChange={pageIndex => {
                this.props.onAssignBusinessList({ page: pageIndex + 1 });
              }}
              onPageSizeChange={(pageSize, pageIndex) =>
                this.props.onAssignBusinessList({
                  page: pageIndex + 1,
                  rows: pageSize
                })
              }
              onSortedChange={this.props.handleSortChangeAssignBusiness}
              page={this.props.page - 1}
              pages={this.props.pagesAssignBusiness}
              rowCount={this.props.rowCountAssignBusiness}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      business_reducer: {
        assignBusinesses,
        fetchAssignBusinessLoading,
        pagesAssignBusiness,
        rowCountAssignBusiness
      },
      filterAssignBusiness,
      industries
    }
  }) => ({
    industries: industries.industries,
    industryLoading: industries.loading,
    assignBusinesses,
    pagesAssignBusiness,
    rowCountAssignBusiness,
    fetchAssignBusinessLoading,
    ...filterAssignBusiness
  }),
  {
    onAssignBusinessList,
    // onAssignBusinessEachRemove,
    // onBusinessEachDelete,
    onIndustryList,
    onFilterClearedAssignBusiness,
    handleOnAssignBusinessFilterChange,
    handleSearchKeywordClearedAssignBusiness,
    handleSortChangeAssignBusiness,
    onUnmountIndustry
  }
)(BusinessTableComponent);
