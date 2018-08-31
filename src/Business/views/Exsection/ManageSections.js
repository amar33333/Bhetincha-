import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { SideSectionsView } from "./components";
import { RecordAddNew } from "./components";

import { SectionEntityList } from "./components";
import { SectionListAdmin } from "./components";
import { ManageAvailableBusinessSection } from "./components";

import {
  onSectionsListExsection,
  onChangeActiveSectionBusiness,
  onChangeActiveSectionBusinessByClick,
  onCreateSectionBusiness,
  resetState,
  onSectionUpdateBusinessExsection,
  onBusinessCatDetailsList,
  onRemoveExsectionSectionEntity
} from "../../actions";

class ManageSections extends Component {
  componentDidMount() {
    this.props.onSectionsListExsection();
    this.props.onBusinessCatDetailsList({
      id: this.props.cookies.user_data.business_id
    });
  }

  render() {
    let button;
    if (JSON.stringify(this.props.businessSection).length < 1) {
      button = <ManageAvailableBusinessSection />;
    } else {
      button = (
        <Row>
          <Col xs="12" md="3">
            <SideSectionsView
              sectionsAdmin={this.props.sectionsAdmin}
              resetState={this.props.resetState}
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
              activeSectionAdminId={this.props.activeSectionAdminId}
              rootNodeAdminId={this.props.rootNodeAdminId}
            />
            <br />
            <br />
            {this.props.activeChildrenAdmin !== null && (
              <SectionListAdmin
                topSectionAdmin={this.props.topSectionAdmin}
                activeChildrenAdmin={this.props.activeChildrenAdmin}
                onChangeActiveSectionByClick={
                  this.props.onChangeActiveSectionBusinessByClick
                }
                activeSectionAdminId={this.props.activeSectionAdminId}
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
                  onRemoveExsectionSectionEntity={
                    this.props.onRemoveExsectionSectionEntity
                  }
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
                  selectedSectionDetailBiz={this.props.selectedSectionDetailBiz}
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
                  activeParentAdmin={this.props.activeParentAdmin}
                />
              )}
          </Col>
        </Row>
      );
    }

    return (
      <div className="animated fadeIn">
        <Container fluid>{button}</Container>
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
        activeParentAdmin,
        isOpenSections,
        selectedSectionDetailAdmin,
        selectedSectionDetailBiz,
        attributes,
        parentSectionBiz,
        topSectionAdmin,
        rootNodeAdminId,
        parentSectionBizFlag,
        loading,
        businessSection
      }
    },
    auth: { cookies }
  }) => ({
    sectionsAdmin,
    activeSectionAdminId,
    activeChildrenAdmin,
    activeParentAdminId,
    activeParentAdmin,
    isOpenSections,
    selectedSectionDetailAdmin,
    selectedSectionDetailBiz,
    attributes,
    parentSectionBiz,
    topSectionAdmin,
    rootNodeAdminId,
    parentSectionBizFlag,
    loading,
    cookies,
    businessSection
  }),
  {
    onSectionsListExsection,
    onChangeActiveSectionBusiness,
    onCreateSectionBusiness,
    resetState,
    onSectionUpdateBusinessExsection,
    onChangeActiveSectionBusinessByClick,
    onBusinessCatDetailsList,
    onRemoveExsectionSectionEntity
  }
)(ManageSections);
