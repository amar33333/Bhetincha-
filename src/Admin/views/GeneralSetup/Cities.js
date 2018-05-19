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
  handleOnCityFilterChange,
  handleSortChangeCity,
  onCityDelete,
  onClearCityFilters,
  onUnmountCountry,
  onUnmountState,
  onUnmountDistrict,
  onUnmountCity
} from "../../actions";

class Cities extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.citySubmit && !nextProps.error && !nextProps.loading
      ? { city: "", citySubmit: false }
      : null;

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
    this.props.onDistrictList();
    this.props.onStateList();
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.citySubmit && prevProps.loading) this.focusableInput.focus();
  };

  componentWillUnmount() {
    this.props.onUnmountCountry();
    this.props.onUnmountState();
    this.props.onUnmountDistrict();
    this.props.onUnmountCity();
    this.props.onClearCityFilters();
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnCityFilterChange({
        name: column.length ? column[0].value : ""
      }),
    200
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

  handleFilterSelectChange = (key, value) => {
    if (key === "filterDistrict")
      this.props.handleOnCityFilterChange({ filterDistrict: value });
    else this.updateOtherFilters(key, value);
  };

  updateOtherFilters = (key, value) => {
    const { filterDistrict } = this.props;
    let changedDistrict = false;

    let newFilterState = key === "filterState" ? value : this.props.filterState,
      newFilterDistrict = [],
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
    if (filterDistrict.length) {
      if (newFilterState.length) {
        newFilterDistrict = filterDistrict.filter(filter => {
          let found = false;
          for (let i = 0; i < newFilterState.length; i++) {
            found = found || filter.state === newFilterState[i].id;
            if (found) break;
          }
          changedDistrict = !found;
          return found;
        });
      } else if (filterCountry.length) {
        newFilterDistrict = filterDistrict.filter(filter => {
          let found = false;
          for (let i = 0; i < filterCountry.length; i++) {
            const states = this.props.states
              .filter(state => state.country === filterCountry[i].id)
              .map(state => state.id);
            found = found || states.includes(filter.state);
            if (found) break;
          }
          changedDistrict = !found;
          return found;
        });
      }
    }

    const toUpdate = {};
    toUpdate.filterState = newFilterState;
    toUpdate.filterCountry = filterCountry;
    if (changedDistrict) toUpdate.filterDistrict = newFilterDistrict;
    this.props.handleOnCityFilterChange(toUpdate);
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
          defaultPageSize={this.props.rows}
          defaultSorted={this.props.sortby}
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
  ({ AdminContainer: { general_setup, filterCity } }) => ({
    countries: general_setup.countries,
    partialStates: general_setup.countryData,
    partialDistricts: general_setup.stateData,
    loading: general_setup.cityLoading,
    error: general_setup.cityError,

    districts: general_setup.districts,
    states: general_setup.states,
    cities: general_setup.cities,
    fetchLoading: general_setup.citiesFetchLoading,
    pages: general_setup.citiesPages,
    rowCount: general_setup.citiesRowCount,
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
    handleOnCityFilterChange,
    handleSortChangeCity,
    onCityDelete,
    onClearCityFilters,
    onUnmountCountry,
    onUnmountState,
    onUnmountDistrict,
    onUnmountCity
  }
)(Cities);
