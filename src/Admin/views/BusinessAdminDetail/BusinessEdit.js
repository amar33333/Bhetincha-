import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";

import {
  onCompanyTypeList,
  onPaymentMethodsList,
  onCategoryEachList,
  onCategoryList,
  onIndustryList,
  onBusinessEachList,
  onIndustryEachList,
  onUnmountSubCategories,
  onCountryList,
  onAddressTreeList,
  onRemoveCategoryData,
  onBusinessEdit,
  onUnmountIndustryData,
  onUnmountCategoryData,
  onBusinessVerify,
  ToogleEDIT
} from "../../actions";

import SubBusinessDetails from "./SubBusinessDetails";
import SubBusinessAbout from "./SubBusinessAbout";
import SubBusinessLogo from "./SubBusinessLogo";
import SubBusinessCoverImage from "./SubBusinessCoverImage";
import SubBusinessPrimaryAddress from "./SubBusinessPrimaryAddress";
import SubBusinessBranchWrapper from "./SubBusinessBranchWrapper";
import SubBusinessWorkingHour from "./SubBusinessWorkingHour";

class BusinessEdit extends Component {
  static countryRepeat = true;
  static stateRepeat = true;
  static districtRepeat = true;
  static cityRepeat = true;

  state = {
    businessAdminDetailCollapse: false,
    businessAboutCollapse: true,
    businessBranchWrapperCollapse: true,
    businessCoverImageCollapse: true,
    businessLogoCollapse: true,
    businessPrimaryAddressCollapse: true,
    businessWorkingHourCollapse: true
  };

  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentDidMount() {
    this.props.ToogleEDIT(true);

    this.props.onCompanyTypeList({ access_token: this.access_token });
    this.props.onPaymentMethodsList({ access_token: this.access_token });
    this.props.onIndustryList({ access_token: this.access_token });
    this.props.onCountryList({ access_token: this.access_token });

    // this.props.onCategoryList({ access_token: this.access_token });
    this.props.onBusinessEachList({
      username: this.props.match.params.businessSlug,
      access_token: this.access_token
    });
  }

  onEditFormSubmit = event => {
    event.preventDefault();

    console.log("onformEDIT");
    this.propsData = {
      ...this.subBusinessAdminDetailRef.getState(),
      ...this.subBusinessAboutRef.getState(),
      ...this.subBusinessBranchWrapperRef.getState(),
      ...this.subBusinessCoverImageRef.getState(),
      ...this.subBusinessLogoRef.getState(),
      ...this.subBusinessPrimaryAddressRef.getState(),
      ...this.subBusinessWorkingHourRef.getState()
    };

    console.log("this.propsdttaa: ", this.propsData);

    this.props.onBusinessEdit({
      id: this.props.businessData.id,
      data: this.propsData,
      access_token: this.access_token,
      EDIT: this.props.EDIT
    });
  };

  toggleCollapse = key => {
    const updatedCollapseState = {};
    [
      "businessAboutCollapse",
      "businessPrimaryAddressCollapse",
      "businessLogoCollapse",
      "businessCoverImageCollapse",
      "businessBranchWrapperCollapse",
      "businessAdminDetailCollapse",
      "businessWorkingHourCollapse"
    ].forEach(collapse => {
      if (collapse === key) {
        updatedCollapseState[key] = !this.state[key];
      } else {
        updatedCollapseState[collapse] = true;
      }
    });
    this.setState(updatedCollapseState);
  };

  onInitialPropsReceived = () => this.props.ToogleEDIT(!this.props.EDIT);

