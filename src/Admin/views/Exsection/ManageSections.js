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
  onSubSectionDeleteExsection,
  onChangeActiveSectionExsection,
  onAttributesListExsection,
  onPropertySubmitExsection,
  onPropertyRemoveExsection,
  onPropertyUpdateExsection,
  onPropertyUpdatePlaceholderExsection
} from "../../actions";

import { PopoverDelete } from "../../../Common/components";

class ManageSections extends Component {
  componentDidMount() {
    this.props.onSectionsListExsection();
    this.props.onAttributesListExsection();
  }

  render() {
    //console.log("this props ", this.props);

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
                        <PopoverDelete
                          onClick={() =>
                            this.props.onSubSectionDeleteExsection({
                              uid: this.props.selectedSectionDetail.uid
                            })
                          }
                        />
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
                    onPropertyUpdatePlaceholder={
                      this.props.onPropertyUpdatePlaceholderExsection
                    }
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
    onSubSectionDeleteExsection,
    onChangeActiveSectionExsection,
    onPropertySubmitExsection,
    onPropertyRemoveExsection,
    onPropertyUpdateExsection,
    onPropertyUpdatePlaceholderExsection
  }
)(ManageSections);
