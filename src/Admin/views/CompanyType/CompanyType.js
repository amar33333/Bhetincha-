import React, { Component } from "react";
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
import { connect } from "react-redux";

import { onCompanyTypeSubmit } from "../../actions";

class CompanyType extends Component {
  state = {
    company_type: ""
  };

  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  onFormSubmit = event => {
    event.preventDefault();
    const { company_type } = this.state;
    console.log("view compas:", company_type);
    this.props.onCompanyTypeSubmit({
      company_type,
      access_token: this.access_token
    });
    this.setState({ company_type: "" });
  };

  onChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    return (
      <div>
        <Row className="hr-centered">
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Add Company Type</strong>
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
                        placeholder="Enter Company Type"
                        value={this.state.company_type}
                        onChange={this.onChange.bind(this, "company_type")}
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button color="primary">
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
  ({ AdminContainer: { business_reducer }, auth }) => ({
    ...business_reducer,
    ...auth
  }),
  { onCompanyTypeSubmit }
)(CompanyType);
