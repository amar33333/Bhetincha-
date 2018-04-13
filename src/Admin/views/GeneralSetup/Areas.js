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

class Areas extends Component {
  state = { area: "" };

  onFormSubmit = event => {
    event.preventDefault();
    // const { industry } = this.state;
    // this.props.onIndustrySubmit({ industry });
    this.setState({ area: "" });
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
                <strong>Add Area</strong>
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

export default Areas;
