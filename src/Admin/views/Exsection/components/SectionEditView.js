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
    const { name, className } = props.section;
    this.state = {
      name,
      className: className || ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.section !== this.props.section) {
      const { name, className } = this.props.section;
      this.setState({
        name,
        className: className || ""
      });
    }
  }

  onChangeName = event =>
    this.setState({
      name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onFormSubmit = event => {
    event.preventDefault();
    const { name, className } = this.state;
    let body = {};
    if (name !== this.props.section.name) {
      body.name = name;
    }
    if (className && className !== this.props.section.className) {
      body.className = className;
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
              <Label sm={2}>Class Name</Label>
              <Col sm={10}>
                <Input
                  required
                  type="text"
                  placeholder="Eg. fa fa-industry"
                  value={this.state.className}
                  onChange={e => this.setState({ className: e.target.value })}
                />
                {this.props.section.className && (
                  <FormText color="muted">
                    Current Selection:{" "}
                    <span className={this.props.section.className} />
                  </FormText>
                )}
                {FaIconURLjsx}
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
