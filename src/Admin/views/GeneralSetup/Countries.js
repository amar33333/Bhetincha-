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
  CardHeader
} from "reactstrap";

import { onCountrySubmit } from "../../actions";

class Countries extends Component {
  state = { country: "" };

  onFormSubmit = event => {
    event.preventDefault();
    const { country } = this.state;
    this.props.onCountrySubmit({ country });
    this.setState({ country: "" });
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Country</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onFormSubmit} inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
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
                        placeholder="Type Country Name"
                        value={this.state.country}
                        onChange={this.onChange.bind(this, "country")}
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

export default connect(null, { onCountrySubmit })(Countries);