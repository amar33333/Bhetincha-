import React, { Component } from "react";
import RecordAddEdit from "./RecordAddEdit";

class RecordAddNew extends Component {
  render() {
    return (
      <div>
        <RecordAddEdit {...this.props} />
      </div>
    );
  }
}

export default RecordAddNew;
