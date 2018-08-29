import React, { Component } from "react";
import RecordAddEdit from "./RecordAddEdit";

class RecordAddNew extends Component {
  render() {
    return (
      <div>
        <RecordAddEdit
          activeSectionAdminId={this.props.activeSectionAdminId}
          activeChildrenAdmin={this.props.activeChildrenAdmin}
          //activeParentAdminId={this.props.activeParentAdminId}
          selectedSectionDetailAdmin={this.props.selectedSectionDetailAdmin}
          selectedSectionDetailBiz={this.props.selectedSectionDetailBiz}
          onChangeActiveSectionByButton={
            this.props.onChangeActiveSectionByButton
          }
          sectionsAdmin={this.props.sectionsAdmin}
          attributes={this.props.attributes}
          onAddChild={this.props.addSectionChild}
          onSubmit={this.props.onSubmit}
          parentSectionBiz={this.props.parentSectionBiz}
          topSectionAdmin={this.props.topSectionAdmin}
          parentSectionBizFlag={this.props.parentSectionBizFlag}
          loading={this.props.loading}
          activeParentAdminId={this.props.activeParentAdminId}
        />
      </div>
    );
  }
}

export default RecordAddNew;
