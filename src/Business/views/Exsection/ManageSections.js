import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { SideTreeView } from "./components";
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

  componentDidUpdate() {
    console.log("this props", this.props);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="3">
              <SideTreeView
                sectionsAdmin={this.props.sectionsAdmin}
                activeSectionAdminId={this.props.activeSectionAdminId}
                onChangeActiveSection={this.props.onChangeActiveSectionBusiness}
                isOpen={this.props.isOpenSections}
                resetState={this.props.resetState}
              />
              <br />
              <br />
              {this.props.activeChildrenAdmin !== null && (
                <SectionListAdmin
                  rootSectionAdmin={this.props.rootSectionAdmin}
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
        rootSectionAdmin,
        topSectionAdminId
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
    rootSectionAdmin,
    topSectionAdminId
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
