import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { Row, Col, Button } from "reactstrap";

import {
  onBusinessCreate,
  onIndustryList,
  onIndustryEachList,
  onCategoryEachList,
  onUnmountSubCategories,
  onCountryList,
  onCountryEachList,
  onStateEachList,
  onDistrictEachList,
  onCityEachList,
  onUnmountArea,
  onUnmountCity,
  onUnmountDistrict,
  onPaymentMethodsList,
  onCompanyTypeList,
  onAddressTreeList,
  onRemoveCategoryData,
  onUnmountIndustryData,
  onUnmountCategoryData
} from "../../actions";

import SubBusinessDetails from "./SubBusinessDetails";
import SubBusinessPrimaryAddress from "./SubBusinessPrimaryAddress";
import SubBusinessLogo from "./SubBusinessLogo";
import SubBusinessCoverImage from "./SubBusinessCoverImage";
import SubBusinessAbout from "./SubBusinessAbout";
// import SubBusinessBranchWrapper from "./SubBusinessBranchWrapper";
import SubBusinessWorkingHour from "./SubBusinessWorkingHour";

import PermissionProvider from "../../../Common/utils/PermissionProvider";

class BusinessAdminDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessAdminDetailCollapse: false,
      businessAboutCollapse: true,
      businessBranchWrapperCollapse: true,
      businessCoverImageCollapse: true,
      businessLogoCollapse: true,
      businessPrimaryAddressCollapse: true,
      businessWorkingHourCollapse: true
    };

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.propsData = {};
  }

  componentWillMount() {
    this.props.onCompanyTypeList();
    this.props.onIndustryList({ access_token: this.access_token });
    this.props.onPaymentMethodsList();
    this.props.onCountryList({ access_token: this.access_token });
  }

  onFormSubmit = event => {
    event.preventDefault();

    this.propsData = {
      ...this.subBusinessAdminDetailRef.getState(),
      ...this.subBusinessAboutRef.getState(),
      // ...this.subBusinessBranchWrapperRef.getState(),
      ...this.subBusinessCoverImageRef.getState(),
      ...this.subBusinessLogoRef.getState(),
      ...this.subBusinessPrimaryAddressRef.getState(),
      ...this.subBusinessWorkingHourRef.getState()
    };

    const contactError = this.subBusinessPrimaryAddressRef
      .getState()
      .address.contactPerson.find(
        eachContact =>
          eachContact.email_validation_error ||
          eachContact.phone_validation_error
      )
      ? true
      : false;

    if (
      !this.subBusinessAdminDetailRef.getState().phone_validation_error &&
      !this.subBusinessAdminDetailRef.getState().email_validation_error &&
      !this.subBusinessAdminDetailRef.getState().website_validation_error &&
      !this.subBusinessPrimaryAddressRef.getState().address
        .email_validation_error &&
      !contactError
    )
      if (
        !this.props.requiredParams.contactPerson ||
        (this.propsData.address.contactPerson &&
          this.propsData.address.contactPerson.length)
      )
        this.props.onBusinessCreate({
          data: this.propsData,
          access_token: this.access_token
        });
      else {
        toast.error("Please add at-least One Contact Person");
      }

    // this.subBusinessAdminDetailRef.clearState();
    // this.subBusinessAboutRef.clearState();
    // this.subBusinessBranchWrapperRef.clearState();
    // this.subBusinessCoverImageRef.clearState();
    // this.subBusinessLogoRef.clearState();
    // this.subBusinessPrimaryAddressRef.clearState();
  };

  _handleKeyPress = event => {
    this.setState({ event });

    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);

    if (
      (event.keyCode === 13 || event.keyCode === 40) &&
      form.elements[index].type !== "submit"
    ) {
      form.elements[index + 1].focus();
      event.preventDefault();
    }

    if (event.keyCode === 38) {
      // const form = event.target.form;
      // const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index - 1].focus();
      // form.elements[index - 1].click();
      event.preventDefault();
    }
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

  renderErrors = () => {
    return (
      <div>
        <p> Business name not added </p>
      </div>
    );
  };

  render() {
    return (
      <div className="animated fadeIn" style={{ marginBottom: "20px" }}>
        {/* {this.renderErrors()} */}
        <form onSubmit={this.onFormSubmit}>
          <SubBusinessDetails
            collapsed={this.state.businessAdminDetailCollapse}
            toggleCollapse={this.toggleCollapse.bind(
              this,
              "businessAdminDetailCollapse"
            )}
            ref={ref => (this.subBusinessAdminDetailRef = ref)}
            {...this.props}
          />
          <SubBusinessPrimaryAddress
            collapsed={this.state.businessPrimaryAddressCollapse}
            toggleCollapse={this.toggleCollapse.bind(
              this,
              "businessPrimaryAddressCollapse"
            )}
            ref={ref => (this.subBusinessPrimaryAddressRef = ref)}
            {...this.props}
          />
          {/* <SubBusinessBranchWrapper
            collapsed={this.state.businessBranchWrapperCollapse}
            toggleCollapse={this.toggleCollapse.bind(
              this,
              "businessBranchWrapperCollapse"
            )}
            ref={ref => (this.subBusinessBranchWrapperRef = ref)}
            {...this.props}
          /> */}

          <Row>
            <Col>
              <SubBusinessLogo
                collapsed={this.state.businessLogoCollapse}
                toggleCollapse={this.toggleCollapse.bind(
                  this,
                  "businessLogoCollapse"
                )}
                ref={ref => (this.subBusinessLogoRef = ref)}
                businessCreateErrors={this.props.businessCreateErrors}
              />
            </Col>
            <Col>
              <SubBusinessCoverImage
                collapsed={this.state.businessCoverImageCollapse}
                toggleCollapse={this.toggleCollapse.bind(
                  this,
                  "businessCoverImageCollapse"
                )}
                ref={ref => (this.subBusinessCoverImageRef = ref)}
                businessCreateErrors={this.props.businessCreateErrors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SubBusinessAbout
                collapsed={this.state.businessAboutCollapse}
                toggleCollapse={this.toggleCollapse.bind(
                  this,
                  "businessAboutCollapse"
                )}
                ref={ref => (this.subBusinessAboutRef = ref)}
                company_types={this.props.company_types}
                businessCreateErrors={this.props.businessCreateErrors}
              />
            </Col>
            <Col>
              <SubBusinessWorkingHour
                collapsed={this.state.businessWorkingHourCollapse}
                ref={ref => (this.subBusinessWorkingHourRef = ref)}
                toggleCollapse={this.toggleCollapse.bind(
                  this,
                  "businessWorkingHourCollapse"
                )}
                businessCreateErrors={this.props.businessCreateErrors}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              {/* <PermissionProvider permission="CAN_ADD_BUSINESS"> */}
              <Button color="primary" size="lg">
                SUBMIT
              </Button>
              {/* </PermissionProvider> */}
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default connect(
  ({
    AdminContainer: { business_reducer, industries, categories, general_setup },
    auth
  }) => ({
    ...business_reducer,
    ...industries,
    ...categories,
    ...auth,
    ...general_setup
  }),
  {
    onBusinessCreate,
    onIndustryList,
    onIndustryEachList,
    onCategoryEachList,
    onUnmountSubCategories,
    onCountryList,
    onCountryEachList,
    onStateEachList,
    onDistrictEachList,
    onCityEachList,

    onUnmountArea,
    onUnmountCity,
    onUnmountDistrict,

    onPaymentMethodsList,
    onCompanyTypeList,
    onAddressTreeList,
    onRemoveCategoryData,
    onUnmountIndustryData,
    onUnmountCategoryData
  }
)(BusinessAdminDetail);
