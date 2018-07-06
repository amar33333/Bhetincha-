import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Col,
  Row,
  FormGroup
} from "reactstrap";

class SocialLinkEditModal extends Component {
  state = {
    name: "",
    className: ""
  };

  componentDidMount() {
    this.setState({
      name: this.props.data ? this.props.data.name : "",
      className: this.props.data ? this.props.data.className : ""
    });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: event.target.value
    });
  };

  onFormEdit = event => {
    event.preventDefault();

    const { name, className } = this.state;
    this.props.onSocialLinkEdit({
      id: this.props.data.id,
      body: { name, className }
    });
  };

  render() {
    return (
      <Form onSubmit={this.onFormEdit}>
        <Row>
          <Col xs="12" md="9">
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Social Link Name </InputGroupText>
                </InputGroupAddon>
                <Input
                  autoFocus
                  required
                  type="text"
                  placeholder="Eg. Facebook"
                  value={this.state.name}
                  onChange={this.onChange.bind(this, "name")}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Social Link Class-Name</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  required
                  placeholder="Eg. fa fa-facebook"
                  value={this.state.className}
                  onChange={this.onChange.bind(this, "className")}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs="12" md="3">
            <Button color="primary">
              <span className="fa fa-check" /> SAVE
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SocialLinkEditModal;
