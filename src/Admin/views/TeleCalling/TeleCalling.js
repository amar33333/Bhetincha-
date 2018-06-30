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
  Badge,
  CardHeader
} from "reactstrap";
import debounce from "lodash.debounce";
import { Tab } from "semantic-ui-react";

import moment from "moment";

import { Select } from "../../../Common/components";
import { onLocationsList, onBusinessTeleCallingList } from "../../actions";

const TabPane = ({ business, show }) => (
  <Tab.Pane>
    {show && (
      <ol>
        {business.map(data => (
          <li key={data._id}>{data._source.business_name}</li>
        ))}
      </ol>
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

  onTabChange = (event, data) => {
    this.setState({ activeIndex: data.activeIndex }, this.onFormSubmit);
  };

  onFormSubmit = event => {
    event && event.preventDefault();

    const { location, query, activeIndex } = this.state;
    const now = new Date();
    if (query) {
      const body = {
        query,
        // open: !Boolean(activeIndex),
        open: Boolean(activeIndex),
        time: `2010-10-10T${now.getHours()}:${now.getMinutes()}Z`,
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

  debouncedQueryType = debounce(() => this.onFormSubmit(), 50);

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Place your query here</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.onFormSubmit} inline>
              <FormGroup
                className="mb-2 mr-sm-1 mb-sm-0"
                style={{ width: "89%" }}
              >
                <InputGroup style={{ width: "60%" }}>
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
                <InputGroup style={{ paddingLeft: "10px" }}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Location</InputGroupText>
                  </InputGroupAddon>
                  <Select
                    style={{ minWidth: 200 }}
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
                      this.state.locationSearchText ? this.props.locations : []
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
                </InputGroup>
              </FormGroup>
              <Button color="warning">
                <span className="fa fa-search" /> Search
              </Button>
            </Form>
          </CardBody>
        </Card>
        <Tab
          panes={this.panes}
          onTabChange={this.onTabChange}
          activeIndex={this.state.activeIndex}
        />
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { location, tele_calling } }) => ({
    ...location,
    ...tele_calling
  }),
  { onBusinessTeleCallingList, onLocationsList }
)(TeleCalling);
