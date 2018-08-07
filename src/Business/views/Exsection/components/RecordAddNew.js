import React, { Component } from "react";
import RecordAddEdit from "./RecordAddEdit";

class RecordAddNew extends Component {
  componentDidMount() {
    // console.log("record add new lifecycle");
    //console.log(this.props);
  }
  render() {
    return (
      <div>
        <RecordAddEdit
          activeSection={this.props.activeSection}
          onChangeActiveSectionByButton={
            this.props.onChangeActiveSectionByButton
          }
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
