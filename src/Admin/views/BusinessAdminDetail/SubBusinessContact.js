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
      name: props.contact.name,
      email: props.contact.email,
      designation: props.contact.designation,
      mobileNumber: props.contact.mobileNumber,
      department: props.contact.department,
      collapsed: false
    };
  }
  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.contact !== this.props.contact) {
      return {
        name: this.props.contact.name,
        email: this.props.contact.email,
        designation: this.props.contact.designation,
        mobileNumber: this.props.contact.mobileNumber,
        department: this.props.contact.department
      };
    }
  }

  // static getDerivedStateFromProps = nextProps => {
  //   console.log("getssdsdfsdfdf");
  //   return nextProps.contact
  //     ? {
  //         name: nextProps.contact.name,
  //         email: nextProps.contact.email,
  //         designation: nextProps.contact.designation,
  //         mobileNumber: nextProps.contact.mobileNumber,
  //         department: nextProps.contact.department
  //       }
  //     : null;
  // };

  onChange = (key, event) => {
    if (key === "name" || key === "department" || key === "designation") {
      this.setState({
        [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      });
    } else {
      this.setState({ [key]: event.target.value });
    }
  };

  onContactDelete = () => {
    this.clearState();
    this.props.onContactDelete();
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

  getState = () => {
    let reformed = {};
    for (var property in this.state) {
      reformed =
        this.state[property] !== "" &&
        this.state[property] !== null &&
        this.state[property] !== undefined &&
        this.state[property].length > 0
          ? { ...reformed, [property]: this.state[property] }
          : reformed;
    }
    console.log("contact reformed: ", reformed);
    return reformed;
  };

  render() {
    // // console.log("contact props: ", this.props);
    // // console.log("contact state: ", this.state);
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
              <strong>Contact Person Detail - {this.props.id + 1}</strong>

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
                    onClick={() => this.props.onContactSave(this.state)}
                  >
                    <i className="fa fa-save" /> SAVE CONTACT
                  </Button>
                </Col>
                <Col xs="6" md="6">
                  <Button color="danger" onClick={this.onContactDelete}>
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
