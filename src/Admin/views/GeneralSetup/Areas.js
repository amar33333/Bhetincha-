import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
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
import {
  Select,
  PopoverDelete,
  PaginationComponent
} from "../../../Common/components";

import {
  onCountryList,
  onCountryEachList,
  onStateEachList,
  onDistrictEachList,
  onAreaSubmit
} from "../../actions";

class Areas extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.areaSubmit && !nextProps.error && !nextProps.loading
      ? { area: "", areaSubmit: false }
      : null;

  state = {
    country: "",
    state: "",
    district: "",
    city: "",
    area: "",
    areaSubmit: false
  };

  componentDidMount() {
    this.props.onCountryList();
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevState.areaSubmit && prevProps.loading) this.focusableInput.focus();
  };

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value });
    if (key === "country") {
      this.setState({ state: "", district: "", city: "" });
      value && this.props.onCountryEachList({ id: value.id });
    } else if (key === "state") {
      this.setState({ district: "", city: "" });
      value && this.props.onStateEachList({ id: value.id });
    } else if (key === "district") {
      this.setState({ city: "" });
      value && this.props.onDistrictEachList({ id: value.id });
    }
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { area, city } = this.state;
    this.setState({ areaSubmit: true }, () =>
      this.props.onAreaSubmit({ area, city: city.id })
    );
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="10">
            <Card>
              <CardHeader>
                <strong>Add Area</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Countries">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="Countries"
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
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="States">State</Label>
                        <Select
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="States"
                          className="select-industry"
                          value={this.state.state}
                          onChange={this.handleSelectChange.bind(this, "state")}
                          options={this.props.partialStates}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Districts">District</Label>
                        <Select
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="Districts"
                          className="select-industry"
                          value={this.state.district}
                          onChange={this.handleSelectChange.bind(
                            this,
                            "district"
                          )}
                          options={this.props.partialDistricts}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="3">
                      <FormGroup>
                        <Label for="Cities">City</Label>
                        <Select
                          autosize
                          clearable
                          required
                          disabled={this.props.loading}
                          name="Cities"
                          className="select-industry"
                          value={this.state.city}
                          onChange={this.handleSelectChange.bind(this, "city")}
                          options={this.props.partialCities}
                          valueKey="id"
                          labelKey="name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="8">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-industry" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          innerRef={ref => (this.focusableInput = ref)}
                          disabled={this.props.loading}
                          type="text"
                          placeholder="Type Area Name"
                          value={this.state.area}
                          onChange={this.onChange.bind(this, "area")}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="12" md="4">
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
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { general_setup } }) => ({
    countries: general_setup.countries,
    partialStates: general_setup.countryData,
    partialDistricts: general_setup.stateData,
    partialCities: general_setup.districtData,
    loading: general_setup.areaLoading,
    error: general_setup.areaError
  }),
  {
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onAreaSubmit
  }
)(Areas);
