import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row, Form, Card, CardBody, CardHeader, Button } from "reactstrap";

import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import { onSkillsSubmit } from "../actions";

class Interests extends Component {
  state = { skills: [] };

  handleTagsChange = skills => this.setState({ skills });

  isParamsUserSameAsLoggedUser = () =>
    this.props.username === this.props.match.params.individualName;

  onFormSubmit = event => {
    event.preventDefault();

    this.isParamsUserSameAsLoggedUser() &&
      this.props.onSkillsSubmit({
        id: this.props.match.params.individualName,
        body: { skills: this.state.skills }
      });
  };

  render() {
    return this.isParamsUserSameAsLoggedUser() ? (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Skills</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <Row>
                    <Col xs="12" md="12">
                      <TagsInput
                        onlyUnique
                        disabled={this.props.loading}
                        addKeys={[9, 188]}
                        value={this.state.skills}
                        onChange={this.handleTagsChange}
                      />
                    </Col>
                  </Row>
                  <Button color="primary"> Submit </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    ) : (
      <Redirect to="/404" />
    );
  }
}

const mapStateToProps = ({
  auth: {
    cookies: {
      user_data: { username }
    }
  },
  IndividualContainer
}) => ({
  ...IndividualContainer,
  username
});

export default connect(
  mapStateToProps,
  { onSkillsSubmit }
)(Interests);
