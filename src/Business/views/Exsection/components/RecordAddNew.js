import React, { Component } from "react";
import RecordAddEdit from "./RecordAddEdit";

class RecordAddNew extends Component {
  componentDidMount() {
    // console.log("record add new lifecycle");
    //console.log(this.props);
  }
  render() {
    //console.log("hitlee", this.props);
    return (
      <div>
        <RecordAddEdit
          activeSection={this.props.activeSection}
          activeChildren={this.props.activeChildren}
          //activeParentAdminId={this.props.activeParentAdminId}
          selectedSectionDetail={this.props.selectedSectionDetail}
          onChangeActiveSectionByButton={
            this.props.onChangeActiveSectionByButton
          }
          sections={this.props.sections}
          attributes={this.props.attributes}
          onAddChild={this.props.addSectionChild}
          onSubmit={this.props.onSubmit}
          parentSection={this.props.parentSection}
        />
      </div>
    );
  }
}

export default RecordAddNew;
