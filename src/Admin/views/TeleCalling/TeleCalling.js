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
  Table,
  FormGroup,
  Card,
  CardBody,
  Badge,
  Label,
  CardHeader
} from "reactstrap";
import debounce from "lodash.debounce";
import { Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Select } from "../../../Common/components";
import FindCaller from "./FindCaller";
import ComposeSMS from "./ComposeSMS";
import {
  onLocationsList,
  onBusinessTeleCallingList,
  onTeleUserSubmit,
  onCountryList,
  onCountryEachList,
  onStateEachList,
  onDistrictEachList,
  onCityEachList,
  onTeleUserList,
  onTeleUserUpdate
} from "../../actions";

const TabPane = ({ business, show }) => (
  <Tab.Pane>
    {show && (
      <div>
        {business.map(data => (
          <div key={data._id}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />
                <div style={{ width: "100%" }}>
                  <h3>{data._source.business_name}</h3>
                  <h5>{data._source.industry}</h5>
                  <h5>{data._source.categories}</h5>
                  <h5>{data._source.sub_categories}</h5>
                </div>
              </Label>
            </FormGroup>
            {/* <Link to={`/${data._source.slug}`}>
              {data._source.business_name}
            </Link> */}
          </div>
        ))}
      </div>
    )}
    {!business.length && <p>No business found</p>}
  </Tab.Pane>
);

class TeleCalling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationSearchText: "",
      location: null,
      query: "",
      activeIndex: 0
    };
  }

  panes = [
    {
      menuItem: "Open",
      render: () => (
        <TabPane
          business={this.props.business}
          show={!this.state.activeIndex}
        />
      )
    },
    {
      menuItem: "Closed",
      render: () => (
        <TabPane business={this.props.business} show={this.state.activeIndex} />
      )
    }
  ];

  componentDidMount() {
    this.props.onCountryList();
  }

  // componentDidUpdate() {
  //
  // }

  onTabChange = (_, data) => {
    this.setState({ activeIndex: data.activeIndex }, this.onFormSubmit);
  };

  onFormSubmit = event => {
    event && event.preventDefault();

    const { location, query, activeIndex } = this.state;
    const now = new Date();
    if (query) {
      const body = {
        query,
        open: !Boolean(activeIndex),
        time: new Date().toISOString().slice(0, 16) + "Z",
        day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][
          now.getDay()
        ],
        thisIs: location ? location.type.toLowerCase() : undefined,
        location: location ? location.name : undefined
      };

      this.props.onBusinessTeleCallingList({
        body
      });
    }
  };

  debouncedLocationAutocomplete = debounce(
    q => this.props.onLocationsList({ params: { q } }),
    200
  );

  debouncedQueryType = debounce(() => this.onFormSubmit(), 200);

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="6" xs="12">
            <Card>
              <CardHeader>
                <strong>Place your query here</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Query</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            required
                            // disabled={this.props.loading}
                            // innerRef={ref => (this.focusableInput = ref)}
                            type="text"
                            placeholder="Enter search query"
                            value={this.state.query}
                            onChange={event => {
                              const query = event.target.value;
                              this.setState({ query }, () => {
                                this.state.query &&
                                  // this.state.location &&
                                  this.debouncedQueryType();
                              });
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Location</InputGroupText>
                          </InputGroupAddon>
                          <Select
                            style={{ minWidth: 250 }}
                            placeholder="Filter Location"
                            clearable
                            isLoading={this.props.locationsFetchLoading}
                            onInputChange={name => {
                              this.setState({ locationSearchText: name });
                              name && this.debouncedLocationAutocomplete(name);
                            }}
                            value={this.state.location}
                            onChange={location =>
                              this.setState(
                                { location },
                                () => this.state.query && this.onFormSubmit()
                              )
                            }
                            valueKey="id"
                            labelKey="name"
                            filterOptions={options => options}
                            options={
                              this.state.locationSearchText
                                ? this.props.locations
                                : []
                            }
                            optionRenderer={({ name, type }) => (
                              <div>
                                {name}
                                <Badge color="light" pill>
                                  {type}
                                </Badge>
                              </div>
                            )}
                            noResultsText={
                              this.state.locationSearchText &&
                              !this.props.locationsFetchLoading
                                ? "No Results Found"
                                : "Start Typing..."
                            }
                          />
                          <Button color="warning" className="ml-2">
                            <span className="fa fa-search" /> Search
                          </Button>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Tab
              panes={this.panes}
              onTabChange={this.onTabChange}
              activeIndex={this.state.activeIndex}
            />
          </Col>
          <Col md="6" xs="12">
            <FindCaller
              onTeleUserList={this.props.onTeleUserList}
              onTeleUserUpdate={this.props.onTeleUserUpdate}
              userLoading={this.props.userLoading}
              countries={this.props.countries}
              partialStates={this.props.partialStates}
              partialDistricts={this.props.partialDistricts}
              partialCities={this.props.partialCities}
              partialAreas={this.props.partialAreas}
              onTeleUserSubmit={this.props.onTeleUserSubmit}
              onCountryEachList={this.props.onCountryEachList}
              onStateEachList={this.props.onStateEachList}
              onDistrictEachList={this.props.onDistrictEachList}
              onCityEachList={this.props.onCityEachList}
              fetchTeleUserLoading={this.props.fetchTeleUserLoading}
              teleUser={this.props.teleUser}
            />
            <ComposeSMS />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      location,
      tele_calling,
      general_setup: {
        countries,
        countryData,
        stateData,
        districtData,
        cityData
      }
    }
  }) => ({
    ...location,
    ...tele_calling,
    countries,
    partialStates: countryData,
    partialDistricts: stateData,
    partialCities: districtData,
    partialAreas: cityData
  }),
  {
    onBusinessTeleCallingList,
    onLocationsList,
    onTeleUserSubmit,
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onCityEachList,
    onTeleUserList,
    onTeleUserUpdate
  }
)(TeleCalling);
