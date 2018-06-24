import React, { Component } from "react";
import {
  Row,
  Col,
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup
} from "reactstrap";

import Select from "react-select";

class SubCategoryEditModal extends Component {
  state = { category: "", industry: "" };

  componentDidMount() {
    this.setState({
      category: this.props.data ? this.props.data : "",
      industry: this.props.data
        ? { id: this.props.data.industry, name: this.props.data.industry }
        : ""
    });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.category,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  handleIndustryChange = industry => {
    this.setState({ industry });
  };

  onFormEdit = event => {
    event.preventDefault();
    const {
      category,
      industry: { id }
    } = this.state;
    this.props.onCategoryEdit({ category, industry: id });
  };

  render() {
    console.log("sub category edit props: ", this.props);
    console.log("sub category edit state: ", this.state);

    const { industry } = this.state;
    const value = industry && industry.id;

    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label for="Industries">Industry</Label>
              <Select
                autoFocus
                autosize
                clearable
                required
                name="Industries"
                className="select-industry"
                value={value}
                onChange={this.handleIndustryChange}
                options={this.props.industries}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="10">
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  autoFocus
                  required
                  disabled={this.props.loading}
                  type="text"
                  placeholder="Type Category Name"
                  value={this.state.category ? this.state.category.name : ""}
                  onChange={this.onChange.bind(this, "category")}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs="12" md="2">
            <Button color="primary">
              <span className="fa fa-plus" /> SAVE
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SubCategoryEditModal;
