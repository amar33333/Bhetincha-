import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Select from "react-select";
import moment from "moment";
import {
  Button,
  Row,
  Col,
  Label,
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Form,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import {
  Tooltip,
  PopoverDelete,
  PaginationComponent
} from "../../../Common/components";

import {
  onBusinessAllGet,
  onBusinessEachDelete,
  onIndustryList,
  onFilterCleared,
  handleOnBusinessFilterChange,
  handleSearchKeywordCleared,
  onUnmountIndustry,
  handleSortChangeBusiness
} from "../../actions";

class BusinessList extends Component {
  tableProps = {
    columns: [
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
              onClick={() =>
                this.props.history.push(
                  `${this.props.match.path}/${props.value}/edit`
                )
              }
            >
              <i className="fa fa-pencil" /> Edit
            </Button>

            <PopoverDelete
              id={`delete-${props.original.id}`}
              onClick={() =>
                this.props.onBusinessEachDelete({ id: props.original.id })
              }
            />
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
    PaginationComponent
  };

  componentDidMount = () => {
    this.props.onIndustryList();
    this.props.onBusinessAllGet();
  };

  componentWillUnmount = () => {
    this.props.onUnmountIndustry();
  };

  handleChange = (key, event) =>
    this.props.handleOnBusinessFilterChange({ [key]: event.target.value });

  handleIndustryChange = industry =>
    this.props.handleOnBusinessFilterChange({ industry });

  handleSearchKeywordSubmit = event => {
    event.preventDefault();
    this.props.onBusinessAllGet();
  };

  render() {
    return (
      <div className="animated fadeIn">
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
                      onClick={this.props.onBusinessAllGet}
                    >
                      <i className="fa fa-filter" /> Filter
                    </Button>
                  </Col>
                  <Col xs="1" md="1">
                    <FormGroup>
                      <Button
                        color="danger"
                        onClick={this.props.onFilterCleared}
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
                        onClick={this.props.handleSearchKeywordCleared}
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
        <Row>
          <Col xs="12">
            <ReactTable
              style={{ background: "white" }}
              className="-striped -highlight"
              data={this.props.businesses}
              defaultPageSize={this.props.rows}
              defaultSorted={this.props.sort_by}
              loading={this.props.fetchLoading}
              onPageChange={pageIndex => {
                this.props.onBusinessAllGet({ page: ++pageIndex });
              }}
              onPageSizeChange={(pageSize, pageIndex) =>
                this.props.onBusinessAllGet({
                  page: ++pageIndex,
                  rows: pageSize
                })
              }
              onSortedChange={this.props.handleSortChangeBusiness}
              page={this.props.page - 1}
              pages={this.props.pages}
              rowCount={100}
              {...this.tableProps}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      business_reducer: { businesses, fetchLoading, pages },
      filterBusiness,
      industries
    }
  }) => ({
    industries: industries.industries,
    industryLoading: industries.loading,
    businesses,
    pages,
    fetchLoading,
    ...filterBusiness
  }),
  {
    onBusinessAllGet,
    onBusinessEachDelete,
    onIndustryList,
    onFilterCleared,
    handleOnBusinessFilterChange,
    handleSearchKeywordCleared,
    handleSortChangeBusiness,
    onUnmountIndustry
  }
)(BusinessList);
