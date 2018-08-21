import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";

import {
  SideTreeView,
  BreadcrumbNav,
  SectionDetailView,
  SectionEditView,
  PropertyItemAddNew,
  PropertyList
} from "./components";

import {
  onSectionsListExsection,
  onSectionSubmitExsection,
  onSectionUpdateExsection,
  onChangeActiveSectionExsection,
  onAttributesListExsection,
  onPropertySubmitExsection,
  onPropertyRemoveExsection,
  onPropertyUpdateExsection
} from "../../actions";

class ManageSections extends Component {
  componentDidMount() {
    this.props.onSectionsListExsection();
    this.props.onAttributesListExsection();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="3">
              <SideTreeView
                sections={this.props.sections}
                activeSection={this.props.activeSection}
                onChangeActiveSection={
                  this.props.onChangeActiveSectionExsection
                }
                isOpen={this.props.isOpenSections}
              />
            </Col>
            <Col xs="12" md="9">
              {this.props.selectedSectionDetail && (
                <div>
                  <BreadcrumbNav
                    breadCrumbs={this.props.selectedSectionDetail.breadCrumbs}
                    onChangeActiveCategory={
                      this.props.onChangeActiveSectionExsection
                    }
                  />
                  {/* Start here */}
                  {this.props.activeSection &&
                    this.props.sections &&
                    this.props.sections.uid !== this.props.activeSection && (
                      <div>
                        <SectionEditView
                          onSectionUpdate={this.props.onSectionUpdateExsection}
                          section={this.props.selectedSectionDetail}
                        />
                      </div>
                    )}

                  {/* End here */}
                  {this.props.selectedSectionDetail.hasSec && (
                    <SectionDetailView
                      name={this.props.selectedSectionDetail.name}
                      onSectionSubmit={this.props.onSectionSubmitExsection}
                    />
                  )}

                  <PropertyItemAddNew
                    loading={this.props.propertyLoading}
                    error={this.props.propertyError}
                    activeSection={this.props.activeSection}
                    attributes={this.props.attributes}
                    onPropertySubmit={this.props.onPropertySubmitExsection}
                  />

                  <PropertyList
                    section={this.props.selectedSectionDetail}
                    activeSection={this.props.activeSection}
                    onPropertyRemove={this.props.onPropertyRemoveExsection}
                    onPropertyUpdate={this.props.onPropertyUpdateExsection}
                  />
                </div>
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
    AdminContainer: {
      exsection: {
        sections,
        activeSection,
        isOpenSections,
        selectedSectionDetail,
        attributes,
        propertyLoading,
        propertyError
      }
    }
  }) => ({
    sections,
    activeSection,
    isOpenSections,
    selectedSectionDetail,
    attributes,
    propertyLoading,
    propertyError
  }),
  {
    onSectionsListExsection,
    onAttributesListExsection,
    onSectionSubmitExsection,
    onSectionUpdateExsection,
    onChangeActiveSectionExsection,
    onPropertySubmitExsection,
    onPropertyRemoveExsection,
    onPropertyUpdateExsection
  }
)(ManageSections);
