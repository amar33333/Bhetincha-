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
  Label,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";

import Select from "react-select";

import { onStateSubmit, onCountryList } from "../../actions";

class States extends Component {
  state = { state: "", country: "" };
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentWillMount() {
    this.props.onCountryList({ access_token: this.access_token });
  }

  onFormSubmit = event => {
    event.preventDefault();

    const { state, country } = this.state;

    this.props.onStateSubmit({
      state,
      country: country.value,
      access_token: this.access_token
    });
    this.setState({ state: "", country: "" });
  };

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });
  };

  handleSelectChange = country => {
    this.setState({ country });
  };

  render() {
    const countries = this.props.general_setup.countries
      ? this.props.general_setup.countries.map(country => {
          return { value: country.id, label: country.name };
        })
      : null;

    const { country } = this.state;
    const value = country && country.value;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add State</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <Row>
                    <Col xs="12">
                      <FormGroup>
                        <Label for="Country">Country</Label>
                        <Select
                          autoFocus
                          autosize
                          clearable
                          required
                          name="Industies"
                          className="select-industry mb-2"
                          value={value}
                          onChange={this.handleSelectChange}
                          options={countries}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
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
                          placeholder="Type State Name"
                          value={this.state.state}
                          onChange={this.onChange.bind(this, "state")}
                        />
                      </InputGroup>
                      <Button color="primary">
                        <span className="fa fa-plus" /> Add
                      </Button>
                    </Col>
                  </Row>
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
    onStateSubmit,
    onCountryList
  }
)(States);
