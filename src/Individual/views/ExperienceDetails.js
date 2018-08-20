import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Button, Card } from "reactstrap";

import { isParamsUserSameAsLoggedUser } from "../../Common/utils/Extras";
import ExperienceDetailsComponent from "../components/ExperienceDetailsComponent";

import {
  handleOnBusinessFilterChange,
  onIndustryList,
  onExperienceDetailsSubmit,
  onExperienceDetailsList,
  onExperienceDetailRemove
} from "../actions";

class ExperienceDetails extends Component {
  componentDidMount() {
    this.props.onIndustryList();

    isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) &&
      this.props.onExperienceDetailsList({
        id: this.props.individual_id
      });
  }

  onEdit = each => () => {
    this.props.history.push(
      `${this.props.match.url}/${each.professionalID}/edit`
    );
  };

  onDelete = item => () => {
    this.props.onExperienceDetailRemove({
      id: this.props.individual_id,
      itemId: item.professionalID
    });
  };

  renderExperienceDetails() {
    return this.props.experienceDetails.length
      ? this.props.experienceDetails.map(each => (
          <Card key={each.professionalID} style={{ marginBottom: 20 }}>
            <p> Company: {each.company}</p>
            <p> Designation: {each.designation}</p>
            <p> Industry: {each.industry}</p>
            <p> Start Date:{each.start_date}</p>
            <p> End Date: {each.end_date}</p>
            <p> {each.end_date}</p>
            <Button color="primary" onClick={this.onEdit(each)}>
              Edit
            </Button>
            <Button color="primary" onClick={this.onDelete(each)}>
              Delete
            </Button>
          </Card>
        ))
      : null;
  }
  render() {
    console.log(this.props);

    return isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) ? (
      <div>
        <ExperienceDetailsComponent
          handleOnBusinessFilterChange={this.props.handleOnBusinessFilterChange}
          onExperienceDetailsSubmit={this.props.onExperienceDetailsSubmit}
          isParamsUserSameAsLoggedUser={isParamsUserSameAsLoggedUser}
          individualName={this.props.match.params.individualName}
          username={this.props.username}
          individual_id={this.props.individual_id}
          businesses={this.props.businesses}
          fetchLoading={this.props.fetchLoading}
          industries={this.props.industries}
        />
        {this.renderExperienceDetails()}
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
    handleOnBusinessFilterChange,
    onIndustryList,
    onExperienceDetailsSubmit,
    onExperienceDetailsList,
    onExperienceDetailRemove
  }
)(ExperienceDetails);
