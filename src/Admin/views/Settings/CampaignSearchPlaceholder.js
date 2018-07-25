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

// import CustomModal from "../../../Common/components/CustomModal";
// import IndustryEditModal from "../../../Common/components/CustomModal/ModalTemplates/IndustryEditModal";

import {
  onSearchPlaceholderSubmit,
  onSearchPlaceholderList,
  onSearchPlaceholderDelete
  // toggleIndustryEditModal
  // onSearchPlaceholderEdit
} from "../../actions";

import PermissionProvider from "../../../Common/utils/PermissionProvider";

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
      { Header: "Start Date", accessor: "start_date" },
      { Header: "End Date", accessor: "end_date" },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original: { id, name } }) => (
          <div>
            {/* <PermissionProvider permission="CAN_EDIT_INDUSTRY"> */}
            <Button
              data-tooltip="Edit"
              data-position="bottom center"
              color="secondary"
              className="mr-2"
              onClick={() => {
                // this.props.toggleIndustryEditModal({ id, name });
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
                            disabled={this.props.loading}
                            innerRef={ref => (this.focusableInput = ref)}
                            type="text"
                            placeholder="Type Search Placeholder Name"
                            value={this.state.placeholder}
                            onChange={this.onChange.bind(this, "placeholder")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <Label>Start Date-Time</Label>
                          <Datetime
                            disabled={this.props.loading}
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
                            disabled={this.props.loading}
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
                      <Button color="primary">
                        <span className="fa fa-plus" /> Add
                      </Button>
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
        {/* <CustomModal
          title="Edit Industry Data"
          isOpen={this.props.industryEditModal}
          toggle={this.props.toggleIndustryEditModal}
          className={"modal-xs" + this.props.className}
        >
          <IndustryEditModal
            data={this.props.industryEditData}
            onSearchPlaceholderEdit={this.props.onSearchPlaceholderEdit}
          />
        </CustomModal> */}
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
        placeholderError
      }
    }
  }) => ({
    placeholders,
    fetchLoading: placeholdersFetchLoading,
    loading: placeholderLoading,
    error: placeholderError
  }),
  {
    onSearchPlaceholderSubmit,
    onSearchPlaceholderList,
    // onUnmountIndustry,
    onSearchPlaceholderDelete
    // onSearchPlaceholderEdit,
    // toggleIndustryEditModal
  }
)(CampaignSearchPlaceholder);
