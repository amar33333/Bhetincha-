import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row, Form, Card, CardBody, CardHeader, Button } from "reactstrap";

import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import { isParamsUserSameAsLoggedUser } from "../../Common/utils/Extras";

import { onSkillsSubmit, onSkillsList } from "../actions";

class Interests extends Component {
  state = { skills: [] };

  componentDidMount() {
    this.props.onSkillsList({ id: this.props.individual_id });
  }

  componentDidUpdate = prevProps => {
    if (this.props.skills !== prevProps.skills) {
      this.setState({ skills: this.props.skills });
    }
  };

  handleTagsChange = skills => this.setState({ skills });

  onFormSubmit = event => {
    event.preventDefault();

    isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) &&
      this.props.onSkillsSubmit({
        id: this.props.individual_id,
        body: { skills: this.state.skills }
      });
  };

  render() {
    console.log(this.props);
    return isParamsUserSameAsLoggedUser(
      this.props.username,
      this.props.match.params.individualName
    ) ? (
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
                  <Row className="mt-4">
                    <Col>
                      <Button
                        color="primary"
                        disabled={
                          this.props.loading || this.props.skillsLoading
                        }
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
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
      user_data: { username, individual_id }
    }
  },
  IndividualContainer: { interests }
}) => ({
  ...interests,
  username,
  individual_id
});

export default connect(
  mapStateToProps,
  { onSkillsSubmit, onSkillsList }
)(Interests);
