import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Label,
  Col
} from "reactstrap";

import { Select } from "../../../../Common/components";

class CategoryEditView extends Component {
  constructor(props) {
    super(props);
    const { name, hasProduct, tags } = props.category;
    this.state = {
      name,
      hasProduct,
      tags: tags
        ? tags.map(x => ({
            className: "Select-create-option-placeholder",
            label: x,
            value: x
          }))
        : []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      const { name, hasProduct, tags } = this.props.category;
      this.setState({
        name,
        hasProduct,
        tags: tags
          ? tags.map(x => ({
              className: "Select-create-option-placeholder",
              label: x,
              value: x
            }))
          : []
      });
    }
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    const { name, hasProduct, tags } = this.state;
    const tagsString = tags.map(({ value }) => value);
    let body = {};
    if (name !== this.props.category.name) {
      body.name = name;
    }
    if (hasProduct !== this.props.category.hasProduct) {
      body.hasProduct = hasProduct;
    }
    console.log(
      tagsString,
      this.props.tags,
      (!this.props.tags && tagsString.length) ||
        (this.props.tags &&
          tagsString.sort().join(",") !== this.props.tags.sort().join(","))
    );
    if (
      (!this.props.category.tags && tagsString.length) ||
      (this.props.category.tags &&
        tagsString.sort().join(",") !==
          this.props.category.tags.sort().join(","))
    ) {
      body.tags = tagsString;
    }
    if (Object.keys(body).length) {
      this.props.onCategoryUpdate({ body });
    }
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Update Category</strong>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onFormSubmit}>
            <FormGroup row>
              <Label sm={2}>Name</Label>
              <Col sm={10}>
                <Input
                  innerRef={ref => (this.focusableInput = ref)}
                  type="text"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} />
              <Col sm={10}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={this.state.hasProduct}
                      onClick={event =>
                        this.setState({ hasProduct: event.target.checked })
                      }
                    />
                    Has Products
                  </Label>
                </FormGroup>
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
            <Button color="primary">
              <span className="fa fa-check" /> Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default CategoryEditView;
