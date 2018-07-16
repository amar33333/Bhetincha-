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

import CustomModal from "../../../Common/components/CustomModal";
import CompanyTypeEditModal from "../../../Common/components/CustomModal/ModalTemplates/CompanyTypeEditModal";

import {
  onCompanyTypeSubmit,
  onCompanyTypeList,
  onCompanyTypeEdit,
  toggleCompanyTypeEditModal,
  onCompanyTypeDelete,
  onUnmountCompanyType
} from "../../actions";

import PermissionProvider from "../../../Common/utils/PermissionProvider";

class CompanyType extends Component {
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
        Cell: ({ value, original: { id, name } }) => (
          <div>
            <PermissionProvider permission="CAN_EDIT_COMPANY_TYPE">
              <Button
                data-tooltip="Edit"
                data-position="bottom center"
                color="secondary"
                className="mr-2"
                onClick={() =>
                  this.props.toggleCompanyTypeEditModal({ id, name })
                }
              >
                <i className="fa fa-pencil" />
              </Button>
            </PermissionProvider>
            <PermissionProvider permission="CAN_DELETE_COMPANY_TYPE">
              <PopoverDelete
                id={`delete-${value}`}
                onClick={() => this.props.onCompanyTypeDelete({ id: value })}
              />
            </PermissionProvider>
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
    if (prevState.companyTypeSubmit && !this.props.loading) {
      const updates = { companyTypeSubmit: false };
      if (!this.props.error) {
        updates.company_type = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
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
            <PermissionProvider permission="CAN_ADD_COMPANY_TYPE">
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
            </PermissionProvider>
          </Col>
        </Row>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.company_types}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
        <CustomModal
          title="Edit Company Type Data"
          isOpen={this.props.companyTypeEditModal}
          toggle={this.props.toggleCompanyTypeEditModal}
          className={"modal-xs" + this.props.className}
        >
          <CompanyTypeEditModal
            data={this.props.companyTypeEditData}
            onCompanyTypeEdit={this.props.onCompanyTypeEdit}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { business_reducer } }) => ({
    company_types: business_reducer.company_types,
    companyTypeEditModal: business_reducer.companyTypeEditModal,
    companyTypeEditData: business_reducer.companyTypeEditData,
    fetchLoading: business_reducer.companyTypesFetchLoading,
    loading: business_reducer.companyTypeLoading,
    error: business_reducer.companyTypeError
  }),
  {
    onCompanyTypeSubmit,
    onCompanyTypeEdit,
    toggleCompanyTypeEditModal,
    onCompanyTypeList,
    onCompanyTypeDelete,
    onUnmountCompanyType
  }
)(CompanyType);
