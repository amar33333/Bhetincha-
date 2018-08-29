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
import { ErrorHandling } from "../../../utils/Extras";

class CategoryEditModal extends Component {
  state = { category: "", industry: "", sections: [] };

  componentDidMount() {
    this.setState({
      category: this.props.data ? this.props.data : "",
      industry: this.props.data.industry,
      sections: this.props.data.sections.map(sections => ({
        id: sections.id,
        name: sections.name
      }))
    });
  }

  componentWillUnmount = () => {
    this.props.resetCategoryErrors();
  };

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

  handleSelectSectionsAdminChange = (key, value) => {
    this.setState({ [key]: value });
    //console.log("Sections : "+ value);
  };

  onFormEdit = event => {
    event.preventDefault();
    const {
      category,
      industry: { id }
    } = this.state;
    const sections = this.state.sections.map(section => section.id);
    this.props.onCategoryEdit({ category, industry: id, sections });
  };

  render() {
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
          <Col xs="12" md="9">
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input
                  autoFocus
                  required
                  //disabled={this.props.loading}
                  type="text"
                  placeholder="Type Category Name"
                  value={this.state.category ? this.state.category.name : ""}
                  onChange={this.onChange.bind(this, "category")}
                />
              </InputGroup>
            </FormGroup>
            <ErrorHandling
              error={
                this.props.categoryEditErrors &&
                this.props.categoryEditErrors.name
              }
            />
          </Col>
          {/* <Col xs="12" md="2">
            <Button color="primary" disabled={this.props.loading}>
              <span className="fa fa-check" /> Save
            </Button>
          </Col> */}
        </Row>
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label for="Sections">Section</Label>
              <Select
                multi
                onChange={this.handleSelectSectionsAdminChange.bind(
                  this,
                  "sections"
                )}
                clearable
                required
                name="Sections"
                className="select-section"
                value={this.state.sections}
                options={this.props.sectionsAdmin}
                valueKey="id"
                labelKey="name"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
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

export default CategoryEditModal;
