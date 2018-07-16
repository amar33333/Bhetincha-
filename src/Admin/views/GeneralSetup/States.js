import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
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

import CustomModal from "../../../Common/components/CustomModal";
import StateEditModal from "../../../Common/components/CustomModal/ModalTemplates/StateEditModal";

import PermissionProvider from "../../../Common/utils/PermissionProvider";

import {
  onStateSubmit,
  onCountryList,
  onStateList,
  handleSortChangeState,
  handleOnStateFilterChange,
  onStateEdit,
  toggleStateEditModal,
  onStateDelete,
  onUnmountCountry,
  onUnmountState
} from "../../actions";

class States extends Component {
  state = { state: "", country: "", stateSubmit: false };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "State", accessor: "name", id: "state" },
      {
        Header: "Country",
        accessor: "country.name",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            value={this.props.filterCountry}
            onChange={filterCountry =>
              this.props.handleOnStateFilterChange({ filterCountry })
            }
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
        width: 145,
        Cell: ({ value, original: { id, country, name } }) => (
          <div>
            <PermissionProvider permission="CAN_ADD_STATE">
              <Button
                data-tooltip="Edit"
                data-position="bottom center"
                color="secondary"
                className="mr-2"
                onClick={() =>
                  this.props.toggleStateEditModal({ id, country, name })
                }
              >
                <i className="fa fa-pencil" />
              </Button>
            </PermissionProvider>
            <PermissionProvider permission="CAN_ADD_STATE">
              <PopoverDelete
                text={false}
                id={`delete-${value}`}
                onClick={() => this.props.onStateDelete({ id: value })}
              />
            </PermissionProvider>
          </div>
        )
      }
    ],
    onFilteredChange: (column, value) => {
      value.id === "state" && this.debouncedSearch(column);
    },
    manual: true,
    sortable: true,
    filterable: true,
    minRows: 5,
    className: "-striped -highlight",
    PaginationComponent
  };

  componentDidMount() {
    this.props.onCountryList();
    this.props.onStateList();
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.stateSubmit && !this.props.loading) {
      const updates = { stateSubmit: false };
      if (!this.props.error) {
        updates.state = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount() {
    this.props.onUnmountCountry();
    this.props.onUnmountState();
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnStateFilterChange({
        name: column.filter(x => x.id === "state").length
          ? column.find(x => x.id === "state").value
          : ""
      }),
    200
  );

  onFormSubmit = event => {
    event.preventDefault();
    const { state, country } = this.state;
    this.setState({ stateSubmit: true }, () =>
      this.props.onStateSubmit({
        state,
        country: country.id
      })
    );
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  handleSelectChange = country => this.setState({ country });

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <PermissionProvider permission="CAN_ADD_STATE">
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
                            disabled={this.props.loading}
                            name="Industies"
                            className="select-industry mb-2"
                            value={this.state.country}
                            onChange={this.handleSelectChange}
                            options={this.props.countries}
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
                            <InputGroupText>Name</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            required
                            disabled={this.props.loading}
                            innerRef={ref => (this.focusableInput = ref)}
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
            </PermissionProvider>
          </Col>
        </Row>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.states}
          pageSize={this.props.rows}
          sorted={this.props.sort_by}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex =>
            this.props.onStateList({ page: pageIndex + 1 })
          }
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.onStateList({ page: pageIndex + 1, rows: pageSize })
          }
          onSortedChange={this.props.handleSortChangeState}
          page={this.props.page - 1}
          pages={this.props.pages}
          rowCount={this.props.rowCount}
        />
        <CustomModal
          title="Edit State Data"
          isOpen={this.props.stateEditModal}
          toggle={this.props.toggleStateEditModal}
          className={"modal-xs" + this.props.className}
        >
          <StateEditModal
            data={this.props.stateEditData}
            onStateEdit={this.props.onStateEdit}
            countries={this.props.countries}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      general_setup: {
        countries,
        states,
        statesPages,
        statesRowCount,
        stateEditModal,
        stateEditData,
        statesFetchLoading,
        stateLoading,
        stateError
      },
      filterState
    }
  }) => ({
    countries,
    states,
    pages: statesPages,
    rowCount: statesRowCount,
    stateEditModal,
    stateEditData,
    fetchLoading: statesFetchLoading,
    loading: stateLoading,
    error: stateError,
    ...filterState
  }),
  {
    onStateSubmit,
    onStateEdit,
    toggleStateEditModal,
    onCountryList,
    onStateList,
    handleOnStateFilterChange,
    handleSortChangeState,
    onStateDelete,
    onUnmountCountry,
    onUnmountState
  }
)(States);
