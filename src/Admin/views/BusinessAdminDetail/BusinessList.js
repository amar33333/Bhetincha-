import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Select from "react-select";
import moment from "moment";
import debounce from "lodash.debounce";
import {
  Button,
  Row,
  Col,
  Label,
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
  onCountryList,
  onFilterCleared,
  handleOnStateFilterChange,
  handleOnDistrictFilterChange,
  handleOnCityFilterChange,
  handleOnAreaFilterChange,
  handleOnCategoryFilterChange,
  handleOnSubCategoryFilterChange,
  handleOnBusinessFilterChange,
  handleSearchKeywordCleared,
  onUnmountIndustry,
  handleSortChangeBusiness,
  onBusinessVerify
} from "../../actions";

class BusinessList extends Component {
  state = {
    categorySearchText: "",
    subCategorySearchText: "",
    stateSearchText: "",
    districtSearchText: "",
    citySearchText: "",
    areaSearchText: "",
    q: ""
  };

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

            <Button
              color="primary"
              className="mr-2"
              onClick={() =>
                this.props.history.push({
                  pathname: `${this.props.match.path}/${
                    props.value
                  }/manage-branchs`,
                  state: {
                    id: props.original.id,
                    slug: props.original.slug
                  }
                })
              }
            >
              <i className="fa fa-pencil" /> Manage Branchs
            </Button>

            <Button
              color="success"
              className="mr-2"
              onClick={() => {
                console.log("verify button clicked: ", props);
                this.props.onBusinessVerify({
                  id: props.original.id,
                  body: {
                    verified: true
                  }
                });
              }}
            >
              <i className="fa fa-pencil" /> Verify
            </Button>
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

  componentDidMount = () => {
    this.props.onIndustryList();
    this.props.onCountryList();
    this.props.onBusinessAllGet();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.q !== this.props.q) {
      this.setState({ q: this.props.q });
    }
  }

  componentWillUnmount = () => {
    this.props.onUnmountIndustry();
  };

  handleChange = (key, event) => this.setState({ [key]: event.target.value });
  // this.props.handleOnBusinessFilterChange({ [key]: event.target.value });

  handleIndustryChange = industry =>
    this.props.handleOnBusinessFilterChange({ industry });

  handleSearchKeywordSubmit = event => {
    event.preventDefault();
    this.props.handleOnBusinessFilterChange({ q: this.state.q });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Filters</strong>
                <Button
                  className="pull-right"
                  color="link"
                  onClick={this.props.onFilterCleared}
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
                            this.props.handleOnBusinessFilterChange({
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
                            this.props.handleOnBusinessFilterChange({
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
                            this.props.handleOnBusinessFilterChange({
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
                            this.props.handleOnBusinessFilterChange({
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
                                this.debouncedStateAutocomplete(stateSearchText)
                            );
                          }}
                          value={this.props.filterState}
                          onChange={filterState =>
                            this.props.handleOnBusinessFilterChange({
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
                            this.props.handleOnBusinessFilterChange({
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
                                this.debouncedCityAutocomplete(citySearchText)
                            );
                          }}
                          value={this.props.filterCity}
                          onChange={filterCity =>
                            this.props.handleOnBusinessFilterChange({
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
                                this.debouncedAreaAutocomplete(areaSearchText)
                            );
                          }}
                          value={this.props.filterArea}
                          onChange={filterArea =>
                            this.props.handleOnBusinessFilterChange({
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
        <Row>
          <Col xs="12">
            <Button
              className="float-right"
              color="link"
              onClick={this.props.handleSearchKeywordCleared}
            >
              <i className="fa fa-close" /> Clear Search
            </Button>
            <Form onSubmit={this.handleSearchKeywordSubmit}>
              <FormGroup>
                <InputGroup>
                  <Input
                    placeholder="Search for Business Name"
                    onChange={this.handleChange.bind(null, "q")}
                    value={this.state.q}
                  />
                  <InputGroupAddon addonType="append">
                    <Button color="warning">
                      <i className="fa fa-search" /> Search{" "}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <ReactTable
              {...this.tableProps}
              style={{ background: "white" }}
              data={this.props.businesses}
              defaultPageSize={this.props.rows}
              defaultSorted={this.props.sort_by}
              loading={this.props.fetchLoading}
              onPageChange={pageIndex => {
                this.props.onBusinessAllGet({ page: pageIndex + 1 });
              }}
              onPageSizeChange={(pageSize, pageIndex) =>
                this.props.onBusinessAllGet({
                  page: pageIndex + 1,
                  rows: pageSize
                })
              }
              onSortedChange={this.props.handleSortChangeBusiness}
              page={this.props.page - 1}
              pages={this.props.pages}
              rowCount={this.props.rowCount}
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
      business_reducer: { businesses, fetchLoading, pages, rowCount },
      categories: { categories, fetchLoading: categoriesFetchLoading },
      sub_categories: {
        subCategories,
        fetchLoading: subCategoriesFetchLoading
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
      filterBusiness,
      industries: { industries, fetchLoading: industriesFetchLoading }
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
    businesses,
    pages,
    rowCount,
    fetchLoading,
    ...filterBusiness
  }),
  {
    onBusinessAllGet,
    onBusinessEachDelete,
    onIndustryList,
    onCountryList,
    onFilterCleared,
    handleOnStateFilterChange,
    handleOnDistrictFilterChange,
    handleOnCityFilterChange,
    handleOnAreaFilterChange,
    handleOnCategoryFilterChange,
    handleOnSubCategoryFilterChange,
    handleOnBusinessFilterChange,
    handleSearchKeywordCleared,
    handleSortChangeBusiness,
    onUnmountIndustry,
    onBusinessVerify
  }
)(BusinessList);
