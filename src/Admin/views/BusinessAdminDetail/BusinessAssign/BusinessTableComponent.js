import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import moment from "moment";
import debounce from "lodash.debounce";
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

import {
  Tooltip,
  PaginationComponent,
  Chip,
  Select
} from "../../../../Common/components";

import {
  onAssignBusinessList,
  onFilterClearedAssignBusiness,
  handleOnAssignBusinessFilterChange,
  handleSearchKeywordClearedAssignBusiness,
  handleSortChangeAssignBusiness,
  onAreaList,
  handleOnAreaFilterChange,
  // onAssignBusinessEachRemove,
  onIndustryList,
  onUnmountIndustry,
  onAssignedPathSubmit
} from "../../../actions";

import { MAIN_URL } from "../../../config/ADMIN_API";

class BusinessTableComponent extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.assignedPathSubmit && !nextProps.error && !nextProps.loading
      ? { path: "", selectedBusiness: [], assignedPathSubmit: false }
      : null;

  state = { selectedBusiness: [], path: "", assignedPathSubmit: false };

  tableProps = {
    columns: [
      {
        Header: "Business Name",
        id: "name",
        accessor: "business_name",
        width: 220,
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
        Header: "Assign",
        accessor: "id",
        id: "assign",
        filterable: false,
        sortable: false,
        Cell: ({ original: { business_name, id, branches, logo } }) => {
          if (!branches || !branches.length) return <div />;
          return branches.map(branch => (
            <div key={branch.addressID}>
              <FormGroup check>
                <Label check>
                  <Input
                    disabled={branch.assigned}
                    checked={
                      this.state.selectedBusiness.find(
                        business =>
                          id === business.id &&
                          branch.addressID === business.addressID
                      ) !== undefined
                    }
                    onChange={() => {
                      // // console.log(value);
                      // console.log(
                      //   this.state.selectedBusiness.find(
                      //     business =>
                      //       id === business.id &&
                      //       branch.addressID === business.addressID
                      //   )
                      // );
                      this.setState({
                        selectedBusiness: this.state.selectedBusiness.find(
                          business =>
                            id === business.id &&
                            branch.addressID === business.addressID
                        )
                          ? this.state.selectedBusiness.filter(
                              business =>
                                business.id !== id ||
                                branch.addressID !== business.addressID
                            )
                          : [
                              ...this.state.selectedBusiness,
                              {
                                id,
                                business_name,
                                addressID: branch.addressID,
                                addressName: branch.name,
                                logoURI: `${MAIN_URL}${logo}`,
                                landmark: branch.landmark
                              }
                            ]
                      });
                    }}
                    type="checkbox"
                  />
                  {branch.name}, {branch.landmark}
                </Label>
              </FormGroup>
            </div>
          ));
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
    this.props.onAreaList({ page: 1, rows: 15 });
    this.props.onAssignBusinessList();
  };

  componentWillUnmount = () => {
    this.props.onUnmountIndustry();
  };

  handleChange = (key, event) =>
    this.props.handleOnAssignBusinessFilterChange({
      [key]: event.target.value
    });

  // handleIndustryChange = industry =>
  //   this.props.handleOnAssignBusinessFilterChange({ industry });

  handleSearchKeywordSubmit = event => {
    event.preventDefault();
    this.props.onAssignBusinessList();
  };

  assignBusinessSubmit = event => {
    event.preventDefault();

    const mongoId = this.props.selectedUser.mongo_id;
    const name = this.state.path;
    const bs = this.state.selectedBusiness.map(business => ({
      business: business.id,
      addressID: business.addressID
    }));

    this.setState({ assignedPathSubmit: true }, () =>
      this.props.onAssignedPathSubmit({
        mongoId,
        body: { name, bs }
      })
    );
  };

  debouncedAreaAutocomplete = debounce(
    name => this.props.handleOnAreaFilterChange({ name }),
    200
  );

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
                            onChange={industry =>
                              this.props.handleOnAssignBusinessFilterChange({
                                industry
                              })
                            }
                            options={this.props.industries}
                            placeholder="Filter Industry"
                            value={this.props.industry}
                            valueKey="id"
                          />

                          <Select
                            clearable
                            multi
                            isLoading={this.props.areasFetchLoading}
                            onInputChange={this.debouncedAreaAutocomplete}
                            value={this.props.area}
                            onChange={area =>
                              this.props.handleOnAssignBusinessFilterChange({
                                area
                              })
                            }
                            valueKey="id"
                            labelKey="name"
                            filterOptions={options => options}
                            options={this.props.areas.filter(
                              area =>
                                !this.props.area
                                  .map(filter => filter.id)
                                  .includes(area.id)
                            )}
                            placeholder="Filter Area"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="1" md="1">
                        {/* <Button
                          color="primary"
                          onClick={this.props.onAssignBusinessList}
                        >
                          <i className="fa fa-filter" /> Filter
                        </Button> */}
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
            <Card>
              <CardHeader>
                <strong>
                  Assign Path
                  {this.props.selectedUser &&
                    ` to ${this.props.selectedUser.username}`}
                </strong>
              </CardHeader>
              <CardBody>
                {!this.props.selectedUser ? (
                  <div>Select User to Assign Path</div>
                ) : (
                  <Form onSubmit={this.assignBusinessSubmit}>
                    <Row>
                      <Input
                        placeholder="Enter Path Name"
                        required
                        onChange={event =>
                          this.setState({ path: event.target.value })
                        }
                        value={this.state.path}
                      />
                    </Row>
                    <Row>
                      {this.state.selectedBusiness.map(business => (
                        <Chip
                          key={business.addressID}
                          title={business.business_name}
                          subtitle={`${business.addressName},${
                            business.landmark
                          }`}
                          uri={business.logoURI}
                          onClose={() =>
                            this.setState({
                              selectedBusiness: this.state.selectedBusiness.filter(
                                b =>
                                  b.id !== business.id ||
                                  b.addressID !== business.addressID
                              )
                            })
                          }
                        />
                      ))}
                    </Row>
                    <Row>
                      {!this.state.selectedBusiness.length ? (
                        <div>Select atleast one business</div>
                      ) : (
                        <Button color="primary">Assign</Button>
                      )}
                    </Row>
                  </Form>
                )}
              </CardBody>
            </Card>
            {!this.props.area.length ? (
              <p>Area filter must be selected</p>
            ) : (
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
            )}
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
        rowCountAssignBusiness,
        assignedPathLoading,
        assignedPathError
      },
      filterAssignBusiness,
      industries,
      general_setup: { areas, areasFetchLoading }
    }
  }) => ({
    industries: industries.industries,
    industryLoading: industries.loading,
    loading: assignedPathLoading,
    error: assignedPathError,
    assignBusinesses,
    pagesAssignBusiness,
    rowCountAssignBusiness,
    fetchAssignBusinessLoading,
    areas,
    areasFetchLoading,
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
    onUnmountIndustry,
    onAssignedPathSubmit,
    handleOnAreaFilterChange,
    onAreaList
  }
)(BusinessTableComponent);
