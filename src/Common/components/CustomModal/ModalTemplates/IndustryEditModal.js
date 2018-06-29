import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  Row,
  Col
} from "reactstrap";

class IndustryEditModal extends Component {
  state = { industry: "" };

  componentDidMount() {
    this.setState({
      industry: this.props.data ? this.props.data : ""
    });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.industry,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { industry } = this.state;
    this.props.onIndustryEdit({ industry });
  };

  render() {
    console.log("industry edit state: ", this.state);
    return (
      <Form onSubmit={this.onFormEdit} inline>
        <Row>
          <Col xs="12" md="8">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-industry" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                autoFocus
                required
                disabled={this.props.loading}
                type="text"
                placeholder="Type Industry Name"
                value={this.state.industry ? this.state.industry.name : ""}
                onChange={this.onChange.bind(this, "industry")}
              />
            </InputGroup>
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

export default IndustryEditModal;
