import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Card, Button } from "reactstrap";

import { isParamsUserSameAsLoggedUser } from "../../Common/utils/Extras";
import EducationDetailsComponent from "../components/EducationDetailsComponent";

import {
  onEducationDetailsSubmit,
  onEducationDetailsList,
  onEducationDetailRemove
} from "../actions";

class EducationDetails extends Component {
  componentDidMount() {
    isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) &&
      this.props.onEducationDetailsList({
        id: this.props.individual_id
      });
  }

  onEdit = each => () => {
    this.props.history.push(`${this.props.match.url}/${each.educationID}/edit`);
  };

  onDelete = item => () => {
    this.props.onEducationDetailRemove({
      id: this.props.individual_id,
      itemId: item.educationID
    });
  };

  renderEducationDetails() {
    return this.props.educationDetails.length
      ? this.props.educationDetails.map(each => (
          <Card key={each.educationID} style={{ marginBottom: 20 }}>
            <p> {each.level_of_education}</p>
            <p> {each.name_of_college}</p>
            <p> {each.start_date}</p>
            <p> {each.end_date}</p>
            <p> Show in Profile: {each.show ? "True" : "False"}</p>
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
    return isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) ? (
      <div>
        <EducationDetailsComponent
          onEducationDetailsSubmit={this.props.onEducationDetailsSubmit}
          isParamsUserSameAsLoggedUser={isParamsUserSameAsLoggedUser}
          individualName={this.props.match.params.individualName}
          username={this.props.username}
          individual_id={this.props.individual_id}
        />
        {this.renderEducationDetails()}
      </div>
    ) : (
      <Redirect to="/404" />
    );
  }
}

const mapStateToProps = ({
  auth: {
    cookies: {
      user_data: { username, individual_id }
    }
  },
  IndividualContainer: { education }
}) => ({
  ...education,
  username,
  individual_id
});

export default connect(
  mapStateToProps,
  {
    onEducationDetailsSubmit,
    onEducationDetailsList,
    onEducationDetailRemove
  }
)(EducationDetails);
