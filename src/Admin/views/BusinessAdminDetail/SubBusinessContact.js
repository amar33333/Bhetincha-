import React, { Component } from "react";

import {
  Button,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

class SubBusinessContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact_person_name: "",
      contact_person_email: "",
      contact_person_designation: "",
      contact_person_mobile_number: "",
      add: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.add && this.props.onValueChange) {
      console.log("willUpdate called: ", nextState);
      this.props.onValueChange(nextState, this.props.id);
      this.setState({ add: false });
    } else {
      // console.log(" NOO willUpdate: ", nextState);
    }
  }

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  onDelete = () => {
    this.clearState();
    this.props.onDelete(this.props.id);
  };

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
            <strong>
              Contact Person Detail - {this.props.serial_num + 1}{" "}
            </strong>
            <Button
              color="primary"
              onClick={this.onDelete}
              style={{ float: "right" }}
            >
              DELETE
            </Button>
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
              </Col>
            </Row>
            <Row style={{ marginBottom: 15 }}>
              <Col xs="6" md="6">
                <Button
                  color="primary"
                  onClick={() => this.setState({ add: true })}
                >
                  ADD
                </Button>
              </Col>
              <Col xs="6" md="6">
                <Button color="primary" onClick={this.onDelete}>
                  DELETE
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SubBusinessContact;
