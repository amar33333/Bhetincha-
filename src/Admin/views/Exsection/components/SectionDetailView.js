import React, { Component } from "react";
import {
  Row,
  Col,
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

class SectionDetailView extends Component {
  state = { section: "", label: "" };

  onChangeSection = event =>
    this.setState({
      section: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
    });

  onChangeLabel = event =>
    this.setState({
      label: event.target.value
    });

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSectionSubmit({
      name: this.state.section,
      label: this.state.label == "" ? "Default Label" : this.state.label
    });
    this.setState({ section: "", label: "" });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Add New Section inside {this.props.name} </strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.onFormSubmit}>
              <Row>
                <Col xs="12" md="5">
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
                      placeholder="Type New Section Name"
                      value={this.state.section}
                      onChange={this.onChangeSection}
                    />
                  </InputGroup>
                </Col>
                <Col xs="12" md="5">
                  <Input
                    type="text"
                    placeholder="Type Label"
                    value={this.state.label}
                    onChange={this.onChangeLabel}
                  />
                </Col>
                <Col xs="12" md="2">
                  <Button color="primary">
                    <span className="fa fa-plus" /> Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SectionDetailView;
