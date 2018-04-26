import React, { Component } from "react";
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
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";

import {
  onIndustrySubmit,
  onIndustryList,
  onUnmountIndustry,
  onIndustryDelete
} from "../../actions";

class Industry extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    !nextProps.loading && prevState.industrySubmit ? { industry: "" } : null;

  state = { industry: "", industrySubmit: false };

  columns = [
    { Header: "S.N", accessor: "id" },
    { Header: "Industry", accessor: "name" },
    {
      Header: "Edit",
      id: "edit",
      accessor: "id",
      filterable: false,
      sortable: false,
      Cell: ({ value }) => (
        <button onClick={event => console.log("Edit clicked for id: ", value)}>
          Edit
        </button>
      )
    },
    {
      Header: "Delete",
      id: "delete",
      accessor: "id",
      filterable: false,
      sortable: false,
      Cell: ({ value }) => (
        <button onClick={event => this.props.onIndustryDelete({ id: value })}>
          Delete
        </button>
      )
    }
  ];

  componentDidMount = () => this.props.onIndustryList();

  componentWillUnmount = () => this.props.onUnmountIndustry();

  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null) {
      return row[id] !== undefined
        ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
        : true;
    }
  };

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  onFormSubmit = event => {
    event.preventDefault();
    const { industry } = this.state;
    this.setState({ industrySubmit: true }, () =>
      this.props.onIndustrySubmit({ industry })
    );
  };

  render() {
    return (
      <div>
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Industry</strong>
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
                        disabled={this.props.loading}
                        required
                        type="text"
                        placeholder="Type Industry Name"
                        value={this.state.industry}
                        onChange={this.onChange.bind(this, "industry")}
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
          columns={this.columns}
          data={this.props.industries}
          loading={this.props.fetchLoading}
          defaultPageSize={10}
          filterable
          defaultFilterMethod={this.filterCaseInsensitive}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { industries } }) => ({ ...industries }),
  { onIndustrySubmit, onIndustryList, onUnmountIndustry, onIndustryDelete }
)(Industry);
