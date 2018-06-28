import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

import CustomModal from "../../../../Common/components/CustomModal";
import GroupEditModal from "../../../../Common/components/CustomModal/ModalTemplates/GroupEditModal";

import GroupList from "./GroupList";
import {
  onGroupSubmit,
  onGroupsList,
  onGroupDelete,
  toggleGroupEditModal,
  onGroupEdit
} from "../../../actions";

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: ""
    };
  }

  componentDidMount() {
    this.props.onGroupsList();
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
        <br />
        <GroupList
          groups={this.props.groups}
          onGroupDelete={this.props.onGroupDelete}
          toggleGroupEditModal={this.props.toggleGroupEditModal}
        />
        <CustomModal
          title="Edit Group Data"
          isOpen={this.props.groupEditModal}
          toggle={this.props.toggleGroupEditModal}
          className={"modal-xs" + this.props.className}
        >
          <GroupEditModal
            data={this.props.groupEditData}
            onGroupEdit={this.props.onGroupEdit}
          />
        </CustomModal>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: {
      user_reducer: { groups, groupEditData, groupEditModal }
    }
  }) => ({ groups, groupEditData, groupEditModal }),
  {
    onGroupSubmit,
    onGroupsList,
    onGroupDelete,
    toggleGroupEditModal,
    onGroupEdit
  }
)(Groups);
