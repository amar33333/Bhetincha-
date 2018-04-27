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
      collapse: true
    };
  }
  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.add && this.props.onValueChange) {
  //     console.log("willUpdate called: ", nextState);
  //     this.props.onValueChange(nextState, this.props.id);
  //     this.setState({ add: false });
  //   } else {
  //     // console.log(" NOO willUpdate: ", nextState);
  //   }
  // }

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

  getState = () => this.state;

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader onClick={this.toggleCollapge}>
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
                color="danger"
                onClick={this.onDelete}
                style={{ float: "right" }}
              >
                DELETE
              </Button>
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
                {this.state.collapse ? (
                  <i className="fa fa-angle-up" />
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <CardBody>
              <Row>
                <Col xs="12" md="12">
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
                  <FormGroup>
                    <Label for="Deparment">Department</Label>
                    <Input
                      required
                      type="text"
                      value={this.state.department}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "department")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      required
                      type="email"
                      value={this.state.email}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "email")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Desgination">Designation</Label>
                    <Input
                      required
                      type="text"
                      value={this.state.designation}
                      onKeyDown={this._handleKeyPress}
                      onChange={this.onChange.bind(this, "designation")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Mobile Number">Mobile Number</Label>
                    <Input
                      required
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
                    color="primary"
                    onClick={() => this.props.onAdd(this.state, this.props.id)}
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
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default SubBusinessContact;
