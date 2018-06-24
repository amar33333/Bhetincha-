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
  handleOnStateFilterChange,
  handleOnDistrictFilterChange,
  handleOnCityFilterChange,
  handleOnAreaFilterChange,
  handleOnCategoryFilterChange,
  handleOnSubCategoryFilterChange,
  handleOnAssignBusinessFilterChange,
  handleSortChangeAssignBusiness,
  onIndustryList,
  onCountryList,
  onUnmountIndustry,
  onAssignedPathSubmit
} from "../../../actions";

import { MAIN_URL } from "../../../config/ADMIN_API";

class BusinessTableComponent extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.assignedPathSubmit && !nextProps.error && !nextProps.loading
      ? { path: "", selectedBusiness: [], assignedPathSubmit: false }
      : null;

  state = {
    selectedBusiness: [],
    path: "",
    assignedPathSubmit: false,
    areaSearchText: ""
  };

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
              <div>Mobile: {business.phone_numberspan}</div>
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
        Header: ({ data }) => {
          const businessess = [];
          let checked = false;
          if (data.length && data[0]._original.branches) {
            data.forEach(
              ({ _original: { id, business_name, branches, logo } }) => {
                branches.forEach(branch => {
                  businessess.push({
                    id,
                    business_name,
                    addressID: branch.addressID,
                    addressName: branch.name,
                    logoURI: `${MAIN_URL}${logo}`,
                    landmark: branch.landmark
                  });
                });
              }
            );
            checked = true;
            businessess.forEach(b => {
              checked =
                checked &&
                this.state.selectedBusiness.find(
                  sB => b.id === sB.id && b.addressID === sB.addressID
                ) !== undefined;
            });
          }

          return (
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={checked}
                  onChange={({ target: { checked } }) => {
                    let selectedBusiness = [...this.state.selectedBusiness];
                    if (checked) {
                      businessess.forEach(b => {
                        if (
                          !selectedBusiness.find(
                            sB => sB.id === b.id && sB.addressID === b.addressID
                          )
                        ) {
                          selectedBusiness.push(b);
                        }
                      });
                    } else {
                      businessess.forEach(b => {
                        selectedBusiness = selectedBusiness.filter(
                          sB => sB.id === b.id || sB.addressID === b.addressID
                        );
                      });
                    }
                    this.setState({ selectedBusiness });
                  }}
                />Assign
              </Label>
            </FormGroup>
          );
        },
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
    this.props.onCountryList();
    // this.props.onAssignBusinessList();
    // this.props.onAreaList({ page: 1, rows: 15 });
    // this.props.onAssignBusinessList();
  };

  componentWillUnmount = () => {
    this.props.onUnmountIndustry();
  };

  debouncedCategoryAutocomplete = debounce(
    name =>
      this.props.handleOnCategoryFilterChange({
        name,
        filterIndustry: this.props.filterIndustry
      }),
    200
  );

  debouncedSubCategoryAutocomplete = debounce(
    name =>
      this.props.handleOnSubCategoryFilterChange({
        name,
        filterIndustry: this.props.filterIndustry,
        filterCategory: this.props.filterCategory
      }),
    200
  );

  debouncedStateAutocomplete = debounce(
    name =>
      this.props.handleOnStateFilterChange({
        name,
        filterCountry: this.props.filterCountry
      }),
    200
  );

  debouncedDistrictAutocomplete = debounce(
    name =>
      this.props.handleOnDistrictFilterChange({
        name,
        filterCountry: this.props.filterCountry,
        filterState: this.props.filterState
      }),
    200
  );

  debouncedCityAutocomplete = debounce(
    name =>
      this.props.handleOnCityFilterChange({
        name,
        filterCountry: this.props.filterCountry,
        filterState: this.props.filterState,
        filterDistrict: this.props.filterDistrict
      }),
    200
  );

  debouncedAreaAutocomplete = debounce(
    name =>
      this.props.handleOnAreaFilterChange({
        name,
        filterCountry: this.props.filterCountry,
        filterState: this.props.filterState,
        filterDistrict: this.props.filterDistrict,
        filterCity: this.props.filterCity
      }),
    200
  );

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
                    <strong>Filters</strong>
                    <Button
                      className="pull-right"
                      color="link"
                      onClick={this.props.onFilterClearedAssignBusiness}
                    >
                      <i className="fa fa-close" /> Clear Filter
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col xs="12" md="4">
                          <FormGroup>
                            <Label for="filterIndustry">Industry</Label>

                            <Select
                              id="filterIndustry"
                              clearable
                              multi
                              tabSelectsValue={false}
                              isLoading={this.props.industriesFetchLoading}
                              value={this.props.filterIndustry}
                              onChange={filterIndustry =>
                                this.props.handleOnAssignBusinessFilterChange({
                                  filterIndustry
                                })
                              }
                              valueKey="id"
                              labelKey="name"
                              options={this.props.industries}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                          <FormGroup>
                            <Label for="filterCategory">Category</Label>

                            <Select
                              clearable
                              id="filterCategory"
                              tabSelectsValue={false}
                              multi
                              isLoading={this.props.categoriesFetchLoading}
                              onInputChange={categorySearchText => {
                                this.setState(
                                  { categorySearchText },
                                  () =>
                                    categorySearchText &&
                                    this.debouncedCategoryAutocomplete(
                                      categorySearchText
                                    )
                                );
                              }}
                              value={this.props.filterCategory}
                              onChange={filterCategory =>
                                this.props.handleOnAssignBusinessFilterChange({
                                  filterCategory
                                })
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
                          </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                          <FormGroup>
                            <Label for="filterSubCategory">Sub Category</Label>

                            <Select
                              clearable
                              id="filterSubCategory"
                              tabSelectsValue={false}
                              multi
                              isLoading={this.props.subCategoriesFetchLoading}
                              onInputChange={subCategorySearchText => {
                                this.setState(
                                  { subCategorySearchText },
                                  () =>
                                    subCategorySearchText &&
                                    this.debouncedSubCategoryAutocomplete(
                                      subCategorySearchText
                                    )
                                );
                              }}
                              value={this.props.filterSubCategory}
                              onChange={filterSubCategory =>
                                this.props.handleOnAssignBusinessFilterChange({
                                  filterSubCategory
                                })
                              }
                              valueKey="id"
                              labelKey="name"
                              filterOptions={options => options}
                              options={
                                this.state.subCategorySearchText &&
                                !this.props.subCategoriesFetchLoading
                                  ? this.props.subCategories.filter(
                                      subCategory =>
                                        !this.props.filterSubCategory.length ||
                                        !this.props.filterSubCategory
                                          .map(x => x.id)
                                          .includes(subCategory.id)
                                    )
                                  : []
                              }
                              noResultsText={
                                this.state.subCategorySearchText &&
                                !this.props.subCategoriesFetchLoading
                                  ? "No Results Found"
                                  : "Start Typing..."
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12" md="4">
                          <FormGroup>
                            <Label for="filterCountry">Country</Label>

                            <Select
                              id="filterCountry"
                              isLoading={this.props.countriesFetchLoading}
                              clearable
                              tabSelectsValue={false}
                              multi
                              value={this.props.filterCountry}
                              onChange={filterCountry =>
                                this.props.handleOnAssignBusinessFilterChange({
                                  filterCountry
                                })
                              }
                              valueKey="id"
                              labelKey="name"
                              options={this.props.countries}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                          <FormGroup>
                            <Label for="filterState">State</Label>

                            <Select
                              id="filterState"
                              clearable
                              tabSelectsValue={false}
                              multi
                              isLoading={this.props.statesFetchLoading}
                              onInputChange={stateSearchText => {
                                this.setState(
                                  { stateSearchText },
                                  () =>
                                    stateSearchText &&
                                    this.debouncedStateAutocomplete(
                                      stateSearchText
                                    )
                                );
                              }}
                              value={this.props.filterState}
                              onChange={filterState =>
                                this.props.handleOnAssignBusinessFilterChange({
                                  filterState
                                })
                              }
                              valueKey="id"
                              labelKey="name"
                              filterOptions={options => options}
                              options={
                                this.state.stateSearchText &&
                                !this.props.statesFetchLoading
                                  ? this.props.states.filter(
                                      state =>
                                        !this.props.filterState.length ||
                                        !this.props.filterState
                                          .map(x => x.id)
                                          .includes(state.id)
                                    )
                                  : []
                              }
                              noResultsText={
                                this.state.stateSearchText &&
                                !this.props.statesFetchLoading
                                  ? "No Results Found"
                                  : "Start Typing..."
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                          <FormGroup>
                            <Label for="filterDistrict">District</Label>

                            <Select
                              id="filterDistrict"
                              clearable
                              tabSelectsValue={false}
                              multi
                              isLoading={this.props.districtsFetchLoading}
                              onInputChange={districtSearchText => {
                                this.setState(
                                  { districtSearchText },
                                  () =>
                                    districtSearchText &&
                                    this.debouncedDistrictAutocomplete(
                                      districtSearchText
                                    )
                                );
                              }}
                              value={this.props.filterDistrict}
                              onChange={filterDistrict =>
                                this.props.handleOnAssignBusinessFilterChange({
                                  filterDistrict
                                })
                              }
                              valueKey="id"
                              labelKey="name"
                              filterOptions={options => options}
                              options={
                                this.state.districtSearchText &&
                                !this.props.districtsFetchLoading
                                  ? this.props.districts.filter(
                                      district =>
                                        !this.props.filterDistrict.length ||
                                        !this.props.filterDistrict
                                          .map(x => x.id)
                                          .includes(district.id)
                                    )
                                  : []
                              }
                              noResultsText={
                                this.state.districtSearchText &&
                                !this.props.districtsFetchLoading
                                  ? "No Results Found"
                                  : "Start Typing..."
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12" md="4">
                          <FormGroup>
                            <Label for="filterCity">City</Label>

                            <Select
                              id="filterCity"
                              clearable
                              tabSelectsValue={false}
                              multi
                              isLoading={this.props.citiesFetchLoading}
                              onInputChange={citySearchText => {
                                this.setState(
                                  { citySearchText },
                                  () =>
                                    citySearchText &&
                                    this.debouncedCityAutocomplete(
                                      citySearchText
                                    )
                                );
                              }}
                              value={this.props.filterCity}
                              onChange={filterCity =>
                                this.props.handleOnAssignBusinessFilterChange({
                                  filterCity
                                })
                              }
                              valueKey="id"
                              labelKey="name"
                              filterOptions={options => options}
                              options={
                                this.state.citySearchText &&
                                !this.props.citiesFetchLoading
                                  ? this.props.cities.filter(
                                      city =>
                                        !this.props.filterCity.length ||
                                        !this.props.filterCity
                                          .map(x => x.id)
                                          .includes(city.id)
                                    )
                                  : []
                              }
                              noResultsText={
                                this.state.citySearchText &&
                                !this.props.citiesFetchLoading
                                  ? "No Results Found"
                                  : "Start Typing..."
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                          <FormGroup>
                            <Label for="filterArea">Area</Label>

                            <Select
                              id="filterArea"
                              clearable
                              tabSelectsValue={false}
                              multi
                              isLoading={this.props.areasFetchLoading}
                              onInputChange={areaSearchText => {
                                this.setState(
                                  { areaSearchText },
                                  () =>
                                    areaSearchText &&
                                    this.debouncedAreaAutocomplete(
                                      areaSearchText
                                    )
                                );
                              }}
                              value={this.props.filterArea}
                              onChange={filterArea =>
                                this.props.handleOnAssignBusinessFilterChange({
                                  filterArea
                                })
                              }
                              valueKey="id"
                              labelKey="name"
                              filterOptions={options => options}
                              options={
                                this.state.areaSearchText &&
                                !this.props.areasFetchLoading
                                  ? this.props.areas.filter(
                                      area =>
                                        !this.props.filterArea.length ||
                                        !this.props.filterArea
                                          .map(x => x.id)
                                          .includes(area.id)
                                    )
                                  : []
                              }
                              noResultsText={
                                this.state.areaSearchText &&
                                !this.props.areasFetchLoading
                                  ? "No Results Found"
                                  : "Start Typing..."
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
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
                          subtitle={`${
                            business.addressName
                          },${business.landmark || ""}`}
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
            {!this.props.filterArea.length ? (
              <p>Area filter must be selected to view business</p>
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
      general_setup: {
        countries,
        countriesFetchLoading,
        states,
        statesFetchLoading,
        districts,
        districtsFetchLoading,
        cities,
        citiesFetchLoading,
        areas,
        areasFetchLoading
      },
      filterAssignBusiness,
      industries: { industries, fetchLoading: industriesFetchLoading },
      categories: { categories, fetchLoading: categoriesFetchLoading },
      sub_categories: { subCategories, fetchLoading: subCategoriesFetchLoading }
    }
  }) => ({
    industries,
    industriesFetchLoading,
    categories,
    categoriesFetchLoading,
    subCategories,
    subCategoriesFetchLoading,
    countries,
    countriesFetchLoading,
    states,
    statesFetchLoading,
    districts,
    districtsFetchLoading,
    cities,
    citiesFetchLoading,
    areas,
    areasFetchLoading,
    loading: assignedPathLoading,
    error: assignedPathError,
    assignBusinesses,
    pagesAssignBusiness,
    rowCountAssignBusiness,
    fetchAssignBusinessLoading,
    ...filterAssignBusiness
  }),
  {
    onAssignBusinessList,
    onIndustryList,
    onFilterClearedAssignBusiness,
    handleOnAssignBusinessFilterChange,
    handleSortChangeAssignBusiness,
    onUnmountIndustry,
    onAssignedPathSubmit,
    handleOnStateFilterChange,
    handleOnDistrictFilterChange,
    handleOnCityFilterChange,
    handleOnAreaFilterChange,
    handleOnCategoryFilterChange,
    handleOnSubCategoryFilterChange,
    onCountryList
  }
)(BusinessTableComponent);
