import React, { Component } from "react";
import { connect } from "react-redux";
import { SectionEntityEditDetail } from "./components";

import {
  onExsectionSectionEachList,
  onUpdateExsectionSectionEntity
  //onUpdateEcommerceProduct
} from "../../actions";

class SectionEntityEdit extends Component {
  componentDidMount() {
    this.props.onExsectionSectionEachList({
      uid: this.props.match.params.sectionEntityId
    });
  }

  render() {
    if (
      !(
        this.props.attributes &&
        this.props.attributes.attributes &&
        this.props.sectionEntityDetailBiz
      )
    ) {
      return <div>Fetching section entity information</div>;
    }
    return (
      <SectionEntityEditDetail
        attributes={this.props.attributes.attributes}
        add={false}
        defaultValue={this.props.sectionEntityDetailBiz.properties}
        onSubmit={this.props.onUpdateExsectionSectionEntity}
        routeToView={() =>
          this.props.history.push(
            `/${
              this.props.match.params.businessName
            }/dashboard/section/manage-sections/${
              this.props.match.params.sectionEntityId
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
      exsection: { attributes, sectionEntityDetailBiz }
    }
  }) => ({
    attributes,
    sectionEntityDetailBiz
  }),
  {
    onExsectionSectionEachList,
    onUpdateExsectionSectionEntity
  }
)(SectionEntityEdit);
