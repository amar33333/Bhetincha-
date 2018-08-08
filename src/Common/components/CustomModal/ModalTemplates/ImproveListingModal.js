import React, { Component } from "react";
import {
  Row,
  Col,
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup
} from "reactstrap";

import Select from "react-select";

import { validateEmail } from "../../../../Common/utils/Extras";

const TYPE_A_NEW_ONE = "Type a new one";

class ImproveListingModal extends Component {
  state = {
    problem_type: "",
    more_information: "",
    name: "",
    email: "",
    about_you: "",
    new_problem_type_visible: false,
    new_problem_type: "",
    email_validation_error: false
  };

  componentDidMount() {
    this.props.onProblemTypesList();

    this.props.data.phone_number &&
      this.setState({
        about_you: "BUSINESS_OWNER"
      });
  }

  componentDidUpdate = prevProps => {
    if (this.props.problem_types !== prevProps.problem_types) {
      this.props.data.phone_number &&
        this.setState({
          problem_type: this.props.problem_types.find(
            each => each.name === "CLAIM_UNSUCCESSFUL"
          )
        });
    }
  };

  onChange = (key, event) => {
    const val = event.target.value;

    if (key === "email") {
      this.setState({ [key]: val === "" ? null : val }, () => {
        if (this.state.email && !validateEmail(this.state.email)) {
          this.setState({ email_validation_error: true });
        } else this.setState({ email_validation_error: false });
      });
    } else {
      this.setState({
        [key]: val
      });
    }
  };

  displayEmailValidationInfo = () => {
    if (this.state.email)
      if (this.state.email_validation_error)
        return <p style={{ color: "red" }}>Invalid Email</p>;
      else return <p style={{ color: "green" }}>Valid Email </p>;
  };

  handleSelectChange = value => {
    this.setState({ problem_type: value }, () => {
      if (
        this.state.problem_type &&
        this.state.problem_type.id === TYPE_A_NEW_ONE
      ) {
        this.setState({ new_problem_type_visible: true });
      } else {
        this.setState({ new_problem_type_visible: false });
      }
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const {
      problem_type,
      more_information,
      name,
      email,
      about_you,
      new_problem_type,
      new_problem_type_visible,
      email_validation_error
    } = this.state;

    if (!email_validation_error)
      this.props.onImproveListing({
        id: this.props.data.id,
        body: {
          problem_type: problem_type.id,
          new_problem_type: new_problem_type_visible
            ? new_problem_type
            : undefined,
          more_information,
          name,
          email,
          about_you,
          phone_number: this.props.data.phone_number
            ? this.props.data.phone_number
            : undefined
        }
      });
  };

  onRadioButtonChanged = event => {
    this.setState({ about_you: event.target.value });
  };

  render() {
    console.log("imporve listng props: ", this.props);
    console.log("imporve listng state: ", this.state);

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Row>
          <Col xs="12" md="12">
            <Label for="Company Name">
              <strong>Company Name: </strong>
            </Label>

            <span> {this.props.data && this.props.data.business_name}</span>
          </Col>
        </Row>
        {this.props.data &&
          this.props.data.phone_number && (
            <Row>
              <Col xs="12" md="12">
                <Label for="Mobile Number">
                  <strong>Mobile Number: </strong>
                </Label>

                <span> {this.props.data.phone_number}</span>
              </Col>
            </Row>
          )}
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label for="ProblemTypes">Problem Types</Label>
              <Select
                autoFocus
                autosize
                clearable
                disabled={this.props.data && this.props.data.phone_number}
                //required
                name="ProblemTypes"
                placeholder="Select Your Problem Type"
                className="select-problem-type"
                value={this.state.problem_type && this.state.problem_type.id}
                onChange={this.handleSelectChange}
                options={[
                  ...this.props.problem_types,
                  { id: TYPE_A_NEW_ONE, name: TYPE_A_NEW_ONE }
                ]}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
            {this.state.new_problem_type_visible && (
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>New Problem Type</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    // disabled={!this.state.new_problem_type_visible}
                    required
                    type="text"
                    placeholder="Type a new problem type ..."
                    value={this.state.new_problem_type}
                    onChange={this.onChange.bind(this, "new_problem_type")}
                  />
                </InputGroup>
              </FormGroup>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>More Information</InputGroupText>
                </InputGroupAddon>
                <Input
                  required
                  type="text"
                  placeholder="Write your information ..."
                  value={this.state.more_information}
                  onChange={this.onChange.bind(this, "more_information")}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Your Name</InputGroupText>
                </InputGroupAddon>
                <Input
                  required
                  type="text"
                  placeholder="Your Full Name"
                  value={this.state.name}
                  onChange={this.onChange.bind(this, "name")}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Your Email</InputGroupText>
                </InputGroupAddon>
                <Input
                  required
                  type="email"
                  placeholder="Your Email"
                  value={this.state.email}
                  onChange={this.onChange.bind(this, "email")}
                />
              </InputGroup>
            </FormGroup>
            {this.displayEmailValidationInfo()}

            <Label for="About You">About You: </Label>

            <FormGroup check>
              <Label check>
                <Input
                  required
                  type="radio"
                  name="radio1"
                  value="BUSINESS_OWNER"
                  disabled={this.props.data && this.props.data.phone_number}
                  checked={this.props.data && this.props.data.phone_number}
                  onChange={this.onRadioButtonChanged}
                />{" "}
                I am a Business Owner.
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  required
                  type="radio"
                  name="radio1"
                  value="USER"
                  disabled={this.props.data && this.props.data.phone_number}
                  onChange={this.onRadioButtonChanged}
                />{" "}
                I am a User.
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs="12" md="12">
            <FormGroup>
              <Button color="primary">
                <span className="fa fa-check" /> Submit
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ImproveListingModal;
