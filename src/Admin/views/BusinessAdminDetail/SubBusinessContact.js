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

import { validatePhone, validateEmail } from "../../../Common/utils/Extras";

class SubBusinessContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.contact.name,
      email: props.contact.email,
      designation: props.contact.designation,
      mobileNumber: props.contact.mobileNumber,
      department: props.contact.department,
      collapsed: false,
      email_validation_error:
        this.props.contact.email && !validateEmail(this.props.contact.email)
          ? true
          : false,
      phone_validation_error:
        this.props.contact.mobileNumber &&
        !validatePhone(this.props.contact.mobileNumber)
          ? true
          : false
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
        department: this.props.contact.department,
        email_validation_error:
          this.props.contact.email && !validateEmail(this.props.contact.email)
            ? true
            : false,
        phone_validation_error:
          this.props.contact.mobileNumber &&
          !validatePhone(this.props.contact.mobileNumber)
            ? true
            : false
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
    const val = event.target.value;

    if (key === "name" || key === "department" || key === "designation") {
      this.setState(
        {
          [key]: val.replace(/\b\w/g, l => l.toUpperCase())
        },
        () => {
          this.props.onContactSave(this.state);
        }
      );
    } else if (key === "email") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (this.state.email && !validateEmail(this.state.email)) {
          this.setState({ email_validation_error: true }, () => {
            this.props.onContactSave(this.state);
          });
        } else
          this.setState({ email_validation_error: false }, () => {
            this.props.onContactSave(this.state);
          });
      });
    } else if (key === "mobileNumber") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (
          this.state.mobileNumber &&
          !validatePhone(this.state.mobileNumber)
        ) {
          this.setState({ phone_validation_error: true }, () => {
            this.props.onContactSave(this.state);
          });
        } else
          this.setState({ phone_validation_error: false }, () => {
            this.props.onContactSave(this.state);
          });
      });
    } else {
      this.setState({ [key]: val }, () => {
        this.props.onContactSave(this.state);
      });
    }
  };

  displayPhoneValidationInfo = () => {
    if (this.state.mobileNumber)
      if (this.state.phone_validation_error)
        return <p style={{ color: "red" }}>Invalid Phone Number</p>;
      else return <p style={{ color: "green" }}>Phone Number Valid</p>;
  };

  displayEmailValidationInfo = () => {
    if (this.state.email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
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
      department: "",
      email_validation_error: false,
      phone_validation_error: false
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
          <CardHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>Contact Person Detail - {this.props.id + 1}</strong>
            </div>
          </CardHeader>
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
                {this.displayEmailValidationInfo()}
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
                {this.displayPhoneValidationInfo()}
              </Col>
            </Row>
            <Row style={{ marginBottom: 15 }}>
              {/* <Col xs="6" md="6">
                  <Button
                    color="success"
                    onClick={() => this.props.onContactSave(this.state)}
                  >
                    <i className="fa fa-save" /> SAVE CONTACT
                  </Button>
                </Col> */}
              <Col xs="6" md="6">
                <Button color="danger" onClick={this.onContactDelete}>
                  <i className="fa fa-remove" /> DELETE
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
