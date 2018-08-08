import React, { Component } from "react";
import { connect } from "react-redux";
import {
  OnCoreMemberAddEdit,
  OnCoreMemberGet,
  OnCoreMemberUpdate,
  OnCoreMemberDel,
  OnMemberAdd,
  OnMemberDel,
  OnMemberedit,
  onAddSocialLink,
  OnSocialLinkDel,
  onUpdateSocialLink
} from "../../actions";
import CoreMemberAddEdit from "./components/CoreMemberAddEdit";
class ManageCoreMember extends Component {
  componentDidMount() {
    this.props.OnCoreMemberGet();
  }
  render() {
    console.log("my data to props is=" + this.props.coremember);

    return (
      <div>
        <CoreMemberAddEdit
          corememberexist={this.props.coremember.corememberexist}
          onSubmit={this.props.OnCoreMemberAddEdit}
          onDelete={this.props.OnCoreMemberDel}
          onUpdate={this.props.OnCoreMemberUpdate}
          name={this.props.coremember.name}
          onAddmember={this.props.OnMemberAdd}
          members={this.props.coremember.members}
          deleteMember={this.props.OnMemberDel}
          updatemember={this.props.OnMemberedit}
          AddSocialLink={this.props.onAddSocialLink}
          DelSocialLink={this.props.OnSocialLinkDel}
          updatesocialLink={this.props.onUpdateSocialLink}
        />
      </div>
    );
  }
}

export default connect(
  ({ BusinessContainer: { coremember }, auth }) => ({
    coremember,
    ...auth
  }),
  {
    OnCoreMemberGet,
    OnCoreMemberAddEdit,
    OnCoreMemberUpdate,
    OnCoreMemberDel,
    OnMemberAdd,
    OnMemberDel,
    OnMemberedit,
    onAddSocialLink,
    OnSocialLinkDel,
    onUpdateSocialLink
  }
)(ManageCoreMember);
