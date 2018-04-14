import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

import { onGroupSubmit } from "../../../actions";

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: ""
    };
  }

  onChange = (key, event) =>
    this.setState({ [key]: event.target.value.toUpperCase() });

  onFormSubmit = event => {
    event.preventDefault();

    const { group } = this.state;
    this.props.onGroupSubmit({ group });
    this.clearState();
  };

  clearState = () => this.setState({ group: "" });

  render() {
    return (
      <div className="animated fadeIn">
        <form onSubmit={this.onFormSubmit}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Group Name</InputGroupText>
            </InputGroupAddon>
            <Input
              innerRef={ref => (this.addButton = ref)}
              autoFocus
              type="text"
              value={this.state.group}
              onChange={this.onChange.bind(this, "group")}
            />
            <InputGroupAddon addonType="append">
              <Button type="submit" color="primary" value="Add Group">
                <i className="fa fa-plus" /> Add Group
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { user_reducer } }) => ({ user_reducer }),
  { onGroupSubmit }
)(Groups);
