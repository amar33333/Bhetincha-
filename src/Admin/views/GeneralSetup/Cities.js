import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import debounce from "lodash.debounce";
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
  Card,
  CardBody,
  CardHeader,
  Label
} from "reactstrap";
import {
  Select,
  PopoverDelete,
  PaginationComponent
} from "../../../Common/components";

import {
  onCountryList,
  onCountryEachList,
  onStateEachList,
  onCitySubmit,
  onCityList,
  onDistrictList,
  onStateList,
  handleOnStateFilterChange,
  handleOnDistrictFilterChange,
  handleOnCityFilterChange,
  handleSortChangeCity,
  onCityDelete,
  onUnmountCountry,
  onUnmountState,
  onUnmountDistrict,
  onUnmountCity
} from "../../actions";

class Cities extends Component {
  state = {
    country: "",
    state: "",
    district: "",
    city: "",
    citySubmit: false
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
      { Header: "City", accessor: "name", id: "city" },
      {
        Header: "District",
        accessor: "district",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            isLoading={this.props.districtsFetchLoading}
            onInputChange={this.debouncedDistrictAutocomplete}
            value={this.props.filterDistrict}
            onChange={filterDistrict =>
              this.props.handleOnCityFilterChange({ filterDistrict })
            }
            valueKey="id"
            labelKey="name"
            filterOptions={options => options}
            options={
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
              !this.props.districtsFetchLoading
                ? "No Results Found"
                : "Loading..."
            }
          />
        )
      },
      {
        Header: "State",
        accessor: "state",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            isLoading={this.props.statesFetchLoading}
            onInputChange={this.debouncedStateAutocomplete}
            value={this.props.filterState}
            onChange={filterState =>
              this.props.handleOnCityFilterChange({ filterState })
            }
            valueKey="id"
            labelKey="name"
            filterOptions={options => options}
            options={
              !this.props.statesFetchLoading
                ? this.props.states.filter(
                    state =>
                      !this.props.filterState.length ||
                      !this.props.filterState.map(x => x.id).includes(state.id)
                  )
                : []
            }
            noResultsText={
              !this.props.statesFetchLoading ? "No Results Found" : "Loading..."
            }
          />
        )
      },
      {
        Header: "Country",
        accessor: "country",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            value={this.props.filterCountry}
            onChange={filterCountry =>
              this.props.handleOnCityFilterChange({ filterCountry })
            }
            valueKey="id"
            labelKey="name"
            options={this.props.countries}
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
              onClick={() => this.props.onCityDelete({ id: value })}
            />
          </div>
        )
      }
    ],
    onFilteredChange: (column, value) =>
      value.id === "city" && this.debouncedSearch(column),
    manual: true,
    filterable: true,
    minRows: 5,
    className: "-striped -highlight",
    PaginationComponent
  };

  componentDidMount() {
    this.props.onCountryList();
    this.props.onCityList();
    this.props.onDistrictList({ rows: 50, page: 1 });
    this.props.onStateList({ rows: 50, page: 1 });
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.citySubmit && !this.props.loading) {
      const updates = { citySubmit: false };
      if (!this.props.error) {
        updates.city = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount() {
    this.props.onUnmountCountry();
    this.props.onUnmountState();
    this.props.onUnmountDistrict();
    this.props.onUnmountCity();
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnCityFilterChange({
        name: column.filter(x => x.id === "city").length
          ? column.find(x => x.id === "city").value
          : ""
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

  debouncedDistrictAutocomplete = debounce(name =>
    this.props.handleOnDistrictFilterChange({
      name,
      filterCountry: this.props.filterCountry,
      filterState: this.props.filterState
    })
  );

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();

    const { city, district } = this.state;

    this.setState({ citySubmit: true }, () =>
      this.props.onCitySubmit({
        city,
        district: district.id
      })
    );
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({ state: "", district: "" });
      value && this.props.onCountryEachList({ id: value.id });
    } else if (key === "state") {
      this.setState({ district: "" });
      value && this.props.onStateEachList({ id: value.id });
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add City</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="Industies">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="countries"
                          className="select-industry"
                          value={this.state.country}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "country"
                          )}
                          options={this.props.countries}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="states">State</Label>
                        <Select
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="states"
                          className="select-industry"
                          value={this.state.state}
                          onChange={this.handleSelectChange.bind(this, "state")}
                          options={
                            this.state.country ? this.props.partialStates : []
                          }
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="District">District</Label>
                        <Select
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="District"
                          className="select-industry"
                          value={this.state.district}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "district"
                          )}
                          options={
                            this.state.state ? this.props.partialDistricts : []
                          }
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="10" md="10">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-industry" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          type="text"
                          disabled={this.props.loading}
                          innerRef={ref => (this.focusableInput = ref)}
                          placeholder="Type City Name"
                          value={this.state.city}
                          onChange={this.onChange.bind(this, "city")}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="2" md="2">
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
          data={this.props.cities}
          pageSize={this.props.rows}
          sorted={this.props.sortby}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex => {
            this.props.onCityList({ page: pageIndex + 1 });
          }}
          onPageSizeChange={(pageSize, pageIndex) => {
            this.props.onCityList({
              page: pageIndex + 1,
              rows: pageSize
            });
          }}
          onSortedChange={this.props.handleSortChangeCity}
          page={this.props.page - 1}
          pages={this.props.pages}
          rowCount={this.props.rowCount}
        />
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      general_setup: {
        countries,
        countryData,
        stateData,
        cityLoading,
        cityError,
        districts,
        districtsFetchLoading,
        cities,
        states,
        statesFetchLoading,
        citiesFetchLoading,
        citiesPages,
        citiesRowCount
      },
      filterCity
    }
  }) => ({
    countries,
    partialStates: countryData,
    partialDistricts: stateData,
    loading: cityLoading,
    error: cityError,
    districts,
    districtsFetchLoading,
    states,
    statesFetchLoading,
    cities,
    fetchLoading: citiesFetchLoading,
    pages: citiesPages,
    rowCount: citiesRowCount,
    ...filterCity
  }),
  {
    onCitySubmit,
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onCityList,
    onDistrictList,
    onStateList,
    handleOnStateFilterChange,
    handleOnDistrictFilterChange,
    handleOnCityFilterChange,
    handleSortChangeCity,
    onCityDelete,
    onUnmountCountry,
    onUnmountState,
    onUnmountDistrict,
    onUnmountCity
  }
)(Cities);
