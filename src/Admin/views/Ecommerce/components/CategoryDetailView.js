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
  Button
} from "reactstrap";

class CategoryDetailView extends Component {
  state = { category: "" };

  onChangeCategory = event =>
    this.setState({
      category: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onCategorySubmit({ name: this.state.category });
    this.setState({ category: "" });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Add New Category inside {this.props.name}</strong>
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
                    required
                    innerRef={ref => (this.focusableInput = ref)}
                    type="text"
                    placeholder="Type New Category Name"
                    value={this.state.category}
                    onChange={this.onChangeCategory}
                  />
                </InputGroup>
              </FormGroup>
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