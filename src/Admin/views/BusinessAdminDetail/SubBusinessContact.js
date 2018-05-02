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
  CardBody,
  Collapse
} from "reactstrap";

class SubBusinessContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      designation: "",
      mobileNumber: "",
      department: "",
      collapsed: false
    };
  }
  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  static getDerivedStateFromProps = nextProps =>
    nextProps.contact && nextProps.edit
      ? {
          name: nextProps.contact.name,
          email: nextProps.contact.email,
          designation: nextProps.contact.designation,
          mobileNumber: nextProps.contact.mobileNumber,
          department: nextProps.contact.department
        }
      : null;

  onChange = (key, event) => this.setState({ [key]: event.target.value });

  onDelete = () => {
    this.clearState();
    this.props.onDelete(this.props.id);
  };

  clearState = () => {
    this.setState({
      name: "",
      email: "",
      designation: "",
      mobileNumber: "",
      department: ""
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader onClick={this.toggleCollapse}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>
                Contact Person Detail - {this.props.serial_num + 1}{" "}
              </strong>

              <Button
                color="primary"
                onClick={this.toggleCollapse}
                style={{
                  marginBottom: "0rem",
                  backgroundColor: "rgb(230, 228, 241)",
                  color: "black",
                  fontSize: "1.3rem",
                  border: "1px solid #2e219036",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {!this.props.collapsed ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={!this.state.collapsed}>
            <CardBody>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="Name">Full Name</Label>
                    <Input
                      required
                      type="text"
                      value={this.state.name}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "name")}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  {" "}
                  <FormGroup>
                    <Label for="Deparment">Department</Label>
                    <Input
                      type="text"
                      value={this.state.department}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "department")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      type="email"
                      value={this.state.email}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "email")}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label for="Desgination">Designation</Label>
                    <Input
                      type="text"
                      value={this.state.designation}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "designation")}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="4">
                  <FormGroup>
                    <Label for="Mobile Number">Mobile Number</Label>
                    <Input
                      type="text"
                      value={this.state.mobileNumber}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "mobileNumber")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 15 }}>
                <Col xs="6" md="6">
                  <Button
                    color="success"
                    onClick={() => this.props.onAdd(this.state, this.props.id)}
                  >
                    <i className="fa fa-save" /> SAVE CONTACT
                  </Button>
                </Col>
                <Col xs="6" md="6">
                  <Button color="danger" onClick={this.onDelete}>
                    <i className="fa fa-remove" /> DELETE
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessContact;
