import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";

import {
  SideTreeView,
  BreadcrumbNav,
  SectionDetailView,
  PropertyItemAddNew,
  PropertyList
} from "./components";

import { PopoverDelete } from "../../../Common/components";

import {
  onSectionsListExsection,
  onSectionSubmitExsection,
  onChangeActiveSectionExSection,
  onAttributesListExsection,
  onPropertySubmitExsection
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
                sections={this.props.sections} //categories
                activeSection={this.props.activeSection} //activeCategory
                onChangeActiveSection={
                  this.props.onChangeActiveSectionExSection
                } //onChangeActiveCategory
                isOpen={this.props.isOpenSections} //isOpenCategories
              />
            </Col>
            <Col xs="12" md="9">
              {this.props.selectedSectionDetail && (
                <div>
                  <BreadcrumbNav
                    breadCrumbs={this.props.selectedSectionDetail.breadCrumbs}
                    onChangeActiveCategory={
                      this.props.onChangeActiveSectionExSection
                    }
                  />
                  {!this.props.selectedSectionDetail.hasSec && (
                    <SectionDetailView
                      name={this.props.selectedSectionDetail.name}
                      onSectionSubmit={this.props.onSectionSubmitExsection}
                    />
                  )}

                  <PropertyItemAddNew
                    loading={this.props.propertyLoading} //
                    error={this.props.propertyError} //
                    activeSection={this.props.activeSection} //
                    attributes={this.props.attributes}
                    onPropertySubmit={this.props.onPropertySubmitExsection} //
                  />
                  <PropertyList
                  //category={this.props.selectedSectionDetail}
                  //onPropertyRemove={this.props.onPropertyRemoveExsection}
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
    onChangeActiveSectionExSection,
    onPropertySubmitExsection
  }
)(ManageSections);
