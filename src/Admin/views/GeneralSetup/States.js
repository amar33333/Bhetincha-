import React, { Component } from "react";
import { connect } from "react-redux";
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
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import CustomModal from "../../../Common/components/CustomModal";
import StateEditModal from "../../../Common/components/CustomModal/ModalTemplates/StateEditModal";

import {
  onStateSubmit,
  onCountryList,
  onStateList,
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
      { Header: "State", accessor: "name" },
      {
        Header: "Country",
        accessor: "country",
        Cell: ({ value }) => {
          const country = this.props.countries.find(
            country => country.id === value
          );
          return country ? country.name : "Not Found";
        },
        filterMethod: (filter, row) => {
          if (filter && filter.value && filter.value.length > 0) {
            let found = false;
            for (let i = 0; i < filter.value.length; i++) {
              found = found || filter.value[i].id === row.country;
            }
            return found;
          } else return true;
        },
        Filter: ({ filter, onChange }) => (
          <Select
            clearable
            multi
            value={filter ? filter.value : null}
            onChange={onChange}
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
            <Button
              color="secondary"
              className="mr-l"
              onClick={() =>
                this.props.toggleStateEditModal({ id, country, name })
              }
            >
              Edit
            </Button>
            <PopoverDelete
              id={`delete-${value}`}
              onClick={() => this.props.onStateDelete({ id: value })}
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

  componentDidMount() {
    this.props.onCountryList();
    this.props.onStateList();
  }

  componentDidUpdate = (prevProps, prevState) => {
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
                          <InputGroupText>
                            <i className="fa fa-industry" />
                          </InputGroupText>
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
          </Col>
        </Row>
        <ReactTable
          {...this.tableProps}
          style={{ background: "white" }}
          data={this.props.states}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
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
  ({ AdminContainer: { general_setup } }) => ({
    countries: general_setup.countries,
    states: general_setup.states,
    stateEditModal: general_setup.stateEditModal,
    stateEditData: general_setup.stateEditData,
    fetchLoading: general_setup.statesFetchLoading,
    loading: general_setup.stateLoading,
    error: general_setup.stateError
  }),
  {
    onStateSubmit,
    onStateEdit,
    toggleStateEditModal,
    onCountryList,
    onStateList,
    onStateDelete,
    onUnmountCountry,
    onUnmountState
  }
)(States);
