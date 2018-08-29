import React, { Component } from "react";
import { connect } from "react-redux";

import { SectionEntityDetail } from "./components";

import { onExsectionSectionEachList } from "../../actions";

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
              sectionEntityDetailBiz={this.props.sectionEntityDetailBiz}
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
    onExsectionSectionEachList
  }
)(SectionEntityView);
