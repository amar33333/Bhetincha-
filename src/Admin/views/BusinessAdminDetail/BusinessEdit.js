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
  onBusinessEdit
} from "../../actions";

import SubBusinessDetails from "./SubBusinessDetails";
import SubBusinessAbout from "./SubBusinessAbout";
import SubBusinessLogo from "./SubBusinessLogo";
import SubBusinessCoverImage from "./SubBusinessCoverImage";
import SubBusinessPrimaryAddress from "./SubBusinessPrimaryAddress";
import SubBusinessBranchWrapper from "./SubBusinessBranchWrapper";

class BusinessEdit extends Component {
  static countryRepeat = true;
  static stateRepeat = true;
  static districtRepeat = true;
  static cityRepeat = true;

  state = {};

  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentDidMount() {
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

  // static getDerivedStateFromProps = nextProps => {
  //   let countries = nextProps.general_setup.countries;
  //   const access_token = nextProps.cookies
  //     ? nextProps.cookies.token_data.access_token
  //     : null;

  //   if (
  //     countries &&
  //     countries.length &&
  //     nextProps.businessData &&
  //     nextProps.businessData.address
  //   ) {
  //     // console.log(
  //     //   "repeating...: ",
  //     //   countries,
  //     //   " ",
  //     //   BusinessEdit.stateRepeat,
  //     //   " ",
  //     //   countries.states,
  //     //   " "
  //     // );
  //     if (BusinessEdit.countryRepeat) {
  //       console.log("country repeat: ", BusinessEdit.countryRepeat);
  //       nextProps.onAddressTreeList({
  //         id: nextProps.businessData.address.country.id,
  //         access_token: access_token,
  //         ADDRESS_KEY: "primary_country"
  //       });
  //       BusinessEdit.countryRepeat = false;
  //     }
  //     if (
  //       BusinessEdit.stateRepeat &&
  //       countries.states &&
  //       countries.states.length
  //     ) {
  //       console.log("stae repeat: ", BusinessEdit.stateRepeat);

  //       nextProps.onAddressTreeList({
  //         id: nextProps.businessData.address.state.id,
  //         access_token: access_token,
  //         ADDRESS_KEY: "primary_state"
  //       });
  //       BusinessEdit.stateRepeat = false;
  //     }
  //     if (
  //       BusinessEdit.districtRepeat &&
  //       countries.states &&
  //       countries.states.length &&
  //       countries.states.districts &&
  //       countries.states.districts.length
  //     ) {
  //       console.log("district repeat: ", BusinessEdit.districtRepeat);

  //       nextProps.onAddressTreeList({
  //         id: nextProps.businessData.address.district.id,
  //         access_token: access_token,
  //         ADDRESS_KEY: "primary_district"
  //       });
  //       BusinessEdit.districtRepeat = false;
  //     }
  //     if (
  //       BusinessEdit.cityRepeat &&
  //       countries.states &&
  //       countries.states.length &&
  //       countries.states.districts &&
  //       countries.states.districts.length &&
  //       countries.states.districts.cities &&
  //       countries.states.districts.cities.length
  //     ) {
  //       console.log("city repeat: ", BusinessEdit.cityRepeat);

  //       nextProps.onAddressTreeList({
  //         id: nextProps.businessData.address.city.id,
  //         access_token: access_token,
  //         ADDRESS_KEY: "primary_city"
  //       });
  //       BusinessEdit.cityRepeat = false;
  //     }
  //   }

  //   return null;
  // };

  onEditFormSubmit = event => {
    event.preventDefault();

    console.log("onformEDIT");
    this.propsData = {
      ...this.subBusinessAdminDetailRef.getState(),
      ...this.subBusinessAboutRef.getState(),
      ...this.subBusinessBranchWrapperRef.getState(),
      ...this.subBusinessCoverImageRef.getState(),
      ...this.subBusinessLogoRef.getState(),
      ...this.subBusinessPrimaryAddressRef.getState()
      // ...this.subBusinessWorkingHourRef.getState()
    };

    console.log("this.propsdttaa: ", this.propsData);

    this.props.onBusinessEdit({
      id: this.props.businessData.id,
      data: this.propsData,
      access_token: this.access_token
    });
  };

  render() {
    const data = this.props.businessData;
    console.log("new props: ", this.props);

    let businessData = null;
    let about = null;
    let logo = null;
    let cover_photo = null;
    let address = null;
    let branchAddress = null;

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
    }

    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Edit Your Business</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onEditFormSubmit}>
                <SubBusinessDetails
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
                  /* {...this.props.general_setup} */
                  edit
                />
                <SubBusinessPrimaryAddress
                  ref={ref => (this.subBusinessPrimaryAddressRef = ref)}
                  cookies={this.props.cookies}
                  address={address}
                  {...this.props.general_setup}
                  onAddressTreeList={this.props.onAddressTreeList}
                  edit
                />
                <SubBusinessBranchWrapper
                  ref={ref => (this.subBusinessBranchWrapperRef = ref)}
                  cookies={this.props.cookies}
                  branchAddress={branchAddress}
                  {...this.props.general_setup}
                  onAddressTreeList={this.props.onAddressTreeList}
                  edit
                />
                <SubBusinessAbout
                  ref={ref => (this.subBusinessAboutRef = ref)}
                  about={about}
                  company_types={this.props.companyTypes}
                  edit
                />
                <SubBusinessLogo
                  ref={ref => (this.subBusinessLogoRef = ref)}
                  imagePath={logo}
                  edit
                />
                <SubBusinessCoverImage
                  ref={ref => (this.subBusinessCoverImageRef = ref)}
                  imagePath={cover_photo}
                  edit
                />
                <Row>
                  <Col xs="12">
                    <Button color="primary" size="lg">
                      EDIT
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
    AdminContainer: { business_reducer, industries, general_setup },
    auth
  }) => ({
    companyTypes: business_reducer.company_types,
    paymentMethods: business_reducer.payment_methods,
    businessData: business_reducer.businessData,
    ...industries,
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
    onBusinessEdit
  }
)(BusinessEdit);
