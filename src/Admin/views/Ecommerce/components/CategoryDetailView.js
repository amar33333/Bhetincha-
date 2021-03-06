import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Col
} from "reactstrap";
import { Select } from "../../../../Common/components";
import { FaIconURLjsx } from "../../../../Common/utils/Extras";

class CategoryDetailView extends Component {
  state = { category: "", tags: [], className: "" };

  onChangeCategory = event =>
    this.setState({
      category: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onCategorySubmit({
      name: this.state.category,
      tags: this.state.tags.map(({ value }) => value),
      className: this.state.className
    });
    this.setState({ category: "", tags: [], className: "" });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Add New Category inside {this.props.name}</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup row>
                <Label sm={2}>Name</Label>
                <Col sm={10}>
                  <Input
                    required
                    innerRef={ref => (this.focusableInput = ref)}
                    type="text"
                    placeholder="Type New Category Name"
                    value={this.state.category}
                    onChange={this.onChangeCategory}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Tags</Label>
                <Col sm={10}>
                  <Select.Creatable
                    multi
                    onChange={tags => this.setState({ tags })}
                    value={this.state.tags}
                    noResultsText="Type option and press tab or enter"
                    placeholder="Create tags"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Class Name</Label>
                <Col sm={10}>
                  <Input
                    required
                    type="text"
                    placeholder="Eg. fa fa-industry"
                    value={this.state.className}
                    onChange={e => this.setState({ className: e.target.value })}
                  />
                  {FaIconURLjsx}
                </Col>
              </FormGroup>
              {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-industry" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    innerRef={ref => (this.focusableInput = ref)}
                    type="text"
                    placeholder="Type New Category Name"
                    value={this.state.category}
                    onChange={this.onChangeCategory}
                  />
                </InputGroup>
              </FormGroup> */}
              <Button color="primary">
                <span className="fa fa-plus" /> Add
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default CategoryDetailView;
