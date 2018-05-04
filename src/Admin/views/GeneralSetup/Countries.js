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
import { PopoverDelete } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import { onCountrySubmit, onCountryList } from "../../actions";

class Countries extends Component {
  state = { country: "" };

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
              onClick={() => console.log("Delete clicked for id: ", value)}
            />
          </div>
        )
      }
    ],
    minRows: 5,
    defaultPageSize: 20,
    className: "-striped -highlight",
    filterable: true
  };

  componentDidMount = () =>
    this.props.onCountryList({ access_token: this.access_token });

  onFormSubmit = event => {
    event.preventDefault();

    const { country } = this.state;

    this.props.onCountrySubmit({ country, access_token: this.access_token });
    this.setState({ country: "" });
  };

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });
  };

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
          // loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({ auth, AdminContainer: { general_setup } }) => ({
    ...auth,
    countries: general_setup.countries
  }),
  {
    onCountrySubmit,
    onCountryList
  }
)(Countries);
