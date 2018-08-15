import React, { Component } from "react";
import { Col, Row, Form, Card, CardBody, CardHeader, Button } from "reactstrap";

import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

class Interests extends Component {
  state = { skills: [] };

  handleTagsChange = skills => this.setState({ skills });

  onFormSubmit = event => {
    event.preventDefault();
    console.log("hukahsdujkahdasjkdas");
  };

  render() {
    return (
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
    );
  }
}

export default Interests;