  render() {
    const data = this.props.businessData;
    console.log("new props: ", this.props);

    let businessData = null;
    let about = null;
    let logo = null;
    let cover_photo = null;
    let address = null;
    let branchAddress = null;
    let alwaysOpen = false;
    let workingHour = [];

    if (data) {
      businessData = {
        business_name: data.business_name,
        business_email: data.business_email,
        payment_method: data.paymentMethod,
        industry: data.industry,
        categories: data.categories,
        sub_categories: data.sub_categories
      };

      about = data.about;
      logo = data.logo;
      cover_photo = data.cover_photo;
      address = data.address;
      branchAddress = data.branchAddress;
      alwaysOpen = data.alwaysOpen;
      workingHour = data.workingHour;
    }

    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Edit Business</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onEditFormSubmit}>
                <SubBusinessDetails
                  collapsed={this.state.businessAdminDetailCollapse}
                  toggleCollapse={this.toggleCollapse.bind(
                    this,
                    "businessAdminDetailCollapse"
                  )}
                  ref={ref => (this.subBusinessAdminDetailRef = ref)}
                  businessData={businessData}
                  payment_methods={this.props.paymentMethods}
                  industries={this.props.industries}
                  onIndustryEachList={this.props.onIndustryEachList}
                  onCategoryEachList={this.props.onCategoryEachList}
                  onUnmountSubCategories={this.props.onUnmountSubCategories}
                  onRemoveCategoryData={this.props.onRemoveCategoryData}
                  cookies={this.props.cookies}
                  industryData={this.props.industryData}
                  categoryData={this.props.categoryData}
                  onUnmountIndustryData={this.props.onUnmountIndustryData}
                  onUnmountCategoryData={this.props.onUnmountCategoryData}
                  /* {...this.props.general_setup} */
                  businessGet={this.props.businessGet}
                  onInitialPropsReceived={this.onInitialPropsReceived}
                  EDIT={this.props.EDIT}
                />
                <SubBusinessPrimaryAddress
                  collapsed={this.state.businessPrimaryAddressCollapse}
                  toggleCollapse={this.toggleCollapse.bind(
                    this,
                    "businessPrimaryAddressCollapse"
                  )}
                  ref={ref => (this.subBusinessPrimaryAddressRef = ref)}
                  cookies={this.props.cookies}
                  address={address}
                  {...this.props.general_setup}
                  onAddressTreeList={this.props.onAddressTreeList}
                  businessGet={this.props.businessGet}
                  onInitialPropsReceived={this.onInitialPropsReceived}
                  EDIT={this.props.EDIT}
                />
                <SubBusinessBranchWrapper
                  collapsed={this.state.businessBranchWrapperCollapse}
                  toggleCollapse={this.toggleCollapse.bind(
                    this,
                    "businessBranchWrapperCollapse"
                  )}
                  ref={ref => (this.subBusinessBranchWrapperRef = ref)}
                  cookies={this.props.cookies}
                  branchAddress={branchAddress}
                  {...this.props.general_setup}
                  onAddressTreeList={this.props.onAddressTreeList}
                  businessGet={this.props.businessGet}
                  onInitialPropsReceived={this.onInitialPropsReceived}
                  EDIT={this.props.EDIT}
                />
                <SubBusinessAbout
                  collapsed={this.state.businessAboutCollapse}
                  toggleCollapse={this.toggleCollapse.bind(
                    this,
                    "businessAboutCollapse"
                  )}
                  ref={ref => (this.subBusinessAboutRef = ref)}
                  about={about}
                  company_types={this.props.companyTypes}
                  businessGet={this.props.businessGet}
                  onInitialPropsReceived={this.onInitialPropsReceived}
                  EDIT={this.props.EDIT}
                />
                <SubBusinessLogo
                  collapsed={this.state.businessLogoCollapse}
                  toggleCollapse={this.toggleCollapse.bind(
                    this,
                    "businessLogoCollapse"
                  )}
                  ref={ref => (this.subBusinessLogoRef = ref)}
                  imagePath={logo}
                  businessGet={this.props.businessGet}
                  onInitialPropsReceived={this.onInitialPropsReceived}
                  EDIT={this.props.EDIT}
                />
                <SubBusinessCoverImage
                  collapsed={this.state.businessCoverImageCollapse}
                  toggleCollapse={this.toggleCollapse.bind(
                    this,
                    "businessCoverImageCollapse"
                  )}
                  ref={ref => (this.subBusinessCoverImageRef = ref)}
                  imagePath={cover_photo}
                  businessGet={this.props.businessGet}
                  onInitialPropsReceived={this.onInitialPropsReceived}
                  EDIT={this.props.EDIT}
                />
                <SubBusinessWorkingHour
                  collapsed={this.state.businessWorkingHourCollapse}
                  ref={ref => (this.subBusinessWorkingHourRef = ref)}
                  toggleCollapse={this.toggleCollapse.bind(
                    this,
                    "businessWorkingHourCollapse"
                  )}
                  workingHour={workingHour}
                  alwaysOpen={alwaysOpen}
                  businessGet={this.props.businessGet}
                  onInitialPropsReceived={this.onInitialPropsReceived}
                  EDIT={this.props.EDIT}
                />
                <Row>
                  <Col xs="12">
                    <Button
                      color="primary"
                      size="lg"
                      style={{ marginRight: 20 }}
                    >
                      EDIT
                    </Button>

                    <Button
                      color="success"
                      size="lg"
                      onClick={() => {
                        console.log("verify button clicked: ", this.props);
                        this.props.onBusinessVerify({
                          id: this.props.businessData.id,
                          body: {
                            verified: true
                          }
                        });
                      }}
                    >
                      VERIFY
                    </Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: { business_reducer, industries, categories, general_setup },
    auth
  }) => ({
    companyTypes: business_reducer.company_types,
    paymentMethods: business_reducer.payment_methods,
    businessData: business_reducer.businessData,
    EDIT: business_reducer.EDIT,
    editBusinessSuccess: business_reducer.editBusinessSuccess,
    businessGet: business_reducer.businessGet,
    categoryData: categories.categoryData,
    industries: industries.industries,
    industryData: industries.industryData,
    ...auth,
    general_setup
  }),
  {
    onCompanyTypeList,
    onPaymentMethodsList,
    onIndustryList,
    onCategoryEachList,
    onCategoryList,
    onBusinessEachList,
    onIndustryEachList,
    onUnmountSubCategories,
    onCountryList,
    onAddressTreeList,
    onRemoveCategoryData,
    onBusinessEdit,
    onUnmountIndustryData,
    onUnmountCategoryData,
    onBusinessVerify,
    ToogleEDIT
  }
)(BusinessEdit);
