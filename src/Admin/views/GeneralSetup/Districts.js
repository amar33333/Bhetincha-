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
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader,
  Label
} from "reactstrap";

import ReactTable from "react-table";
import {
  PopoverDelete,
  Select,
  PaginationComponent
} from "../../../Common/components";

import CustomModal from "../../../Common/components/CustomModal";
import DistrictEditModal from "../../../Common/components/CustomModal/ModalTemplates/DistrictEditModal";

import PermissionProvider from "../../../Common/utils/PermissionProvider";

import {
  onCountryList,
  onCountryEachList,
  onStateList,
  handleOnStateFilterChange,
  onDistrictList,
  handleSortChangeDistrict,
  handleOnDistrictFilterChange,
  onDistrictSubmit,
  onDistrictEdit,
  toggleDistrictEditModal,
  onDistrictDelete,
  onUnmountCountry,
  onUnmountState,
  onUnmountDistrict,
  onAddressTreeList,
  onGetAddressTreeList,
  resetGeneralSetupErrors
} from "../../actions";
import { ErrorHandling } from "../../../Common/utils/Extras";

class Districts extends Component {
  state = {
    country: "",
    state: "",
    district: "",
    districtCode: "",
    districtSubmit: false
  };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        sortable: false,
        filterable: false,
        width: 70
      },
      { Header: "District", accessor: "name", id: "district" },
      { Header: "Code", accessor: "districtCode", id: "code", sortable: false },
      {
        Header: "State",
        accessor: "state.name",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            isLoading={this.props.statesFetchLoading}
            onInputChange={this.debouncedStateAutocomplete}
            value={this.props.filterState}
            onChange={filterState =>
              this.props.handleOnDistrictFilterChange({ filterState })
            }
            valueKey="id"
            labelKey="name"
            filterOptions={options => options}
            options={
              !this.props.statesFetchLoading
                ? this.props.states.filter(
                    state =>
                      !this.props.filterState.length ||
                      !this.props.filterState.map(x => x.id).includes(state.id)
                  )
                : []
            }
            noResultsText={
              !this.props.statesFetchLoading ? "No Results Found" : "Loading..."
            }
          />
        )
      },
      {
        Header: "Country",
        accessor: "country.name",
        sortable: false,
        Filter: () => (
          <Select
            clearable
            multi
            tabSelectsValue={false}
            value={this.props.filterCountry}
            onChange={filterCountry =>
              this.props.handleOnDistrictFilterChange({ filterCountry })
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
        Cell: ({
          value,
          original: { id, country, state, name, districtCode }
        }) => (
          <div>
            <PermissionProvider permission="CAN_EDIT_DISTRICT">
              <Button
                data-tooltip="Edit"
                data-position="bottom center"
                color="secondary"
                className="mr-2"
                onClick={() =>
                  this.props.toggleDistrictEditModal({
                    id,
                    country,
                    state,
                    name,
                    districtCode
                  })
                }
              >
                <i className="fa fa-pencil" />
              </Button>
            </PermissionProvider>
            <PermissionProvider permission="CAN_DELETE_DISTRICT">
              <PopoverDelete
                id={`delete-${value}`}
                onClick={() => this.props.onDistrictDelete({ id: value })}
              />
            </PermissionProvider>
          </div>
        )
      }
    ],
    onFilteredChange: (column, value) => {
      value.id === "district" && this.debouncedSearch(column);
      value.id === "code" && this.debouncedCodeSearch(column);
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
    this.props.onDistrictList();
    this.props.onStateList({ rows: 50, page: 1 });
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.districtSubmit && !this.props.loading) {
      const updates = { districtSubmit: false };
      if (!this.props.error) {
        updates.district = "";
        updates.districtCode = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount() {
    this.props.onUnmountCountry();
    this.props.onUnmountState();
    this.props.onUnmountDistrict();
    this.props.resetGeneralSetupErrors();
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnDistrictFilterChange({
        name: column.filter(x => x.id === "district").length
          ? column.find(x => x.id === "district").value
          : ""
      }),
    200
  );

  debouncedCodeSearch = debounce(
    column =>
      this.props.handleOnDistrictFilterChange({
        code: column.filter(x => x.id === "code").length
          ? column.find(x => x.id === "code").value
          : ""
      }),
    200
  );

  debouncedStateAutocomplete = debounce(
    name =>
      this.props.handleOnStateFilterChange({
        name,
        filterCountry: this.props.filterCountry
      }),
    200
  );

  onFormSubmit = event => {
    event.preventDefault();
    const { district, districtCode, state } = this.state;
    this.setState({ districtSubmit: true }, () =>
      this.props.onDistrictSubmit({
        district,
        districtCode,
        state: state.id
      })
    );
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({ state: "" });
      value && this.props.onCountryEachList({ id: value.id });
    }
  };

  render() {
    console.log("district props: ", this.props);
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="8">
            <PermissionProvider permission="CAN_ADD_DISTRICT">
              <Card>
                <CardHeader>
                  <strong>Add District</strong>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onFormSubmit}>
                    <Row>
                      <Col xs="12" md="6">
                        <FormGroup>
                          <Label for="country">Country</Label>
                          <Select
                            autoFocus
                            autosize
                            clearable
                            //disabled={this.props.loading}
                            required
                            name="country"
                            className="select-industry"
                            value={this.state.country}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "country"
                            )}
                            options={this.props.countries}
                            valueKey="id"
                            labelKey="name"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="6">
                        <FormGroup>
                          <Label for="State">State</Label>
                          <Select
                            autosize
                            clearable
                            //disabled={this.props.loading}
                            required
                            name="State"
                            className="select-industry"
                            value={this.state.state}
                            onChange={this.handleSelectChange.bind(
                              this,
                              "state"
                            )}
                            options={
                              this.state.country ? this.props.partialStates : []
                            }
                            valueKey="id"
                            labelKey="name"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="5">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-industry" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            required
                            //disabled={this.props.loading}
                            type="text"
                            innerRef={ref => (this.focusableInput = ref)}
                            placeholder="Type District Name"
                            value={this.state.district}
                            onChange={this.onChange.bind(this, "district")}
                          />
                        </InputGroup>
                        <ErrorHandling
                          error={
                            this.props.generalSetupErrors &&
                            this.props.generalSetupErrors.name
                          }
                        />
                      </Col>
                      <Col xs="12" md="5">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-industry" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            required
                            type="text"
                            //disabled={this.props.loading}
                            placeholder="Type District Code"
                            value={this.state.districtCode}
                            onChange={this.onChange.bind(this, "districtCode")}
                          />
                        </InputGroup>
                        <ErrorHandling
                          error={
                            this.props.generalSetupErrors &&
                            this.props.generalSetupErrors.code
                          }
                        />
                      </Col>
                      <Col xs="12" md="2">
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
          data={this.props.districts}
          pageSize={this.props.rows}
          sorted={this.props.sort_by}
          loading={this.props.fetchLoading}
          onPageChange={pageIndex =>
            this.props.onDistrictList({ page: pageIndex + 1 })
          }
          onPageSizeChange={(pageSize, pageIndex) =>
            this.props.onDistrictList({ page: pageIndex + 1, rows: pageSize })
          }
          onSortedChange={this.props.handleSortChangeDistrict}
          page={this.props.page - 1}
          pages={this.props.pages}
          rowCount={this.props.rowCount}
        />
        <CustomModal
          title="Edit District Data"
          isOpen={this.props.districtEditModal}
          toggle={this.props.toggleDistrictEditModal}
          className={"modal-xs" + this.props.className}
        >
          <DistrictEditModal
            data={this.props.districtEditData}
            onDistrictEdit={this.props.onDistrictEdit}
            countries={this.props.countries}
            onAddressTreeList={this.props.onAddressTreeList}
            onGetAddressTreeList={this.props.onGetAddressTreeList}
            access_token={this.props.access_token}
            generalSetupEditErrors={this.props.generalSetupEditErrors}
            districtLoading={this.props.stateLoading}
            resetGeneralSetupErrors={this.props.resetGeneralSetupErrors}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    auth: {
      cookies: {
        token_data: { access_token }
      }
    },
    AdminContainer: {
      general_setup: {
        countries,
        countryData,
        states,
        statesFetchLoading,
        districts,
        districtsPages,
        districtsRowCount,
        districtEditModal,
        districtEditData,
        districtsFetchLoading,
        districtLoading,
        districtError,
        generalSetupErrors,
        generalSetupEditErrors
      },
      filterDistrict
    }
  }) => ({
    countries,
    partialStates: countryData,
    states,
    statesFetchLoading,
    districts,
    pages: districtsPages,
    rowCount: districtsRowCount,
    districtEditModal,
    districtEditData,
    fetchLoading: districtsFetchLoading,
    loading: districtLoading,
    error: districtError,
    generalSetupErrors,
    generalSetupEditErrors,
    access_token,
    ...filterDistrict
  }),
  {
    onStateList,
    handleOnStateFilterChange,
    onDistrictSubmit,
    onDistrictEdit,
    toggleDistrictEditModal,
    onCountryList,
    onDistrictList,
    handleOnDistrictFilterChange,
    handleSortChangeDistrict,
    onCountryEachList,
    onDistrictDelete,
    onUnmountCountry,
    onUnmountState,
    onUnmountDistrict,
    onAddressTreeList,
    onGetAddressTreeList,
    resetGeneralSetupErrors
  }
)(Districts);
