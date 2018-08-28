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
              sectionDetail={this.props.selectedSectionDetailBiz}
            />
          )}
      </div>
    );
  }
}

export default connect(
  ({
    BusinessContainer: {
      exsection: {
        sectionEntityDetailBiz,
        attributes,
        selectedSectionDetailBiz
      }
    }
  }) => ({ sectionEntityDetailBiz, attributes, selectedSectionDetailBiz }),
  {
    onExsectionSectionEachList,
    onRemoveExsectionSectionEntity
  }
)(SectionEntityView);
