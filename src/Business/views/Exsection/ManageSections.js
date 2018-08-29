import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { SideSectionsView } from "./components";
import { RecordAddNew } from "./components";

import { SectionEntityList } from "./components";
import { SectionListAdmin } from "./components";

import {
  onSectionsListExsection,
  onChangeActiveSectionBusiness,
  onChangeActiveSectionBusinessByClick,
  onCreateSectionBusiness,
  resetState,
  onSectionUpdateBusinessExsection
} from "../../actions";

class ManageSections extends Component {
  componentDidMount() {
    this.props.onSectionsListExsection();
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.match.params.sectionAdminId !==
  //     prevProps.match.params.sectionAdminId
  //   ) {
  //     if (!this.props.match.params.sectionAdminId) {
  //       this.props.onSectionsListExsection();
  //     } else {
  //       this.props.onChangeActiveCategoryEcommerce(
  //         this.props.match.params.categoryId,
  //         prevProps.match.params.categoryId,
  //         this.routeToManageProducts
  //       );
  //     }
  //   }
  // }

  render() {
    //console.log(this.props);
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="3">
              <SideSectionsView
                sectionsAdmin={this.props.sectionsAdmin}
                resetState={this.props.resetState}
                //onChangeActiveSection={this.props.onChangeActiveSectionBusiness}
                onChangeActiveSection={(uid, children, topSectionAdmin) => {
                  this.props.history.push(
                    `/${
                      this.props.match.params.businessName
                    }/dashboard/section/manage-sections/${uid}`
                  );
                  this.props.onChangeActiveSectionBusiness(
                    uid,
                    children,
                    topSectionAdmin
                  );
                }}
                // onChangeActiveSection={uid => {
                //   if (this.props.match.params.sectionAdminId !== uid) {
                //     this.props.history.push(
                //       `/${
                //         this.props.match.params.businessName
                //       }/dashboard/section/manage-sections/${uid}`
                //     );
                //   } else {
                //     this.props.onChangeActiveSectionBusiness(
                //       uid,
                //       this.props.match.params.sectionAdminId,
                //       this.routeToManageSections,
                //       true
                //     );
                //   }
                // }}
                activeSectionAdminId={this.props.activeSectionAdminId}
                rootNodeAdminId={this.props.rootNodeAdminId}
              />
              {this.props.activeChildrenAdmin !== null && (
                <SectionListAdmin
                  topSectionAdmin={this.props.topSectionAdmin}
                  activeChildrenAdmin={this.props.activeChildrenAdmin}
                  onChangeActiveSectionByClick={
                    this.props.onChangeActiveSectionBusinessByClick
                  }
                />
              )}
            </Col>
            <Col xs="12" md="9">
              {this.props.selectedSectionDetailBiz &&
                this.props.selectedSectionDetailBiz.sections && (
                  <SectionEntityList
                    sections={this.props.selectedSectionDetailBiz.sections}
                    selectedSectionDetailAdmin={
                      this.props.selectedSectionDetailAdmin
                    }
                    URL={`/${
                      this.props.match.params.businessName
                    }/dashboard/exsection/manage-sections`}
                    loading={this.props.loading}
                  />
                )}
              {this.props.attributes &&
                this.props.attributes.attributes &&
                this.props.attributes.attributes.length !== 0 && (
                  <RecordAddNew
                    activeSectionAdminId={this.props.activeSectionAdminId}
                    activeChildrenAdmin={this.props.activeChildrenAdmin}
                    selectedSectionDetailAdmin={
                      this.props.selectedSectionDetailAdmin
                    }
                    selectedSectionDetailBiz={
                      this.props.selectedSectionDetailBiz
                    }
                    sectionsAdmin={this.props.sectionsAdmin}
                    onChangeActiveSectionByButton={
                      this.props.onChangeActiveSectionBusiness
                    }
                    attributes={this.props.attributes.attributes}
                    onSubmit={this.props.onCreateSectionBusiness}
                    parentSectionBiz={this.props.parentSectionBiz}
                    topSectionAdmin={this.props.topSectionAdmin}
                    parentSectionBizFlag={this.props.parentSectionBizFlag}
                    loading={this.props.loading}
                    activeParentAdminId={this.props.activeParentAdminId}
                  />
                )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    BusinessContainer: {
      exsection: {
        sectionsAdmin,
        activeSectionAdminId,
        activeChildrenAdmin,
        activeParentAdminId,
        isOpenSections,
        selectedSectionDetailAdmin,
        selectedSectionDetailBiz,
        attributes,
        parentSectionBiz,
        topSectionAdmin,
        rootNodeAdminId,
        parentSectionBizFlag,
        loading
      }
    }
  }) => ({
    sectionsAdmin,
    activeSectionAdminId,
    activeChildrenAdmin,
    activeParentAdminId,
    isOpenSections,
    selectedSectionDetailAdmin,
    selectedSectionDetailBiz,
    attributes,
    parentSectionBiz,
    topSectionAdmin,
    rootNodeAdminId,
    parentSectionBizFlag,
    loading
  }),
  {
    onSectionsListExsection,
    onChangeActiveSectionBusiness,
    onCreateSectionBusiness,
    resetState,
    onSectionUpdateBusinessExsection,
    onChangeActiveSectionBusinessByClick
  }
)(ManageSections);
