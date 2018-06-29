import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Col,
  Row,
  FormGroup
} from "reactstrap";

class CountryEditModal extends Component {
  state = { country: "" };

  componentDidMount() {
    this.setState({
      country: this.props.data ? this.props.data : ""
    });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.country,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { country } = this.state;
    this.props.onCountryEdit({ country });
  };

  render() {
    return (
      <Form onSubmit={this.onFormEdit} inline>
        <Row>
          <Col xs="12" md="9">
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input
                  autoFocus
                  required
                  disabled={this.props.loading}
                  type="text"
                  placeholder="Type country Name"
                  value={this.state.country ? this.state.country.name : ""}
                  onChange={this.onChange.bind(this, "country")}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs="12" md="3">
            <Button color="primary">
              <span className="fa fa-check" /> SAVE
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CountryEditModal;
