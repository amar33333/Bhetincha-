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
  onBusinessCatDetailsList
} from "../../actions";

class ManageSections extends Component {
  componentDidMount() {
    this.props.onSectionsListExsection();
    this.props.onBusinessCatDetailsList({
      id: this.props.cookies.user_data.business_id
    });
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
    //console.log("Business Section Data", this.props.businessSection);
    //console.log("Business Section Data length", this.props.businessSection.length);

    //const sectionsToRender = this.props.businessSection.filter(x => x.name);
    //const numRows = sectionsToRender.length;
    //console.log("Count",numRows);
    //console.log("Is Array",Array.isArray(this.props.businessSection));
    //console.log("Array of",Array.of(Array.of(this.props.businessSection)));
    //console.log("Array from",(Array.from(this.props.businessSection)).length);
    //console.log("New",this.props.businessSection.toString());
    // var iterator1 = this.props.businessSection.entries();
    // console.log("New",iterator1);
    //let receivedArraySection = Array.of(this.props.businessSection);
    //console.log("Length",receivedArraySection[Array(0)].length);
    //console.log("Business Section Data1", JSON.parse(JSON.stringify(this.props.businessSection)));
    // storing our array as a string
    //localStorage.setItem("abc", JSON.stringify(this.props.businessSection));

    // retrieving our data and converting it back into an array
    //var retrievedData = localStorage.getItem("abc");
    //var abc1 = JSON.parse(retrievedData);
    //console.log("Converted",abc1);

    // const arrayToObject = (array, keyField) =>
    //   array.reduce((obj, item) => {
    //     obj[item[keyField]] = item
    //     return obj
    //   }, {});
    // const peopleObject = arrayToObject(this.props.businessSection, "id");
    // console.log("new array reduced",peopleObject);

    //console.log("Length",this.props.businessSection.length);
    //console.log("Length",Object.keys(this.props.businessSection).length);
    //let sectionArray = JSON.stringify(this.props.businessSection);
    //console.log("Business Section Data", JSON.stringify(this.props.businessSection));
    //console.log("Section Length", Object.keys(this.props.businessSection).length);
    //console.log("Section Length", sectionArray.length);
    //console.log("Section Length", this.props.businessSection.[0].length);
    // let mapped = this.props.businessSection.map(x => x.name);
    // console.log(mapped);
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
            <br />
            <br />
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
    onBusinessCatDetailsList
  }
)(ManageSections);
