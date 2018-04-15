import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Button,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader,
  Label
} from "reactstrap";

import Select from "react-select";

import { onStateList, onDistrictSubmit } from "../../actions";

class Districts extends Component {
  constructor(props) {
    super(props);
    this.state = { district: "", districtCode: "", state: "" };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.props.onStateList({ access_token: this.access_token });
  }

  onFormSubmit = event => {
    event.preventDefault();

    const { district, districtCode, state } = this.state;

    this.props.onDistrictSubmit({
      district,
      districtCode,
      state: state.value,
      access_token: this.access_token
    });
    this.setState({ district: "", districtCode: "", state: "" });
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  handleSelectChange = state => {
    this.setState({ state });
  };

  render() {
    const states = this.props.general_setup.states
      ? this.props.general_setup.states.map(state => {
          return { value: state.id, label: state.name };
        })
      : null;

    const { state } = this.state;
    const value = state && state.value;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add District</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="Industies">States</Label>
                    <Select
                      autoFocus
                      autosize
                      clearable
                      required
                      name="Industies"
                      className="select-industry"
                      value={value}
                      onChange={this.handleSelectChange}
                      options={states}
                    />
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-industry" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus
                        required
                        type="text"
                        placeholder="Type District Name"
                        value={this.state.district}
                        onChange={this.onChange.bind(this, "district")}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-industry" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoFocus
                        required
                        type="text"
                        placeholder="Type District Code"
                        value={this.state.districtCode}
                        onChange={this.onChange.bind(this, "districtCode")}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button
                    color="primary"
                    //onClick={() => this.onLoginBtnClick()}
                  >
                    <span className="fa fa-plus" /> Add
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { general_setup }, auth }) => ({ general_setup, ...auth }),
  {
    onStateList,
    onDistrictSubmit
  }
)(Districts);
