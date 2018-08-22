import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Button, Card } from "reactstrap";

import { isParamsUserSameAsLoggedUser } from "../../Common/utils/Extras";
import ExperienceDetailsComponent from "../components/ExperienceDetailsComponent";

import {
  onExperienceDetailList,
  handleOnBusinessFilterChange,
  onIndustryList,
  onExperienceDetailEdit,
  onExperienceDetailsList,
  onExperienceDetailRemove
} from "../actions";

class ExperienceDetailsEdit extends Component {
  componentDidMount() {
    this.props.onIndustryList();

    isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) &&
      this.props.onExperienceDetailList({
        id: this.props.individual_id,
        itemId: this.props.match.params.id
      });
  }

  render() {
    console.log("edit props: ", this.props);

    return isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) ? (
      <div>
        <ExperienceDetailsComponent
          handleOnBusinessFilterChange={this.props.handleOnBusinessFilterChange}
          onExperienceDetailEdit={this.props.onExperienceDetailEdit}
          isParamsUserSameAsLoggedUser={isParamsUserSameAsLoggedUser}
          individualName={this.props.match.params.individualName}
          username={this.props.username}
          individual_id={this.props.individual_id}
          businesses={this.props.businesses}
          fetchLoading={this.props.fetchLoading}
          industries={this.props.industries}
          data={this.props.experienceEachDetail}
        />
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
      experience: {
        businesses,
        fetchLoading,
        industries,
        experienceDetails,
        experienceEachDetail
      }
    }
  }) => ({
    businesses,
    fetchLoading,
    industries,
    experienceDetails,
    username,
    individual_id,
    experienceEachDetail
  }),
  {
    handleOnBusinessFilterChange,
    onIndustryList,
    onExperienceDetailEdit,
    onExperienceDetailsList,
    onExperienceDetailRemove,
    onExperienceDetailList
  }
)(ExperienceDetailsEdit);
