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
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import {
  onCompanyTypeSubmit,
  onCompanyTypeList,
  onCompanyTypeDelete,
  onUnmountCompanyType
} from "../../actions";

class CompanyType extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.companyTypeSubmit && !nextProps.error && !nextProps.loading
      ? { company_type: "", companyTypeSubmit: false }
      : null;

  state = { company_type: "", companyTypeSubmit: false };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Company Type", accessor: "name" },
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
              onClick={() => this.props.onCompanyTypeDelete({ id: value })}
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

  componentDidMount = () => this.props.onCompanyTypeList();

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.companyTypeSubmit && prevProps.loading)
      this.focusableInput.focus();
  };

  componentWillUnmount = () => this.props.onUnmountCompanyType();

  onFormSubmit = event => {
    event.preventDefault();
    const { company_type } = this.state;
    this.setState({ companyTypeSubmit: true }, () =>
      this.props.onCompanyTypeSubmit({ company_type })
    );
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  render() {
    return (
      <div>
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Company Type</strong>
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
                        innerRef={ref => (this.focusableInput = ref)}
                        disabled={this.props.loading}
                        required
                        type="text"
                        placeholder="Enter Company Type"
                        value={this.state.company_type}
                        onChange={this.onChange.bind(this, "company_type")}
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
          style={{ background: "white" }}
          data={this.props.company_types}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { business_reducer } }) => ({
    company_types: business_reducer.company_types,
    fetchLoading: business_reducer.companyTypesFetchLoading,
    loading: business_reducer.companyTypeLoading,
    error: business_reducer.companyTypeError
  }),
  {
    onCompanyTypeSubmit,
    onCompanyTypeList,
    onCompanyTypeDelete,
    onUnmountCompanyType
  }
)(CompanyType);
