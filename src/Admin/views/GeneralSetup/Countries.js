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
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import ReactTable from "react-table";
import { PopoverDelete, PaginationComponent } from "../../../Common/components";
import filterCaseInsensitive from "../../../Common/utils/filterCaseInsesitive";

import CustomModal from "../../../Common/components/CustomModal";
import CountryEditModal from "../../../Common/components/CustomModal/ModalTemplates/CountryEditModal";

import {
  onCountrySubmit,
  onCountryList,
  onCountryEdit,
  toggleCountryEditModal,
  onCountryDelete,
  onUnmountCountry
} from "../../actions";

class Countries extends Component {
  state = { country: "", countryCode: "", countrySubmit: false };

  tableProps = {
    columns: [
      {
        Header: "SN",
        accessor: "s_no",
        filterable: false,
        sortable: false,
        width: 70
      },
      { Header: "Country", accessor: "name" },
      { Header: "Country Code", accessor: "countryCode", width: 250 },
      {
        Header: "Actions",
        id: "edit",
        accessor: "id",
        filterable: false,
        sortable: false,
        width: 145,
        Cell: ({ value, original: { id, name, countryCode } }) => (
          <div>
            <Button
              data-tooltip="Edit"
              data-position="bottom center"
              color="secondary"
              className="mr-2"
              onClick={() =>
                this.props.toggleCountryEditModal({ id, name, countryCode })
              }
            >
              <i className="fa fa-pencil" />
            </Button>
            <PopoverDelete
              text={false}
              id={`delete-${value}`}
              onClick={() => this.props.onCountryDelete({ id: value })}
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

  componentDidMount = () => this.props.onCountryList();

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.countrySubmit && !this.props.loading) {
      const updates = { countrySubmit: false };
      if (!this.props.error) {
        updates.country = "";
        updates.countryCode = "";
      }
      this.setState(updates, () => this.focusableInput.focus());
    }
  };

  componentWillUnmount = () => this.props.onUnmountCountry();

  onFormSubmit = event => {
    event.preventDefault();
    const { country, countryCode } = this.state;
    this.setState({ countrySubmit: true }, () =>
      this.props.onCountrySubmit({ body: { name: country, countryCode } })
    );
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Add Country</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <FormGroup>
                    <InputGroup className="mr-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Code</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus
                        required
                        innerRef={ref => (this.focusableInput = ref)}
                        disabled={this.props.loading}
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Type Country Code"
                        value={this.state.countryCode}
                        onChange={this.onChange.bind(this, "countryCode")}
                      />
                    </InputGroup>
                    <InputGroup className="mr-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Name</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        disabled={this.props.loading}
                        type="text"
                        placeholder="Type Country Name"
                        value={this.state.country}
                        onChange={this.onChange.bind(this, "country")}
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
          data={this.props.countries}
          loading={this.props.fetchLoading}
          defaultFilterMethod={filterCaseInsensitive}
        />
        <CustomModal
          title="Edit Industry Data"
          isOpen={this.props.countryEditModal}
          toggle={this.props.toggleCountryEditModal}
          className={"modal-xs" + this.props.className}
        >
          <CountryEditModal
            data={this.props.countryEditData}
            onCountryEdit={this.props.onCountryEdit}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { general_setup } }) => ({
    countries: general_setup.countries,
    countryEditModal: general_setup.countryEditModal,
    countryEditData: general_setup.countryEditData,
    fetchLoading: general_setup.countriesFetchLoading,
    loading: general_setup.countryLoading,
    error: general_setup.countryError
  }),
  {
    onCountrySubmit,
    onCountryList,
    onCountryEdit,
    toggleCountryEditModal,
    onCountryDelete,
    onUnmountCountry
  }
)(Countries);
