import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Input,
  Button,
  Label,
  Col
} from "reactstrap";

import { Select } from "../../../../Common/components";
import { FaIconURLjsx } from "../../../../Common/utils/Extras";

class SectionEditView extends Component {
  constructor(props) {
    super(props);
    const { name, label, className } = props.section;
    this.state = {
      name,
      label,
      className: className || ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.section !== this.props.section) {
      const { name, label, className } = this.props.section;
      this.setState({
        name,
        label,
        className: className || ""
      });
    }
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onChangeLabel = event =>
    this.setState({
      label: event.target.value
    });

  onFormSubmit = event => {
    event.preventDefault();
    const { name } = this.state;
    const { label } = this.state;
    let body = {};
    if (name !== this.props.section.name) {
      body.name = name;
    }
    if (label !== this.props.section.label) {
      body.label = label;
    }

    if (Object.keys(body).length) {
      this.props.onSectionUpdate({ body });
    }
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Update Section</strong>
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
              <Label sm={2}>Label</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  value={this.state.label}
                  onChange={this.onChangeLabel}
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

export default SectionEditView;
