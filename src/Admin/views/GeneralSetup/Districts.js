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
  onUnmountDistrict
} from "../../actions";

class Districts extends Component {
  state = {
    country: "",
    state: "",
    district: "",
    districtCode: "",
    districtSubmit: false,
    stateSearchText: ""
  };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        width: 70
      },
      { Header: "District", accessor: "name", id: "district" },
      { Header: "Code", accessor: "districtCode", filterable: false },
      {
        Header: "State",
        accessor: "state",
        Filter: () => (
          <Select
            clearable
            tabSelectsValue={false}
            multi
            isLoading={this.props.statesFetchLoading}
            onInputChange={stateSearchText => {
              this.setState(
                { stateSearchText },
                () =>
                  stateSearchText &&
                  this.debouncedStateAutocomplete(stateSearchText)
              );
            }}
            value={this.props.filterState}
            onChange={filterState =>
              this.props.handleOnDistrictFilterChange({ filterState })
            }
            valueKey="id"
            labelKey="name"
            filterOptions={options => options}
            options={
              this.state.stateSearchText && !this.props.statesFetchLoading
                ? this.props.states.filter(
                    state =>
                      !this.props.filterState.length ||
                      !this.props.filterState.map(x => x.id).includes(state.id)
                  )
                : []
            }
            noResultsText={
              this.state.stateSearchText && !this.props.statesFetchLoading
                ? "No Results Found"
                : "Start Typing..."
            }
          />
        )
      },
      {
        Header: "Country",
        accessor: "country",
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
        Cell: ({ value, original: { id, country, state, name } }) => (
          <div>
            <Button
              color="secondary"
              className="mr-l"
              onClick={() =>
                this.props.toggleDistrictEditModal({ id, country, state, name })
              }
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => this.props.onDistrictDelete({ id: value })}
            />
          </div>
        )
      }
    ],
    onFilteredChange: (column, value) => {
      value.id === "district" && this.debouncedSearch(column);
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
    this.props.onStateList();
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
  }

  debouncedSearch = debounce(
    column =>
      this.props.handleOnDistrictFilterChange({
        name: column.length ? column[0].value : ""
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
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="8">
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
                          disabled={this.props.loading}
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
                          disabled={this.props.loading}
                          required
                          name="State"
                          className="select-industry"
                          value={this.state.state}
                          onChange={this.handleSelectChange.bind(this, "state")}
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
                          disabled={this.props.loading}
                          type="text"
                          innerRef={ref => (this.focusableInput = ref)}
                          placeholder="Type District Name"
                          value={this.state.district}
                          onChange={this.onChange.bind(this, "district")}
                        />
                      </InputGroup>
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
                          disabled={this.props.loading}
                          placeholder="Type District Code"
                          value={this.state.districtCode}
                          onChange={this.onChange.bind(this, "districtCode")}
                        />
                      </InputGroup>
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
          </Col>
        </Row>

        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.districts}
          defaultPageSize={this.props.rows}
          defaultSorted={this.props.sort_by}
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
            states={this.props.partialStates}
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
        districtError
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
    onUnmountDistrict
  }
)(Districts);
