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

const TYPE_A_NEW_ONE = "Type a new one";

class ImproveListingModal extends Component {
  state = {
    problem_type: "",
    more_information: "",
    name: "",
    email: "",
    about_you: "",
    new_problem_type_visible: false,
    new_problem_type: ""
  };

  componentDidMount() {
    this.props.onProblemTypesList();
  }

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value
    });
  };

  handleSelectChange = value => {
    this.setState({ problem_type: value }, () => {
      if (
        this.state.problem_type &&
        this.state.problem_type.id === TYPE_A_NEW_ONE
      ) {
        this.setState({ new_problem_type_visible: true });
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
      new_problem_type_visible
    } = this.state;

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
        about_you
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
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label for="ProblemTypes">Problem Types</Label>
              <Select
                autoFocus
                autosize
                clearable
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
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>New Problem Type</InputGroupText>
                </InputGroupAddon>
                <Input
                  disabled={!this.state.new_problem_type_visible}
                  required
                  type="text"
                  placeholder="Type a new problem type ..."
                  value={this.state.new_problem_type}
                  onChange={this.onChange.bind(this, "new_problem_type")}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="9">
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
            <Label for="About You">About You: </Label>

            <FormGroup check>
              <Label check>
                <Input
                  required
                  type="radio"
                  name="radio1"
                  value="BUSINESS_OWNER"
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
                  onChange={this.onRadioButtonChanged}
                />{" "}
                I am a User.
              </Label>
            </FormGroup>
          </Col>
          <Col xs="12" md="2">
            <Button fluid color="primary">
              <span className="fa fa-check" /> SUBMIT
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ImproveListingModal;
