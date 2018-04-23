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

import { onCityList, onAreaSubmit } from "../../actions";

class Areas extends Component {
  state = { area: "", city: "" };
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentWillMount() {
    this.props.onCityList({ access_token: this.access_token });
  }

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  handleSelectChange = city => {
    this.setState({ city });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const { area, city } = this.state;

    this.props.onAreaSubmit({
      area,
      city: city.value,
      access_token: this.access_token
    });
    this.setState({ area: "", city: "" });
  };

  render() {
    const cities = this.props.general_setup.cities
      ? this.props.general_setup.cities.map(city => {
          return { value: city.id, label: city.name };
        })
      : null;

    const { city } = this.state;
    const value = city && city.value;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Area</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="Industies">Cities</Label>
                    <Select
                      autoFocus
                      autosize
                      clearable
                      required
                      name="Industies"
                      className="select-industry"
                      value={value}
                      onChange={this.handleSelectChange}
                      options={cities}
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
                        placeholder="Type Area Name"
                        value={this.state.area}
                        onChange={this.onChange.bind(this, "area")}
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
    onCityList,
    onAreaSubmit
  }
)(Areas);
