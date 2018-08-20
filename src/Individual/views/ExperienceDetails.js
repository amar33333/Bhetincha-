import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";
import debounce from "lodash.debounce";
import moment from "moment";
import Datetime from "react-datetime";

import { Col, Row, Input, FormGroup, Label, Form, Button } from "reactstrap";

import { isParamsUserSameAsLoggedUser } from "../../Common/utils/Extras";

import {
  onBusinessAllGet,
  handleOnBusinessFilterChange,
  onIndustryList,
  onExperienceDetailsSubmit,
  onExperienceDetailsList
} from "../actions";

class ExperienceDetails extends Component {
  state = {
    company: "",
    designation: "",
    industry: "",
    start_date: "",
    end_date: ""
  };

  componentDidMount() {
    this.props.onIndustryList();
    this.props.onExperienceDetailsList({
      id: this.props.individual_id
    });
  }

  onChange = (key, event) =>
    this.setState({
      [key]: event.target.value
    });

  debouncedAutocomplete = debounce(q =>
    this.props.handleOnBusinessFilterChange({
      q
    })
  );
  onFormSubmit = event => {
    event.preventDefault();

    isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) &&
      this.props.onExperienceDetailsSubmit({
        id: this.props.individual_id,
        body: {
          designation: this.state.designation,
          industry: this.state.industry ? this.state.industry.id : null,
          start_date: moment(this.state.start_date).format("YYYY-MM-DDTHH:mmZ"),
          end_date: moment(this.state.end_date).format("YYYY-MM-DDTHH:mmZ"),
          company: this.state.company ? this.state.company.id : null
        }
      });
  };

  handleChange = newValue => {
    console.log(newValue);
    this.setState({
      company: newValue
    });
  };
  // handleInputChange = (inputValue: any, actionMeta: any) => {
  //   console.group("Input Changed");
  //   console.log(inputValue);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };
  render() {
    console.log(this.props);

    return isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) ? (
      <div>
        <Form onSubmit={this.onFormSubmit}>
          <Select
            isClearable
            tabSelectsValue={false}
            isLoading={this.props.fetchLoading}
            onInputChange={this.debouncedAutocomplete}
            onFocus={() => this.debouncedAutocomplete(" ")}
            value={this.state.company}
            onChange={this.handleChange}
            valueKey="id"
            labelKey="business_name"
            filterOptions={options => options}
            options={!this.props.fetchLoading ? this.props.businesses : []}
            noResultsText={
              !this.props.fetchLoading ? "No Results Found" : "Loading..."
            }
          />
          <CreatableSelect
            value={this.state.industry}
            onChange={industry => this.setState({ industry })}
            valueKey="id"
            labelKey="name"
            options={this.props.industries}
            noResultsText={
              !this.props.fetchLoading ? "No Results Found" : "Loading..."
            }
          />
          <Input
            type="text"
            required
            placeholder="Designation"
            value={this.state.designation}
            onChange={this.onChange.bind(this, "designation")}
          />
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label>Start Date-Time</Label>
                <Datetime
                  //disabled={this.props.loading}
                  value={this.state.start_date}
                  onChange={time => {
                    this.setState({
                      start_date: moment(time)
                    });
                  }}
                  // utc={true}
                  disableOnClickOutside={false}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label>End Date-Time</Label>
                <Datetime
                  //disabled={this.props.loading}
                  value={this.state.end_date}
                  onChange={time => {
                    this.setState({
                      end_date: moment(time)
                    });
                  }}
                  // utc={true}
                  disableOnClickOutside={false}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button> Submit</Button>
        </Form>
      </div>
    ) : (
      <Redirect to="/404" />
    );
  }
}

export default connect(
  ({
    auth: {
      cookies: {
        user_data: { username, individual_id }
      }
    },
    IndividualContainer: {
      experience: { businesses, fetchLoading, industries, experienceDetails }
    }
  }) => ({
    businesses,
    fetchLoading,
    industries,
    experienceDetails,
    username,
    individual_id
  }),
  {
    onBusinessAllGet,
    handleOnBusinessFilterChange,
    onIndustryList,
    onExperienceDetailsSubmit,
    onExperienceDetailsList
  }
)(ExperienceDetails);
