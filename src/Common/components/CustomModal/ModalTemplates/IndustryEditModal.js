import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Row,
  Col
} from "reactstrap";
import { ErrorHandling } from "../../../utils/Extras";

class IndustryEditModal extends Component {
  state = { industry: "" };

  componentDidMount() {
    this.setState({
      industry: this.props.data ? this.props.data : ""
    });
  }

  componentWillUnmount = () => {
    this.props.resetIndustryErrors();
  };

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
    return (
      <Form onSubmit={this.onFormEdit}>
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
                //disabled={this.props.loading}
                type="text"
                placeholder="Type Industry Name"
                value={this.state.industry ? this.state.industry.name : ""}
                onChange={this.onChange.bind(this, "industry")}
              />
            </InputGroup>
          </Col>
          <ErrorHandling
            error={
              this.props.industryEditErrors &&
              this.props.industryEditErrors.name
            }
          />
          <Col xs="12" md="2">
            <Button color="primary" disabled={this.props.loading}>
              <span className="fa fa-check" /> Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default IndustryEditModal;
