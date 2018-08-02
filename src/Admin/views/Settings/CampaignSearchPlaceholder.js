import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Input,
  Form,
  FormGroup,
  Label,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";
import "react-table/react-table.css";

import CustomModal from "../../../Common/components/CustomModal";
import SearchPlaceholderEditModal from "../../../Common/components/CustomModal/ModalTemplates/SearchPlaceholderEditModal";

import {
  onSearchPlaceholderSubmit,
  onSearchPlaceholderList,
  onSearchPlaceholderDelete,
  toggleSearchPlaceholderEditModal,
  onSearchPlaceholderEdit,
  resetSettingsErrors
} from "../../actions";

import PermissionProvider from "../../../Common/utils/PermissionProvider";
import { ErrorHandling } from "../../../Common/utils/Extras";

class CampaignSearchPlaceholder extends Component {
  state = {
    placeholder: "",
    start_date: "",
    end_date: "",
    placeholderSubmit: false
  };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Placeholder", accessor: "name" },
      {
        Header: "Start Date",
        accessor: "start_date",
        Cell: ({ value }) => new Date(value).toString()
      },
      {
        Header: "End Date",
        accessor: "end_date",
        Cell: ({ value }) => new Date(value).toString()
      },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original }) => (
          <div>
            {/* <PermissionProvider permission="CAN_EDIT_INDUSTRY"> */}
            <Button
              data-tooltip="Edit"
              data-position="bottom center"
              color="secondary"
              className="mr-2"
              onClick={() => {
                this.props.toggleSearchPlaceholderEditModal({ ...original });
              }}
            >
              <i className="fa fa-pencil" />
            </Button>
            {/* </PermissionProvider> */}
            {/* <PermissionProvider permission="CAN_DELETE_INDUSTRY"> */}
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => {
                this.props.onSearchPlaceholderDelete({ id: value });
              }}
            />
            {/* </PermissionProvider> */}
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

  componentDidMount = () => this.props.onSearchPlaceholderList();

  componentDidUpdate = (_, prevState) => {
    if (prevState.placeholderSubmit && !this.props.loading) {
      const updates = { placeholderSubmit: false };
      if (!this.props.error) {
        updates.placeholder = "";
        updates.start_date = "";
        updates.end_date = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount() {
    this.props.resetSettingsErrors();
  }

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    const { placeholder, start_date, end_date } = this.state;
    this.setState({ placeholderSubmit: true }, () =>
      this.props.onSearchPlaceholderSubmit({
        name: placeholder,
        start_date: moment(start_date).format("YYYY-MM-DDTHH:mmZ"),
        end_date: moment(end_date).format("YYYY-MM-DDTHH:mmZ")
      })
    );
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <PermissionProvider permission="CAN_ADD_INDUSTRY">
              <Card>
                <CardHeader>
                  <strong>Add Search Placeholder</strong>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onFormSubmit}>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label>Placeholder</Label>
                          <Input
                            required
                            //disabled={this.props.loading}
                            innerRef={ref => (this.focusableInput = ref)}
                            type="text"
                            placeholder="Type Search Placeholder Name"
                            value={this.state.placeholder}
                            onChange={this.onChange.bind(this, "placeholder")}
                          />
                        </FormGroup>
                        <ErrorHandling
                          error={
                            this.props.settingsErrors &&
                            this.props.settingsErrors.name
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label>Start Date-Time</Label>
                          <Datetime
                            //disabled={this.props.loading}
                            value={this.state.start_date}
                            onChange={time => {
                              this.setState({
                                start_date: moment(time)
                              });
                            }}
                            // utc={true}
                            disableOnClickOutside={false}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label>End Date-Time</Label>
                          <Datetime
                            //disabled={this.props.loading}
                            value={this.state.end_date}
                            onChange={time => {
                              this.setState({
                                end_date: moment(time)
                              });
                            }}
                            // utc={true}
                            disableOnClickOutside={false}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          color="primary"
                          disabled={this.props.placeholderLoading}
                        >
                          <span className="fa fa-plus" /> Add
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </PermissionProvider>
          </Col>
        </Row>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.placeholders}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
        <CustomModal
          title="Edit Search Placeholder"
          isOpen={this.props.searchPlaceholderEditModal}
          toggle={this.props.toggleSearchPlaceholderEditModal}
          className={"modal-xs" + this.props.className}
        >
          <SearchPlaceholderEditModal
            data={this.props.searchPlaceholderEditData}
            onSearchPlaceholderEdit={this.props.onSearchPlaceholderEdit}
            settingsEditErrors={this.props.settingsEditErrors}
            placeholderLoading={this.props.placeholderLoading}
            resetSettingsErrors={this.props.resetSettingsErrors}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      settings: {
        placeholders,
        placeholdersFetchLoading,
        placeholderLoading,
        placeholderError,
        searchPlaceholderEditModal,
        searchPlaceholderEditData,
        settingsEditErrors,
        settingsErrors
      }
    }
  }) => ({
    placeholders,
    fetchLoading: placeholdersFetchLoading,
    loading: placeholderLoading,
    error: placeholderError,
    searchPlaceholderEditModal,
    searchPlaceholderEditData,
    settingsEditErrors,
    settingsErrors
  }),
  {
    onSearchPlaceholderSubmit,
    onSearchPlaceholderList,
    onSearchPlaceholderDelete,
    onSearchPlaceholderEdit,
    toggleSearchPlaceholderEditModal,
    resetSettingsErrors
  }
)(CampaignSearchPlaceholder);
