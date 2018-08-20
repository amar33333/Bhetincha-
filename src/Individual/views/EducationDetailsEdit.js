import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import EducationDetailsComponent from "../components/EducationDetailsComponent";

import { isParamsUserSameAsLoggedUser } from "../../Common/utils/Extras";

import { onEducationDetailEdit, onEducationDetailList } from "../actions";

class EducationDetailsEdit extends Component {
  componentDidMount() {
    isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) &&
      this.props.onEducationDetailList({
        id: this.props.individual_id,
        itemId: this.props.match.params.id
      });
  }

  render() {
    console.log("edit: ", this.props);
    return isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) ? (
      this.props.educationEachDetail && (
        <EducationDetailsComponent
          onEducationDetailEdit={this.props.onEducationDetailEdit}
          isParamsUserSameAsLoggedUser={isParamsUserSameAsLoggedUser}
          individualName={this.props.match.params.individualName}
          username={this.props.username}
          individual_id={this.props.individual_id}
          data={this.props.educationEachDetail}
          history={this.props.history}
        />
      )
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
}) => ({ username, individual_id, ...education });

export default connect(
  mapStateToProps,
  { onEducationDetailEdit, onEducationDetailList }
)(EducationDetailsEdit);
