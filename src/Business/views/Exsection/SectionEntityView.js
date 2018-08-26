import React, { Component } from "react";
import { connect } from "react-redux";

import { SectionEntityDetail } from "./components";

import {
  onExsectionSectionEachList,
  onRemoveExsectionSectionEntity
} from "../../actions";

class SectionEntityView extends Component {
  constructor(props) {
    super(props);
    //console.log("Section Entity ID",this.props.match.params.sectionEntityId);
  }
  componentDidMount() {
    this.props.onExsectionSectionEachList({
      uid: this.props.match.params.sectionEntityId
    });
  }

  routeToManageSections = () => {
    this.props.history.replace(
      `/${
        this.props.match.params.businessName
      }/dashboard/section/manage-sections`
    );
  };

  render() {
    const { sectionEntityDetailBiz } = this.props;
    // console.log("Section Entity View: Attributes",this.props.attributes);
    // console.log("Section Entity View:  Attributes.Attributes",this.props.attributes.attributes);
    // console.log("Section Entity View:  Detail Biz",sectionEntityDetailBiz);
    return (
      <div>
        {sectionEntityDetailBiz &&
          this.props.attributes &&
          this.props.attributes.attributes && (
            <SectionEntityDetail
              editURL={`/${
                this.props.match.params.businessName
              }/dashboard/exsection/manage-sections/${
                this.props.match.params.sectionEntityId
              }/edit`}
              onRemoveExsectionSectionEntity={
                this.props.onRemoveExsectionSectionEntity
              }
              sectionEntityDetailBiz={this.props.sectionEntityDetailBiz}
              routeToManageSections={this.routeToManageSections}
              attributes={this.props.attributes.attributes}
            />
          )}
      </div>
    );
  }
}

export default connect(
  ({
    BusinessContainer: {
      exsection: { sectionEntityDetailBiz, attributes }
    }
  }) => ({ sectionEntityDetailBiz, attributes }),
  {
    onExsectionSectionEachList,
    onRemoveExsectionSectionEntity
  }
)(SectionEntityView);
