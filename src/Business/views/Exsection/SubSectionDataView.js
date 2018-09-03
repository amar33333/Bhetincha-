import React, { Component } from "react";
import { connect } from "react-redux";

import { SubSectionDataDetail } from "./components";

import { onExsectionSectionEachList } from "../../actions";

class SubSectionDataView extends Component {
  componentDidMount() {
    this.props.onExsectionSectionEachList({
      uid: this.props.match.params.subSectionDataId
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
    const { subSectionDataDetailBiz } = this.props;
    return (
      <div>
        {subSectionDataDetailBiz &&
          this.props.attributes &&
          this.props.attributes.attributes && (
            <SubSectionDataDetail
              subSectionDataDetailBiz={this.props.subSectionDataDetailBiz}
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
      exsection: { subSectionDataDetailBiz, attributes }
    }
  }) => ({ subSectionDataDetailBiz, attributes }),
  {
    onExsectionSectionEachList
  }
)(SubSectionDataView);
