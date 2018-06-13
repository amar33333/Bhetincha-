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
  Label
} from "reactstrap";

class CategoryEditView extends Component {
  constructor(props) {
    super(props);
    const { name, hasProduct } = props;
    this.state = { name, hasProduct };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.name !== this.props.name ||
      prevProps.hasProduct !== this.props.hasProduct
    ) {
      const { name, hasProduct } = this.props;
      this.setState({ name, hasProduct });
    }
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    const { name, hasProduct } = this.state;
    let body = {};
    if (name !== this.props.name) {
      body.name = name;
    }
    if (hasProduct !== this.props.hasProduct) {
      body.hasProduct = hasProduct;
    }
    if (Object.keys(body).length) {
      this.props.onCategoryUpdate({ body });
    }
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Update Category</strong>
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
                    innerRef={ref => (this.focusableInput = ref)}
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </InputGroup>
              </FormGroup>
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
              <Button color="primary">
                <span className="fa fa-plus" /> Update
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default CategoryEditView;
