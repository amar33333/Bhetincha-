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
  CardHeader
} from "reactstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import { onCountrySubmit, onCountryList, onCountryDelete } from "../../actions";

class Countries extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.countrySubmit && !nextProps.error && !nextProps.loading
      ? { country: "", countrySubmit: false }
      : null;

  state = { country: "", countrySubmit: false };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        searchable: false,
        width: 70
      },
      { Header: "Country", accessor: "name" },
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
              onClick={() => this.props.onCountryDelete({ id: value })}
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

  componentDidMount = () => this.props.onCountryList();

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.countrySubmit && prevProps.loading)
      this.focusableInput.focus();
  };

  onFormSubmit = event => {
    event.preventDefault();

    const { country } = this.state;

    this.setState({ countrySubmit: true }, () =>
      this.props.onCountrySubmit({ country })
    );
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Country</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-industry" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus
                        required
                        innerRef={ref => (this.focusableInput = ref)}
                        disabled={this.props.loading}
                        type="text"
                        placeholder="Type Country Name"
                        value={this.state.country}
                        onChange={this.onChange.bind(this, "country")}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button color="primary">
                    <span className="fa fa-plus" /> Add
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <ReactTable
          {...this.tableProps}
          data={this.props.countries}
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
    fetchLoading: general_setup.countriesFetchLoading,
    loading: general_setup.countryLoading,
    error: general_setup.countryError
  }),
  {
    onCountrySubmit,
    onCountryList,
    onCountryDelete
  }
)(Countries);
