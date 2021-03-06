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
import PaymentMethodEditModal from "../../../Common/components/CustomModal/ModalTemplates/PaymentMethodEditModal";

import {
  onPaymentMethodSubmit,
  onPaymentMethodsList,
  onPaymentMethodEdit,
  togglePaymentMethodEditModal,
  onPaymentMethodDelete,
  onUnmountPaymentMethod,
  resetPaymentCompanyErrors
} from "../../actions";

import PermissionProvider from "../../../Common/utils/PermissionProvider";
import { ErrorHandling } from "../../../Common/utils/Extras";

class PaymentMethod extends Component {
  state = { payment_method: "", paymentMethodSubmit: false };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Payment Method", accessor: "name" },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original: { id, name } }) => (
          <div>
            <PermissionProvider permission="CAN_EDIT_PAYMENT_METHOD">
              <Button
                data-tooltip="Edit"
                data-position="bottom center"
                color="secondary"
                className="mr-2"
                onClick={() =>
                  this.props.togglePaymentMethodEditModal({ id, name })
                }
              >
                <i className="fa fa-pencil" />
              </Button>
            </PermissionProvider>
            <PermissionProvider permission="CAN_EDIT_COMPANY_TYPE">
              <PopoverDelete
                id={`delete-${value}`}
                onClick={() => this.props.onPaymentMethodDelete({ id: value })}
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

  componentDidMount = () => this.props.onPaymentMethodsList();

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.paymentMethodSubmit && !this.props.loading) {
      const updates = { paymentMethodSubmit: false };
      if (!this.props.error) {
        updates.payment_method = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount = () => {
    this.props.onUnmountPaymentMethod();
    this.props.resetPaymentCompanyErrors();
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { payment_method } = this.state;
    this.setState({ paymentMethodSubmit: true }, () =>
      this.props.onPaymentMethodSubmit({ payment_method })
    );
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.toUpperCase()
    });

  render() {
    return (
      <div>
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <PermissionProvider permission="CAN_ADD_PAYMENT_METHOD">
              <Card>
                <CardHeader>
                  <strong>Add Payment Method</strong>
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
                          //disabled={this.props.loading}
                          required
                          type="text"
                          placeholder="Type Payment Method"
                          value={this.state.payment_method}
                          onChange={this.onChange.bind(this, "payment_method")}
                        />
                      </InputGroup>
                      <ErrorHandling
                        error={
                          this.props.paymentCompanyErrors &&
                          this.props.paymentCompanyErrors.name
                        }
                      />
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
          data={this.props.payment_methods}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
        <CustomModal
          title="Edit Payment Method Data"
          isOpen={this.props.paymentMethodEditModal}
          toggle={this.props.togglePaymentMethodEditModal}
          className={"modal-xs" + this.props.className}
        >
          <PaymentMethodEditModal
            data={this.props.paymentMethodEditData}
            onPaymentMethodEdit={this.props.onPaymentMethodEdit}
            paymentCompanyEditErrors={this.props.paymentCompanyEditErrors}
            paymentMethodLoading={this.props.paymentMethodLoading}
            resetPaymentCompanyErrors={this.props.resetPaymentCompanyErrors}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { business_reducer } }) => ({
    payment_methods: business_reducer.payment_methods,
    paymentMethodEditData: business_reducer.paymentMethodEditData,
    paymentMethodEditModal: business_reducer.paymentMethodEditModal,
    fetchLoading: business_reducer.paymentMethodsFetchLoading,
    loading: business_reducer.paymentMethodLoading,
    error: business_reducer.paymentMethodError,
    paymentCompanyErrors: business_reducer.paymentCompanyErrors,
    paymentCompanyEditErrors: business_reducer.paymentCompanyEditErrors
  }),
  {
    onPaymentMethodSubmit,
    onPaymentMethodsList,
    onPaymentMethodEdit,
    togglePaymentMethodEditModal,
    onPaymentMethodDelete,
    onUnmountPaymentMethod,
    resetPaymentCompanyErrors
  }
)(PaymentMethod);
