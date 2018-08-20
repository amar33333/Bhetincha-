import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";

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
          <Col xs="12" md="4" className="mb-2">
            <Card key={each.professionalID}>
              <CardHeader>
                <strong>{each.company}</strong>
              </CardHeader>
              <CardBody>
                <p> Designation: {each.designation}</p>
                <p> Industry: {each.industry}</p>
                <p>
                  Worked from: {each.start_date} to: {each.end_date}
                </p>
                <Button
                  color="primary"
                  onClick={this.onEdit(each)}
                  className="mr-3"
                >
                  Edit
                </Button>
                <Button color="danger" onClick={this.onDelete(each)}>
                  Delete
                </Button>
              </CardBody>
            </Card>
          </Col>
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
        <Row>{this.renderExperienceDetails()}</Row>
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
