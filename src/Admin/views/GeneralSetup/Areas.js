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
  onDistrictEachList,
  onAreaSubmit,
  onAreaList,
  onCityList,
  onDistrictList,
  onStateList,
  handleOnStateFilterChange,
  handleOnDistrictFilterChange,
  handleOnCityFilterChange,
  handleOnAreaFilterChange,
  handleSortChangeArea,
  onAreaDelete,
  onUnmountCountry,
  onUnmountState,
  onUnmountDistrict,
  onUnmountCity,
  onUnmountArea
} from "../../actions";

class Areas extends Component {
  state = {
    country: "",
    state: "",
    district: "",
    city: "",
    area: "",
    areaSubmit: false
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
      { Header: "Area", accessor: "name", id: "area" },
      {
        Header: "City",
        accessor: "city",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            isLoading={this.props.citiesFetchLoading}
            onInputChange={this.debouncedCityAutocomplete}
            value={this.props.filterCity}
            onChange={filterCity =>
              this.props.handleOnAreaFilterChange({ filterCity })
            }
            valueKey="id"
            labelKey="name"
            filterOptions={options => options}
            options={
              !this.props.citiesFetchLoading
                ? this.props.cities.filter(
                    city =>
                      !this.props.filterCity.length ||
                      !this.props.filterCity.map(x => x.id).includes(city.id)
                  )
                : []
            }
            noResultsText={
              !this.props.citiesFetchLoading ? "No Results Found" : "Loading..."
            }
          />
        )
      },
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
              this.props.handleOnAreaFilterChange({ filterDistrict })
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
              this.props.handleOnAreaFilterChange({ filterState })
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
              this.props.handleOnAreaFilterChange({ filterCountry })
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
              onClick={() => this.props.onAreaDelete({ id: value })}
            />
          </div>
        )
      }
    ],
    onFilteredChange: (column, value) => {
      value.id === "area" && this.debouncedSearch(column);
    },
    manual: true,
    filterable: true,
    sortable: true,
    minRows: 5,
    className: "-striped -highlight",
    PaginationComponent
  };

  componentDidMount() {
    this.props.onCountryList();
    this.props.onAreaList();
    this.props.onCityList({ rows: 50, page: 1 });
    this.props.onDistrictList({ rows: 50, page: 1 });
    this.props.onStateList({ rows: 50, page: 1 });
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.areaSubmit && !this.props.loading) {
      const updates = { areaSubmit: false };
      if (!this.props.error) {
        updates.area = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount() {
    this.props.onUnmountCountry();
    this.props.onUnmountState();
    this.props.onUnmountDistrict();
    this.props.onUnmountCity();
    this.props.onUnmountArea();
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnAreaFilterChange({
        name: column.filter(x => x.id === "area").length
          ? column.find(x => x.id === "area").value
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

  debouncedCityAutocomplete = debounce(name =>
    this.props.handleOnCityFilterChange({
      name,
      filterCountry: this.props.filterCountry,
      filterState: this.props.filterState,
      filterDistrict: this.props.filterDistrict
    })
  );

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();

    const { area, city } = this.state;

    this.setState({ areaSubmit: true }, () =>
      this.props.onAreaSubmit({ area, city: city.id })
    );
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({ state: "", district: "", city: "" });
      value && this.props.onCountryEachList({ id: value.id });
    } else if (key === "state") {
      this.setState({ district: "", city: "" });
      value && this.props.onStateEachList({ id: value.id });
    } else if (key === "district") {
      this.setState({ city: "" });
      value && this.props.onDistrictEachList({ id: value.id });
    }
  };

  render() {
    console.log("areas props: ", this.props);
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="10">
            <Card>
              <CardHeader>
                <strong>Add Area</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Countries">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="Countries"
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
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="States">State</Label>
                        <Select
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="States"
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
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Districts">District</Label>
                        <Select
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="Districts"
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
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Cities">City</Label>
                        <Select
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="Cities"
                          className="select-industry"
                          value={this.state.city}
                          onChange={this.handleSelectChange.bind(this, "city")}
                          options={
                            this.state.district ? this.props.partialCities : []
                          }
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="8">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-industry" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          innerRef={ref => (this.focusableInput = ref)}
                          disabled={this.props.loading}
                          type="text"
                          placeholder="Type Area Name"
                          value={this.state.area}
                          onChange={this.onChange.bind(this, "area")}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="12" md="4">
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
          data={this.props.areas}
          pageSize={this.props.rows}
          sorted={this.props.sortby}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex => {
            this.props.onAreaList({ page: pageIndex + 1 });
          }}
          onPageSizeChange={(pageSize, pageIndex) => {
            this.props.onAreaList({
              page: pageIndex + 1,
              rows: pageSize
            });
          }}
          onSortedChange={this.props.handleSortChangeArea}
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
        districtData,
        areaLoading,
        areaError,
        areas,
        cities,
        citiesFetchLoading,
        districts,
        districtsFetchLoading,
        states,
        statesFetchLoading,
        areasFetchLoading,
        areasPages,
        areasRowCount
      },
      filterArea
    }
  }) => ({
    countries,
    partialStates: countryData,
    partialDistricts: stateData,
    partialCities: districtData,
    loading: areaLoading,
    error: areaError,
    cities,
    citiesFetchLoading,
    areas,
    districts,
    districtsFetchLoading,
    states,
    statesFetchLoading,
    fetchLoading: areasFetchLoading,
    pages: areasPages,
    rowCount: areasRowCount,
    ...filterArea
  }),
  {
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onAreaSubmit,
    onAreaList,
    onCityList,
    onDistrictList,
    onStateList,
    handleOnStateFilterChange,
    handleOnDistrictFilterChange,
    handleOnCityFilterChange,
    handleOnAreaFilterChange,
    handleSortChangeArea,
    onAreaDelete,
    onUnmountCountry,
    onUnmountState,
    onUnmountDistrict,
    onUnmountCity,
    onUnmountArea
  }
)(Areas);
