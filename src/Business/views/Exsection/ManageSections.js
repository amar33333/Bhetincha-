import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { SideTreeView } from "./components";
import { RecordAddNew } from "./components";

import {
  onSectionsListExsection,
  onChangeActiveSectionBusiness,
  onCreateSectionBusiness
} from "../../actions";

class ManageSections extends Component {
  componentDidMount() {
    //console.log("check Did Mount", this.props);

    this.props.onSectionsListExsection();
  }

  componentDidUpdate() {
    //console.log("Com Did Upd", this.props);
    //console.log("check Did Update", this.props);
  }
  render() {
    //console.log("INITIAL RENDER", this.props);
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="3">
              <SideTreeView
                sections={this.props.sections}
                activeSection={this.props.activeSection}
                onChangeActiveSection={this.props.onChangeActiveSectionBusiness}
                isOpen={this.props.isOpenSections}
              />
            </Col>
            <Col xs="12" md="9">
              {this.props.attributes &&
                this.props.attributes.attributes &&
                this.props.attributes.attributes.length !== 0 && (
                  <RecordAddNew
                    activeSection={this.props.activeSection}
                    activeChildren={this.props.activeChildren}
                    // activeParentAdminId={this.props.activeParentAdminId}
                    selectedSectionDetail={this.props.selectedSectionDetail}
                    sections={this.props.sections}
                    onChangeActiveSectionByButton={
                      this.props.onChangeActiveSectionBusiness
                    }
                    attributes={this.props.attributes.attributes}
                    onSubmit={this.props.onCreateSectionBusiness}
                    parentSection={this.props.parentSection}
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
        sections,
        activeSection,
        activeChildren,
        activeParentAdminId,
        isOpenSections,
        selectedSectionDetail,
        attributes,
        parentSection
      }
    }
  }) => ({
    sections,
    activeSection,
    activeChildren,
    activeParentAdminId,
    isOpenSections,
    selectedSectionDetail,
    attributes,
    parentSection
  }),
  {
    onSectionsListExsection,
    onChangeActiveSectionBusiness,
    onCreateSectionBusiness
  }
)(ManageSections);
