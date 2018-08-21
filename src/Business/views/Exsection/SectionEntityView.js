import React, { Component } from "react";
import { connect } from "react-redux";

import { SectionEntityDetail } from "./components";

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
    const { sectionEntityDetailBiz } = this.props;

    return (
      <div>
        {console.log("propppp", this.props)}
        {sectionEntityDetailBiz &&
          this.props.attributes &&
          this.props.attributes.attributes && (
            <SectionEntityDetail
              // editURL={`/${
              //   this.props.match.params.businessName
              // }/dashboard/exsection/manage-sections/${
              //   this.props.match.params.sectionEntityId
              // }/edit`}
              // onRemoveEcommerceProduct={this.props.onRemoveEcommerceProduct}
              sectionEntityDetailBiz={this.props.sectionEntityDetailBiz}
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
      exsection: { sectionEntityDetailBiz, attributes }
    }
  }) => ({ sectionEntityDetailBiz, attributes }),
  {
    //onEcommerceProductEachList,
    onExsectionSectionEachList
    // onRemoveEcommerceProduct
    //onRemoveExsectionSection
  }
)(SectionEntityView);
