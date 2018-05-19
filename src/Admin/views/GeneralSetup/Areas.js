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
  onDistrictList,
  onStateList,
  handleOnAreaFilterChange,
  handleSortChangeArea,
  onAreaDelete,
  onCityAutocomplete,
  onUnmountCountry,
  onUnmountState,
  onUnmountDistrict,
  onUnmountArea
} from "../../actions";

class Areas extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.areaSubmit && !nextProps.error && !nextProps.loading
      ? { area: "", areaSubmit: false }
      : null;

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
        Filter: () => (
          <Select
            clearable
            multi
            isLoading={this.props.citiesAutocompleteLoading}
            onInputChange={this.debouncedAutocomplete}
            value={this.props.filterCity}
            onChange={this.handleFilterSelectChange.bind(this, "filterCity")}
            valueKey="id"
            labelKey="name"
            filterOptions={options => options}
            options={this.props.citiesAutocomplete.filter(
              city =>
                !this.props.filterCity
                  .map(filter => filter.id)
                  .includes(city.id)
            )}
          />
        )
      },
      {
        Header: "District",
        accessor: "district",
        Filter: () => (
          <Select
            clearable
            multi
            value={this.props.filterDistrict}
            onChange={this.handleFilterSelectChange.bind(
              this,
              "filterDistrict"
            )}
            valueKey="id"
            labelKey="name"
            options={this.props.districts.filter(district => {
              const { filterCountry, filterState } = this.props;
              if (!filterState.length) {
                if (!filterCountry.length) return true;
                else {
                  let found = false;
                  for (let i = 0; i < filterCountry.length; i++) {
                    const states = this.props.states
                      .filter(state => state.country === filterCountry[i].id)
                      .map(state => state.id);
                    found = found || states.includes(district.state);
                  }
                  return found;
                }
              } else {
                for (let i = 0; i < filterState.length; i++)
                  if (district.state === filterState[i].id) return true;
              }
              return false;
            })}
          />
        )
      },
      {
        Header: "State",
        accessor: "state",
        Filter: () => (
          <Select
            clearable
            multi
            value={this.props.filterState}
            onChange={this.handleFilterSelectChange.bind(this, "filterState")}
            valueKey="id"
            labelKey="name"
            options={this.props.states.filter(state => {
              const { filterCountry } = this.props;
              if (!filterCountry.length) return true;
              for (let i = 0; i < filterCountry.length; i++)
                if (state.country === filterCountry[i].id) return true;
              return false;
            })}
          />
        )
      },
      {
        Header: "Country",
        accessor: "country",
        Filter: () => (
          <Select
            clearable
            multi
            value={this.props.filterCountry}
            onChange={this.handleFilterSelectChange.bind(this, "filterCountry")}
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
    onFilteredChange: (column, value) =>
      value.id === "area" && this.debouncedSearch(column),
    manual: true,
    filterable: true,
    minRows: 5,
    className: "-striped -highlight",
    PaginationComponent
  };

  componentDidMount() {
    this.props.onCountryList();
    this.props.onAreaList();
    this.props.onDistrictList();
    this.props.onStateList();
    this.props.onCityAutocomplete();
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.areaSubmit && prevProps.loading) this.focusableInput.focus();
  };

  componentWillUnmount() {
    this.props.onUnmountCountry();
    this.props.onUnmountState();
    this.props.onUnmountDistrict();
    this.props.onUnmountArea();
  }

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  debouncedSearch = debounce(
    column =>
      this.props.handleOnAreaFilterChange({
        name: column.length ? column[0].value : ""
      }),
    200
  );

  debouncedAutocomplete = debounce(
    keyword => this.props.onCityAutocomplete({ keyword }),
    200
  );

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

  handleFilterSelectChange = (key, value) => {
    if (key === "filterCity")
      this.props.handleOnAreaFilterChange({ filterCity: value });
    else this.updateOtherFilters(key, value);
  };

  updateOtherFilters = (key, value) => {
    const { filterCity } = this.props;
    let changedCity = false;

    let newFilterState = key === "filterState" ? value : this.props.filterState,
      newFilterCity = [],
      newFilterDistrict =
        key === "filterDistrict" ? value : this.props.filterDistrict,
      filterCountry =
        key === "filterCountry" ? value : this.props.filterCountry;

    if (newFilterState.length) {
      if (filterCountry.length) {
        newFilterState = newFilterState.filter(filter => {
          let found = false;
          for (let i = 0; i < filterCountry.length; i++) {
            found = found || filter.country === filterCountry[i].id;
            if (found) break;
          }
          return found;
        });
      }
    }
    if (newFilterDistrict.length) {
      if (newFilterState.length) {
        newFilterDistrict = newFilterDistrict.filter(filter => {
          let found = false;
          for (let i = 0; i < newFilterState.length; i++) {
            found = found || filter.state === newFilterState[i].id;
            if (found) break;
          }
          return found;
        });
      } else if (filterCountry.length) {
        newFilterDistrict = newFilterDistrict.filter(filter => {
          let found = false;
          for (let i = 0; i < filterCountry.length; i++) {
            const states = this.props.states
              .filter(state => state.country === filterCountry[i].id)
              .map(state => state.id);
            found = found || states.includes(filter.state);
            if (found) break;
          }
          return found;
        });
      }
    }

    if (filterCity.length) {
      if (newFilterDistrict.length) {
        newFilterCity = filterCity.filter(filter => {
          let found = false;
          for (let i = 0; i < newFilterDistrict.length; i++) {
            found = found || filter.district === newFilterDistrict[i].id;
            if (found) break;
          }
          changedCity = !found;
          return found;
        });
      } else if (newFilterState.length) {
        newFilterCity = filterCity.filter(filter => {
          let found = false;
          for (let i = 0; i < newFilterState.length; i++) {
            const districts = this.props.districts
              .filter(district => district.state === newFilterState[i].id)
              .map(district => district.id);
            found = found || districts.includes(filter.district);
            if (found) break;
          }
          changedCity = !found;
          return found;
        });
      } else if (filterCountry.length) {
        newFilterCity = filterCity.filter(filter => {
          let found = false;
          for (let i = 0; i < filterCountry.length; i++) {
            const states = this.props.states
              .filter(state => state.country === filterCountry[i].id)
              .map(state => state.id);
            const districts = this.props.districts
              .filter(district => states.includes(district.state))
              .map(district => district.id);
            found = found || districts.includes(filter.district);
            if (found) break;
          }
          changedCity = !found;
          return found;
        });
      }
    }
    const toUpdate = {};
    toUpdate.filterDistrict = newFilterDistrict;
    toUpdate.filterState = newFilterState;
    toUpdate.filterCountry = filterCountry;
    if (changedCity) toUpdate.filterCity = newFilterCity;
    this.props.handleOnAreaFilterChange(toUpdate);
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
          defaultPageSize={this.props.rows}
          defaultSorted={this.props.sortby}
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
  ({ AdminContainer: { general_setup, filterArea } }) => ({
    countries: general_setup.countries,
    partialStates: general_setup.countryData,
    partialDistricts: general_setup.stateData,
    partialCities: general_setup.districtData,
    loading: general_setup.areaLoading,
    error: general_setup.areaError,
    citiesAutocompleteLoading: general_setup.citiesAutocompleteLoading,

    areas: general_setup.areas,
    citiesAutocomplete: general_setup.citiesAutocomplete,
    districts: general_setup.districts,
    states: general_setup.states,
    fetchLoading: general_setup.areasFetchLoading,
    pages: general_setup.areasPages,
    rowCount: general_setup.areasRowCount,
    ...filterArea
  }),
  {
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onAreaSubmit,
    onAreaList,
    onDistrictList,
    onStateList,
    handleOnAreaFilterChange,
    handleSortChangeArea,
    onAreaDelete,
    onCityAutocomplete,
    onUnmountCountry,
    onUnmountState,
    onUnmountDistrict,
    onUnmountArea
  }
)(Areas);
