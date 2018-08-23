import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Card, CardHeader, CardBody, Button, Row, Col } from "reactstrap";

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
          <Col xs="12" md="4" className="mb-2" key={each.educationID}>
            <Card>
              <CardHeader>
                <strong>{each.level_of_education}</strong>
              </CardHeader>
              <CardBody>
                <p>
                  <strong>{each.name_of_college}</strong>
                </p>
                <p>
                  Attended From: {new Date(each.start_date).getFullYear()} to{" "}
                  {new Date(each.end_date).getFullYear()}
                </p>
                <p> Show in Profile: {each.show ? "True" : "False"}</p>
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
        <Row>{this.renderEducationDetails()}</Row>
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
