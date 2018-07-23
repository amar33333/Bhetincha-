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
  CardHeader,
  CardFooter
} from "reactstrap";
import debounce from "lodash.debounce";
import { Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Select } from "../../../Common/components";
import FindCaller from "./FindCaller";
import {
  onIndustryList,
  onLocationsList,
  onBusinessTeleCallingList,
  onTeleUserSubmit,
  onCountryList,
  onCountryEachList,
  onStateEachList,
  onDistrictEachList,
  onCityEachList,
  onTeleUserList,
  onTeleUserUpdate,
  onTeleUserSMSSubmit,
  onTeleUserNameList
} from "../../actions";

const TabPane = ({ businesses, show, checkedBusinesses, updateChecked }) => (
  <Tab.Pane>
    {show && (
      <div>
        {businesses.map(business => {
          const { _id, _source: data, selectedAddress } = business;

          return (
            <div
              key={_id}
              style={
                checkedBusinesses.map(({ _id }) => _id).includes(_id)
                  ? { backgroundColor: "#ebfaff" }
                  : {}
              }
            >
              <FormGroup check>
                <Label check style={{ width: "100%" }}>
                  <Input
                    type="checkbox"
                    checked={checkedBusinesses
                      .map(({ _id }) => _id)
                      .includes(_id)}
                    onChange={e => updateChecked(business, e.target.checked)}
                  />
                  <div>
                    <h3>{data.business_name}</h3>
                    <em>Industry: </em>
                    {data.industry}
                    <br />
                    <em>Categories: </em>
                    {data.categories ? data.categories.join(", ") : "n/a"}
                    <br />
                    <em>Sub Categories: </em>
                    {data.sub_categories
                      ? data.sub_categories.join(", ")
                      : "n/a"}
                    <br />
                    <em>Tags: </em>
                    {data.tags ? data.tags.join(", ") : "n/a"}
                    <br />
                    <em>Landline Number: </em>
                    {selectedAddress && selectedAddress.landlineNumber
                      ? selectedAddress.landlineNumber
                      : "n/a"}
                    <br />
                    <em>Address: </em>
                    {selectedAddress && selectedAddress.areaText
                      ? selectedAddress.areaText
                      : "n/a"}
                    <br />
                    <em>Contact Person: </em>
                    {selectedAddress && selectedAddress.contactPersonText
                      ? selectedAddress.contactPersonText
                      : "n/a"}
                    <br />
                  </div>
                </Label>
              </FormGroup>
              <hr />
              {/* <Link to={`/${data.slug}`}>
              {data.business_name}
            </Link> */}
            </div>
          );
        })}
      </div>
    )}
    {!businesses.length && <p>No business found</p>}
  </Tab.Pane>
);

