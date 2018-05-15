import React, { Component } from "react";
import { connect } from "react-redux";

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
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";
import "react-table/react-table.css";

import {
  onCountryList,
  onCountryEachList,
  onStateList,
  onDistrictList,
  onDistrictSubmit,
  onDistrictDelete
} from "../../actions";

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
    districtSubmit: false
  };

  componentDidMount() {
    this.props.onCountryList();
    this.props.onDistrictList();
    this.props.onStateList();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.districtSubmit && prevProps.loading)
      this.focusableInput.focus();
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
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              found = found || filter.value[i].id === row.state;
            }
            return found;
          } else return true;
        },
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            multi
            value={filter ? filter.value : null}
            onChange={onChange}
            valueKey="id"
            labelKey="name"
            options={this.props.states}
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
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              const states = this.props.states
                .filter(state => state.country === filter.value[i].id)
                .map(state => state.id);
              found = found || states.includes(row.state);
            }
            return found;
          } else return true;
        },
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            multi
            value={filter ? filter.value : null}
            onChange={onChange}
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
    minRows: 5,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true,
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
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({ state: "" });
      value && this.props.onCountryEachList({ id: value.id });
    }
  };

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
                          options={this.props.states}
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
          data={this.props.districts}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { general_setup } }) => ({
    countries: general_setup.countries,
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
