import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";

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
  onCompanyTypeList
} from "../../actions";

import SubBusinessDetails from "./SubBusinessDetails";
import SubBusinessPrimaryAddress from "./SubBusinessPrimaryAddress";
import SubBusinessLogo from "./SubBusinessLogo";
import SubBusinessCoverImage from "./SubBusinessCoverImage";
import SubBusinessAbout from "./SubBusinessAbout";
import SubBusinessBranchWrapper from "./SubBusinessBranchWrapper";

class BusinessAdminDetail extends Component {
  constructor(props) {
    super(props);

    this.access_token = this.props.cookies
      ? this.props.cookies.token_data.access_token
      : null;

    this.propsData = {};
  }

  componentWillMount() {
    this.props.onCompanyTypeList({ access_token: this.access_token });
    this.props.onIndustryList({ access_token: this.access_token });
    this.props.onPaymentMethodsList({ access_token: this.access_token });
    this.props.onCountryList({ access_token: this.access_token });
  }

  onFormSubmit = event => {
    event.preventDefault();

    this.propsData = {
      ...this.subBusinessAdminDetailRef.getState(),
      ...this.subBusinessAboutRef.getState(),
      ...this.subBusinessBranchWrapperRef.getState(),
      // ...this.subBusinessContactRef.getState(),
      ...this.subBusinessCoverImageRef.getState(),
      ...this.subBusinessLogoRef.getState(),
      ...this.subBusinessPrimaryAddressRef.getState()
    };

    console.log("this propsData: ", this.propsData);
    this.props.onBusinessCreate({
      data: this.propsData,
      access_token: this.access_token
    });
    // this.subBusinessAdminDetailRef.clearState();
    // this.subBusinessAboutRef.clearState();
    // this.subBusinessBranchWrapperRef.clearState();
    // this.subBusinessContactRef.clearState();
    // this.subBusinessCoverImageRef.clearState();
    // this.subBusinessLogoRef.clearState();
    // this.subBusinessPrimaryAddressRef.clearState();
  };

  _handleKeyPress = event => {
    this.setState({ event });
    // // console.log('eventasdsa: ', this.state.event);

    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);

    if (
      (event.keyCode === 13 || event.keyCode === 40) &&
      form.elements[index].type !== "submit"
    ) {
      // // console.log('enter & down');

      form.elements[index + 1].focus();
      event.preventDefault();
    }

    if (event.keyCode === 38) {
      // // console.log('up');
      // const form = event.target.form;
      // const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index - 1].focus();
      // form.elements[index - 1].click();
      event.preventDefault();
    }
  };

  render() {
    console.log("busines admin props: ", this.props);
    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Add New Business</strong>
            </CardHeader>

            <CardBody>
              <form onSubmit={this.onFormSubmit}>
                <SubBusinessDetails
                  ref={ref => (this.subBusinessAdminDetailRef = ref)}
                  {...this.props}
                />
                <SubBusinessPrimaryAddress
                  ref={ref => (this.subBusinessPrimaryAddressRef = ref)}
                  {...this.props}
                />
                <SubBusinessBranchWrapper
                  ref={ref => (this.subBusinessBranchWrapperRef = ref)}
                  {...this.props}
                />
                <SubBusinessLogo ref={ref => (this.subBusinessLogoRef = ref)} />
                <SubBusinessCoverImage
                  ref={ref => (this.subBusinessCoverImageRef = ref)}
                />
                <SubBusinessAbout
                  ref={ref => (this.subBusinessAboutRef = ref)}
                  company_types={this.props.company_types}
                />
                <Row>
                  <Col xs="12">
                    <Button color="primary" size="lg">
                      SUBMIT
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
    onCompanyTypeList
  }
)(BusinessAdminDetail);