class TeleCalling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationSearchText: "",
      location: null,
      query: "",
      activeIndex: 0,
      businesses: [],
      checkedBusinesses: [],
      composeSMSText: "",
      industry: "",
      searchForBusinessNameOnly: false
    };

    this.panes = [
      {
        menuItem: "Open",
        render: () => (
          <TabPane
            businesses={this.state.businesses}
            show={!this.state.activeIndex}
            checkedBusinesses={this.state.checkedBusinesses}
            updateChecked={this.updateChecked}
          />
        )
      },
      {
        menuItem: "Closed",
        render: () => (
          <TabPane
            businesses={this.state.businesses}
            show={this.state.activeIndex}
            checkedBusinesses={this.state.checkedBusinesses}
            updateChecked={this.updateChecked}
          />
        )
      }
    ];
  }

  componentDidMount() {
    this.props.onCountryList();
    this.props.onIndustryList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.business !== this.props.business) {
      const { business: businesses } = this.props;
      let { location } = this.state;

      this.setState({
        checkedBusinesses: [],
        composeSMSText: "",

        businesses: businesses.map(business => {
          const data = business._source;
          let addresses = [];
          let selectedAddress = null;

          // TODO: after elastic implementation... In case of inner hits (not working right now):
          // const selectedAddress = business.inner_hits.branchAddress.hits.total
          //   ? business.inner_hits.branchAddress.hits.hits[0]._source
          //   : data.address;

          // if (!selectedAddress.landlineNumber) {
          //   selectedAddress.landlineNumber = data.address.landlineNumber;
          // }

          // console.log("address", selectedAddress);
          if (data.address) {
            addresses.push(data.address);
          }
          if (data.branchAddress && data.branchAddress.length) {
            addresses = [...addresses, ...data.branchAddress];
          }
          if (addresses.length === 1) {
            selectedAddress = addresses[0];
          } else if (addresses.length > 1) {
            selectedAddress = addresses[0];
            if (!location) {
              // location not found: default location
              location = { name: "Nepal", type: "Country" };
            }
            for (let i = 0; i < addresses.length; i++) {
              if (
                addresses[i].area &&
                addresses[i].area[location.type.toLowerCase()] &&
                addresses[i].area[location.type.toLowerCase()] === location.name
              ) {
                selectedAddress = addresses[i];

                if (!addresses[i].landlineNumber) {
                  selectedAddress.landlineNumber = addresses[0].landlineNumber;
                }
                break;
              }
            }
          }

          if (selectedAddress) {
            selectedAddress.areaText = `${
              selectedAddress.landmark ? `${selectedAddress.landmark}, ` : ""
            }${selectedAddress.area.area}, ${selectedAddress.area.city}`;

            if (
              selectedAddress.contactPerson &&
              selectedAddress.contactPerson.length
            ) {
              const contactPerson = selectedAddress.contactPerson.filter(
                ({ visibleToPublic }) => visibleToPublic
              );

              if (contactPerson.length) {
                selectedAddress.contactPersonText = `${
                  selectedAddress.contactPerson[0].name
                } - ${selectedAddress.contactPerson[0].mobileNumber || "n/a"}`;
              }
            }
          }

          return {
            ...business,
            selectedAddress
          };
        })
      });
    }
  }

  generateText = data => {
    let text = "";
    data.forEach(business => {
      text += `${business._source.business_name}\n${
        business.selectedAddress
          ? `${
              business.selectedAddress.areaText
                ? `${business.selectedAddress.areaText}\n`
                : ""
            }${
              business.selectedAddress.landlineNumber
                ? `${business.selectedAddress.landlineNumber}\n`
                : ""
            }${
              business.selectedAddress.contactPersonText
                ? `${business.selectedAddress.contactPersonText}\n`
                : ""
            }`
          : ""
      }\n`;
    });

    if (data.length) {
      text += "Behtincha";
    }
    return text;
  };

  updateChecked = (business, add) => {
    let checkedBusinesses = [...this.state.checkedBusinesses];
    if (add) {
      checkedBusinesses.push(business);
    } else {
      checkedBusinesses = checkedBusinesses.filter(b => b._id !== business._id);
    }

    const composeSMSText = this.generateText(checkedBusinesses);

    if (checkedBusinesses.length <= 4) {
      this.setState({
        checkedBusinesses,
        composeSMSText
      });
    } else {
      toast.error("Exceeded Business Selection Limit");
    }
  };

  onTabChange = (_, data) => {
    this.setState({ activeIndex: data.activeIndex }, this.onFormSubmit);
  };

  onFormSubmit = event => {
    event && event.preventDefault();

    const {
      location,
      query,
      activeIndex,
      industry,
      searchForBusinessNameOnly
    } = this.state;
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
        location: location ? location.name : undefined,
        industry: industry ? industry.name : undefined,
        searchForBusinessNameOnly
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
              <CardFooter>
                <Form inline>
                  <FormGroup check className="mb-2 mr-sm-2 mb-sm-0">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={this.state.searchForBusinessNameOnly}
                        onChange={e =>
                          this.setState(
                            { searchForBusinessNameOnly: e.target.checked },
                            this.onFormSubmit
                          )
                        }
                      />{" "}
                      Name Only
                    </Label>
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>Industry</Label>
                    <Select
                      style={{ minWidth: 200 }}
                      clearable
                      tabSelectsValue={false}
                      value={this.state.industry}
                      onChange={industry =>
                        this.setState({ industry }, this.onFormSubmit)
                      }
                      valueKey="id"
                      labelKey="name"
                      options={this.props.industries}
                    />
                  </FormGroup>
                </Form>
              </CardFooter>
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
              onTeleUserNameList={this.props.onTeleUserNameList}
              onTeleUserSMSSubmit={this.props.onTeleUserSMSSubmit}
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
              teleUsers={this.props.teleUsers}
              composeSMSText={this.state.composeSMSText}
            />
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
      industries: { industries },
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
    industries,
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
    onIndustryList,
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onCityEachList,
    onTeleUserList,
    onTeleUserUpdate,
    onTeleUserSMSSubmit,
    onTeleUserNameList
  }
)(TeleCalling);
