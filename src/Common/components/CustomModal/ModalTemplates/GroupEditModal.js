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
import { ErrorHandling } from "../../../utils/Extras";

class GroupEditModal extends Component {
  state = { group: "" };

  componentDidMount() {
    this.setState({
      group: this.props.data ? this.props.data : ""
    });
  }

  componentWillUnmount() {
    this.props.resetUserGroupErrors();
  }

  onChange = (key, event) => {
    this.setState({
      [key]: {
        ...this.state.group,
        name: event.target.value.toUpperCase()
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
        <ErrorHandling
          error={
            this.props.userGroupEditErrors &&
            this.props.userGroupEditErrors.name
          }
        />
        <Button color="primary" disabled={this.props.loading}>
          <span className="fa fa-check" /> Save
        </Button>
      </Form>
    );
  }
}

export default GroupEditModal;
