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
  Label,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader
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
  onStateSubmit,
  onCountryList,
  onStateList,
  onStateDelete
} from "../../actions";

class States extends Component {
  state = { state: "", country: "" };
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  tableProps = {
    columns: [
      {
        Header: "S. No.",
        accessor: "s_no",
        filterable: false,
        searchable: false,
        width: 70
      },
      { Header: "State", accessor: "name" },
      {
        Header: "Country",
        accessor: "country",
        Cell: ({ value }) => {
          const country = this.props.countries.find(
            country => country.id === value
          );
          return country ? country.name : "Not Found";
        },
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              found = found || filter.value[i].id === row.country;
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
              onClick={() => this.props.onStateDelete({ id: value })}
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

  componentWillMount() {
    this.props.onCountryList({ access_token: this.access_token });
    this.props.onStateList({ access_token: this.access_token });
  }

  onFormSubmit = event => {
    event.preventDefault();

    const { state, country } = this.state;

    this.props.onStateSubmit({
      state,
      country: country.id,
      access_token: this.access_token
    });
    this.setState({ state: "", country: "" });
  };

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });
  };

  handleSelectChange = country => {
    this.setState({ country });
  };

  render() {
    const countries = this.props.general_setup.countries;

    const { country } = this.state;
    const value = country && country.id;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add State</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="Country">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="Industies"
                          className="select-industry mb-2"
                          value={value}
                          onChange={this.handleSelectChange}
                          options={countries}
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
                          autoFocus
                          required
                          type="text"
                          placeholder="Type State Name"
                          value={this.state.state}
                          onChange={this.onChange.bind(this, "state")}
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
          data={this.props.states}
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
    countries: general_setup.countries,
    states: general_setup.states,
    ...auth
  }),
  {
    onStateSubmit,
    onCountryList,
    onStateList,
    onStateDelete
  }
)(States);
