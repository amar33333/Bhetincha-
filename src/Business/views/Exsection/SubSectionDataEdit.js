import React, { Component } from "react";
import { connect } from "react-redux";
import { SubSectionDataEditDetail } from "./components";

import {
  onExsectionSectionEachList,
  onUpdateExsectionSubSectionData
} from "../../actions";

class SubSectionDataEdit extends Component {
  componentDidMount() {
    this.props.onExsectionSectionEachList({
      uid: this.props.match.params.subSectionDataId
    });
  }

  render() {
    if (
      !(
        this.props.attributes &&
        this.props.attributes.attributes &&
        this.props.subSectionDataDetailBiz
      )
    ) {
      return <div>Fetching sub-section information</div>;
    }
    return (
      <SubSectionDataEditDetail
        attributes={this.props.attributes.attributes}
        add={false}
        defaultValue={this.props.subSectionDataDetailBiz.properties}
        onSubmit={this.props.onUpdateExsectionSubSectionData}
        routeToView={() =>
          this.props.history.push(
            `/${
              this.props.match.params.businessName
            }/dashboard/section/manage-sections/${
              this.props.match.params.subSectionDataId
            }`
          )
        }
      />
    );
  }
}

export default connect(
  ({
    BusinessContainer: {
      exsection: { attributes, subSectionDataDetailBiz }
    }
  }) => ({
    attributes,
    subSectionDataDetailBiz
  }),
  {
    onExsectionSectionEachList,
    onUpdateExsectionSubSectionData
  }
)(SubSectionDataEdit);
