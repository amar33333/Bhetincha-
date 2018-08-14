import React, { Component } from "react";
import { connect } from "react-redux";

import { SectionEntityDetail } from "./components";

// import {
//   onEcommerceProductEachList,
//   onRemoveEcommerceProduct
// } from "../../actions";

import {
  onExsectionSectionEachList
  // onRemoveExsectionSection
} from "../../actions";

class SectionEntityView extends Component {
  componentDidMount() {
    this.props.onExsectionSectionEachList({
      uid: this.props.match.params.sectionEntityId
    });
  }

  routeToManageSections = () => {
    this.props.history.replace(
      `/${
        this.props.match.params.businessName
      }/dashboard/exsection/manage-sections`
    );
  };

  render() {
    // console.log("Props", this.props);
    const { sectionEntityDetail } = this.props;

    return (
      <div>
        {sectionEntityDetail &&
          this.props.attributes &&
          this.props.attributes.attributes && (
            <SectionEntityDetail
              // editURL={`/${
              //   this.props.match.params.businessName
              // }/dashboard/exsection/manage-sections/${
              //   this.props.match.params.sectionEntityId
              // }/edit`}
              // onRemoveEcommerceProduct={this.props.onRemoveEcommerceProduct}
              sectionEntityDetail={this.props.sectionEntityDetail}
              //routeToManageProducts={this.routeToManageProducts}
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
      exsection: { sectionEntityDetail, attributes }
    }
  }) => ({ sectionEntityDetail, attributes }),
  {
    //onEcommerceProductEachList,
    onExsectionSectionEachList
    // onRemoveEcommerceProduct
    //onRemoveExsectionSection
  }
)(SectionEntityView);
