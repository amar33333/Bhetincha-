import React, { Component } from "react";
import { connect } from "react-redux";
import orderBy from "lodash.orderby";
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

import ReactTable from "react-table";
import {
  PopoverDelete,
  Select,
  PaginationComponent
} from "../../../Common/components";
import "react-table/react-table.css";

import {
  onCountryList,
  onCountryEachList,
  onStateList,
  onDistrictList,
  onDistrictSubmit,
  onDistrictDelete
} from "../../actions";

const DISTRICTS_CHANGED = " districts_changed";

class Districts extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.districtSubmit && !nextProps.error && !nextProps.loading
      ? { district: "", districtCode: "", districtSubmit: false }
      : null;

  state = {
    country: "",
    state: "",
    district: "",
    districtCode: "",
    districtSubmit: false,
    filterCountry: [],
    filterState: [],
    filterText: [],
    sortedData: [],
    pages: 1,
    page: 0,
    rows: 5,
    rowCount: 0,
    districts: []
  };

  componentDidMount() {
    this.props.onCountryList();
    this.props.onDistrictList();
    this.props.onStateList();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.districts !== this.props.districts) {
      return DISTRICTS_CHANGED;
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.districtSubmit && prevProps.loading)
      this.focusableInput.focus();

    if (snapshot === DISTRICTS_CHANGED) this.updateTable();
  };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        searchable: false,
        width: 70
      },
      { Header: "District", accessor: "name" },
      { Header: "Code", accessor: "districtCode" },
      {
        Header: "State",
        accessor: "state",
        id: "state",
        Cell: ({ value }) => {
          const state = this.props.states.find(state => state.id === value);
          return state ? state.name : "Not Found";
        },
        Filter: () => (
          <Select
            clearable
            multi
            value={this.state.filterState}
            onChange={this.handleSelectChange.bind(this, "filterState")}
            valueKey="id"
            labelKey="name"
            options={this.props.states.filter(state => {
              const { filterCountry } = this.state;
              if (filterCountry.length === 0) return true;
              for (let i = 0; i < filterCountry.length; i++)
                if (state.country === filterCountry[i].id) return true;
              return false;
            })}
          />
        )
      },
      {
        Header: "Country",
        accessor: "state",
        id: "country",
        Cell: ({ value }) => {
          const state = this.props.states.find(state => state.id === value);
          if (state) {
            const country = this.props.countries.find(
              country => country.id === state.country
            );
            return country ? country.name : "Not Found";
          } else return "Not Found";
        },
        Filter: () => (
          <Select
            clearable
            multi
            value={this.state.filterCountry}
            onChange={this.handleSelectChange.bind(this, "filterCountry")}
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
        width: 130,
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
              onClick={() => this.props.onDistrictDelete({ id: value })}
            />
          </div>
        )
      }
    ],
    manual: true,
    filterable: true,
    minRows: 5,
    className: "-striped -highlight",
    PaginationComponent
  };

  onFormSubmit = event => {
    event.preventDefault();

    const { district, districtCode, state } = this.state;

    this.setState({ districtSubmit: true }, () =>
      this.props.onDistrictSubmit({
        district,
        districtCode,
        state: state.id
      })
    );
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  handleSelectChange = (key, value) => {
    this.setState(
      { [key]: value },
      () =>
        (key === "filterCountry" || key === "filterState") && this.updateTable()
    );
    if (key === "country") {
      this.setState({ state: "" });
      value && this.props.onCountryEachList({ id: value.id });
    }
    if (
      key === "filterCountry" &&
      value.length > 0 &&
      this.state.filterState.length > 0
    ) {
      let changed = false;
      let filterState = this.state.filterState.filter(filter => {
        let found = false;
        for (let i = 0; i < value.length; i++) {
          const states = this.props.states
            .filter(state => state.country === value[i].id)
            .map(state => state.id);
          found = found || states.includes(filter.id);
          if (!found) changed = true;
        }
        return found;
      });
      changed && this.updateData({ filterState });
    }
  };

  updateTable = () => {
    const {
      page,
      rows,
      filterText,
      filterCountry,
      filterState,
      sortedData
    } = this.state;

    let districts = this.props.districts;
    // filter
    if (filterText.length > 0) {
      filterText.forEach(filter => {
        districts = districts.filter(
          district =>
            String(district[filter.id].toLowerCase()).indexOf(
              filter.value.toLowerCase()
            ) !== -1
        );
      });
    }
    if (filterState.length > 0) {
      districts = districts.filter(district => {
        let found = false;
        for (let i = 0; i < filterState.length; i++) {
          found = found || filterState[i].id === district.state;
        }
        return found;
      });
    } else if (filterCountry.length > 0) {
      districts = districts.filter(district => {
        let found = false;
        for (let i = 0; i < filterCountry.length; i++) {
          const states = this.props.states
            .filter(state => state.country === filterCountry[i].id)
            .map(state => state.id);
          found = found || states.includes(district.state);
        }
        return found;
      });
    }
    // sort
    if (sortedData.length > 0) {
      districts = districts.map(district => {
        const state = this.props.states.find(
          state => state.id === district.state
        );

        const country = this.props.countries.find(
          country => (state ? state.country === country.id : false)
        );

        return {
          ...district,
          stateName: state ? state.name : "Not Found",
          countryName: country ? country.name : "Not Found"
        };
      });
      districts = orderBy(
        districts,
        sortedData.map(sort => {
          let id;
          switch (sort.id) {
            case "state":
              id = "stateName";
              break;
            case "country":
              id = "countryName";
              break;
            default:
              id = sort.id;
          }
          return row => {
            if (row[id] === null || row[id] === undefined) {
              return -Infinity;
            }
            return typeof row[id] === "string"
              ? row[id].toLowerCase()
              : row[id];
          };
        }),
        sortedData.map(d => (d.desc ? "desc" : "asc"))
      );
    }

    // pagination
    let newPage = districts.length <= rows * page ? 0 : page;

    this.setState({
      rowCount: districts.length,
      districts: districts.slice(rows * newPage, rows * newPage + rows),
      page: newPage,
      pages: Math.ceil(districts.length / rows)
    });
  };

  debouncedUpdate = debounce(this.updateTable, 100);

  updateData = params => this.setState({ ...params }, () => this.updateTable());

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Add District</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="6">
                      <FormGroup>
                        <Label for="country">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          disabled={this.props.loading}
                          required
                          name="country"
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
                    <Col xs="12" md="6">
                      <FormGroup>
                        <Label for="State">State</Label>
                        <Select
                          autosize
                          clearable
                          disabled={this.props.loading}
                          required
                          name="State"
                          className="select-industry"
                          value={this.state.state}
                          onChange={this.handleSelectChange.bind(this, "state")}
                          options={this.props.partialStates}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="5">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-industry" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          disabled={this.props.loading}
                          type="text"
                          innerRef={ref => (this.focusableInput = ref)}
                          placeholder="Type District Name"
                          value={this.state.district}
                          onChange={this.onChange.bind(this, "district")}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="12" md="5">
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
                          placeholder="Type District Code"
                          value={this.state.districtCode}
                          onChange={this.onChange.bind(this, "districtCode")}
                        />
                      </InputGroup>
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
          data={this.state.districts}
          pages={this.state.pages}
          pageSize={this.state.rows}
          rowCount={this.state.rowCount}
          onPageChange={pageIndex => {
            this.updateData({ page: pageIndex });
          }}
          onPageSizeChange={(pageSize, pageIndex) =>
            this.updateData({
              page: pageIndex,
              rows: pageSize
            })
          }
          onSortedChange={newSorted =>
            this.updateData({ sortedData: newSorted })
          }
          onFilteredChange={(column, value) => {
            (value.id === "districtCode" || value.id === "name") &&
              this.setState({ filterText: column }, this.debouncedUpdate);
          }}
          loading={this.props.fetchLoading}
        />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { general_setup } }) => ({
    countries: general_setup.countries,
    partialStates: general_setup.countryData,
    states: general_setup.states,
    districts: general_setup.districts,
    fetchLoading: general_setup.districtsFetchLoading,
    loading: general_setup.districtLoading,
    error: general_setup.districtError
  }),
  {
    onStateList,
    onDistrictSubmit,
    onCountryList,
    onDistrictList,
    onCountryEachList,
    onDistrictDelete
  }
)(Districts);
