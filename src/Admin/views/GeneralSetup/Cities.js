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

import { onCitySubmit, onDistrictList } from "../../actions";

class Cities extends Component {
  state = { city: "", district: "" };
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentWillMount() {
    this.props.onDistrictList({ access_token: this.access_token });
  }

  onFormSubmit = event => {
    event.preventDefault();

    const { city, district } = this.state;

    this.props.onCitySubmit({
      city,
      district: district.value,
      access_token: this.access_token
    });
    this.setState({ city: "", district: "" });
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  handleSelectChange = district => {
    this.setState({ district });
  };

  render() {
    const districts = this.props.general_setup.districts
      ? this.props.general_setup.districts.map(district => {
          return { value: district.id, label: district.name };
        })
      : null;

    const { district } = this.state;
    const value = district && district.value;

    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add City</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="Industies">District</Label>
                    <Select
                      autoFocus
                      autosize
                      clearable
                      required
                      name="Industies"
                      className="select-industry"
                      value={value}
                      onChange={this.handleSelectChange}
                      options={districts}
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
                        placeholder="Type City Name"
                        value={this.state.city}
                        onChange={this.onChange.bind(this, "city")}
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
    onCitySubmit,
    onDistrictList
  }
)(Cities);
