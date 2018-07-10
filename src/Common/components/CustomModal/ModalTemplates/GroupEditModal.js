import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup
} from "reactstrap";

class GroupEditModal extends Component {
  state = { group: "" };

  componentDidMount() {
    this.setState({
      group: this.props.data ? this.props.data : ""
    });
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.group,
        name: event.target.value.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  };

  onFormEdit = event => {
    event.preventDefault();
    const { group } = this.state;
    this.props.onGroupEdit({ group });
  };

  render() {
    return (
      <Form onSubmit={this.onFormEdit} inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-group" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              autoFocus
              required
              disabled={this.props.loading}
              type="text"
              placeholder="Type Group Name"
              value={this.state.group ? this.state.group.name : ""}
              onChange={this.onChange.bind(this, "group")}
            />
          </InputGroup>
        </FormGroup>
        <Button color="primary">
          <span className="fa fa-check" /> Save
        </Button>
      </Form>
    );
  }
}

export default GroupEditModal;
