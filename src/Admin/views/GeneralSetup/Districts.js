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
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      state: "",
      district: "",
      districtCode: ""
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.props.onCountryList({ access_token: this.access_token });
    this.props.onDistrictList({ access_token: this.access_token });
    this.props.onStateList({ access_token: this.access_token });
  }

  tableProps = {
    columns: [
      {
        Header: "S. No.",
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

    this.props.onDistrictSubmit({
      district,
      districtCode,
      state: state.id,
      access_token: this.access_token
    });
    this.setState({ district: "", districtCode: "" });
  };

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });
  };

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({
        state: ""
      });
      this.props.onCountryEachList({
        id: value.id,
        access_token: this.access_token
      });
    }
  };

  render() {
    const countries = this.props.general_setup.countries;

    const states = this.props.general_setup.countryData
      ? this.props.general_setup.countryData.states
      : null;

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
                        <Label for="Industies">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="country"
                          className="select-industry"
                          value={this.state.country.id}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "country"
                          )}
                          options={countries}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="6">
                      <FormGroup>
                        <Label for="Industies">State</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="State"
                          className="select-industry"
                          value={this.state.state.id}
                          onChange={this.handleSelectChange.bind(this, "state")}
                          options={states}
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
                          autoFocus
                          required
                          type="text"
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
                          autoFocus
                          required
                          type="text"
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
          // loading={this.props.categories.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { general_setup }, auth }) => ({
    general_setup,
    districts: general_setup.districts,
    states: general_setup.states,
    countries: general_setup.countries,
    ...auth
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
