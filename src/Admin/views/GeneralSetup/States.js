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

  componentWillMount() {
    this.props.onCountryList();
  }

  onFormSubmit = event => {
    event.preventDefault();

    const { state, country } = this.state;
    this.props.onStateSubmit({ state, country: country.value });
    this.setState({ state: "", country: "" });
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
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
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="Country">Country</Label>
                    <Select
                      autoFocus
                      autosize
                      clearable
                      required
                      name="Industies"
                      className="select-industry"
                      value={value}
                      onChange={this.handleSelectChange}
                      options={countries}
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
                        placeholder="Type State Name"
                        value={this.state.state}
                        onChange={this.onChange.bind(this, "state")}
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
  ({ AdminContainer: { general_setup } }) => ({ general_setup }),
  {
    onStateSubmit,
    onCountryList
  }
)(States);
