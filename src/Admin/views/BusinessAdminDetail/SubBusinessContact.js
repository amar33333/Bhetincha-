import React, { Component } from "react";

import { Card, CardHeader, CardBody } from "reactstrap";

import { Row, Col, Input, Label, FormGroup } from "reactstrap";

class SubBusinessContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact_person_name: "",
      contact_person_email: "",
      contact_person_designation: "",
      contact_person_mobile_number: ""
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onSubmit) this.props.onSubmit(nextState);
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  clearState = () => {
    this.setState({
      contact_person_name: "",
      contact_person_email: "",
      contact_person_designation: "",
      contact_person_mobile_number: ""
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Contact Person Details</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" md="12">
                <FormGroup>
                  <Label for="Name">Full Name</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.contact_person_name}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "contact_person_name")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    required
                    type="email"
                    value={this.state.contact_person_email}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(this, "contact_person_email")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Desgination">Designation</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.contact_person_designation}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(
                      this,
                      "contact_person_designation"
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Mobile Number">Mobile Number</Label>
                  <Input
                    required
                    type="text"
                    value={this.state.contact_person_mobile_number}
                    onKeyDown={this._handleKeyPress}
                    onChange={this.onChange.bind(
                      this,
                      "contact_person_mobile_number"
                    )}
                  />
                </FormGroup>
                {/* <FormGroup check>
                          <Label for="visible_to_public" check>
                            <Input type="checkbox" /> Visible To Public
                          </Label>
                        </FormGroup> */}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessContact;
