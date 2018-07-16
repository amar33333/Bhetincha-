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
import "react-table/react-table.css";

import CustomModal from "../../../Common/components/CustomModal";
import IndustryEditModal from "../../../Common/components/CustomModal/ModalTemplates/IndustryEditModal";

import {
  onIndustrySubmit,
  onIndustryList,
  onUnmountIndustry,
  onIndustryDelete,
  toggleIndustryEditModal,
  onIndustryEdit
} from "../../actions";

import PermissionProvider from "../../../Common/utils/PermissionProvider";

class Industry extends Component {
  state = { industry: "", industrySubmit: false };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Industry", accessor: "name" },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original: { id, name } }) => (
          <div>
            <PermissionProvider permission="CAN_EDIT_INDUSTRY">
              <Button
                data-tooltip="Edit"
                data-position="bottom center"
                color="secondary"
                className="mr-2"
                onClick={() => this.props.toggleIndustryEditModal({ id, name })}
              >
                <i className="fa fa-pencil" />
              </Button>
            </PermissionProvider>
            <PermissionProvider permission="CAN_DELETE_INDUSTRY">
              <PopoverDelete
                id={`delete-${value}`}
                onClick={() => this.props.onIndustryDelete({ id: value })}
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

  componentDidMount = () => this.props.onIndustryList();

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.industrySubmit && !this.props.loading) {
      const updates = { industrySubmit: false };
      if (!this.props.error) {
        updates.industry = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount = () => this.props.onUnmountIndustry();

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

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
            <PermissionProvider permission="CAN_ADD_INDUSTRY">
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
                          required
                          disabled={this.props.loading}
                          innerRef={ref => (this.focusableInput = ref)}
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
            </PermissionProvider>
          </Col>
        </Row>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.industries}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
        <CustomModal
          title="Edit Industry Data"
          isOpen={this.props.industryEditModal}
          toggle={this.props.toggleIndustryEditModal}
          className={"modal-xs" + this.props.className}
        >
          <IndustryEditModal
            data={this.props.industryEditData}
            onIndustryEdit={this.props.onIndustryEdit}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { industries } }) => ({ ...industries }),
  {
    onIndustrySubmit,
    onIndustryList,
    onUnmountIndustry,
    onIndustryDelete,
    onIndustryEdit,
    toggleIndustryEditModal
  }
)(Industry);
