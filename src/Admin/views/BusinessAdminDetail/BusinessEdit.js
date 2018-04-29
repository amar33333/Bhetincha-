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
  onUnmountSubCategories
} from "../../actions";

import SubBusinessDetails from "./SubBusinessDetails";
import SubBusinessAbout from "./SubBusinessAbout";
import SubBusinessLogo from "./SubBusinessLogo";
import SubBusinessCoverImage from "./SubBusinessCoverImage";
import SubBusinessPrimaryAddress from "./SubBusinessPrimaryAddress";

class BusinessEdit extends Component {
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentDidMount() {
    this.props.onCompanyTypeList({ access_token: this.access_token });
    this.props.onPaymentMethodsList({ access_token: this.access_token });
    this.props.onIndustryList({ access_token: this.access_token });
    // this.props.onCategoryList({ access_token: this.access_token });
    this.props.onBusinessEachList({
      username: this.props.match.params.businessSlug,
      access_token: this.access_token
    });
  }

  render() {
    const data = this.props.businessData;
    console.log("new props: ", this.props);

    let businessData = null;
    let about = null;
    let logo = null;
    let cover_photo = null;

    if (data) {
      businessData = {
        business_name: data.business_name,
        business_email: data.email,
        payment_method: data.paymentMethod,
        sub_categories: data.sub_categories
      };

      about = data.about;
      logo = data.logo;
      cover_photo = data.cover_photo;
    }

    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardHeader>
              <strong>Edit Your Business</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onFormSubmit}>
                <SubBusinessDetails
                  ref={ref => (this.subBusinessAdminDetailRef = ref)}
                  businessData={businessData}
                  payment_methods={this.props.paymentMethods}
                  industries={this.props.industries}
                  onIndustryEachList={this.props.onIndustryEachList}
                  onCategoryEachList={this.props.onCategoryEachList}
                  onUnmountSubCategories={this.props.onUnmountSubCategories}
                  cookies={this.props.cookies}
                  industryData={this.props.industryData}
                  edit
                />
                <SubBusinessPrimaryAddress
                  ref={ref => (this.subBusinessPrimaryAddressRef = ref)}
                  {...this.props}
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
  ({ AdminContainer: { business_reducer, industries }, auth }) => ({
    companyTypes: business_reducer.company_types,
    paymentMethods: business_reducer.payment_methods,
    businessData: business_reducer.businessData,
    ...industries,
    ...auth
  }),
  {
    onCompanyTypeList,
    onPaymentMethodsList,
    onIndustryList,
    onCategoryEachList,
    onCategoryList,
    onBusinessEachList,
    onIndustryEachList,
    onUnmountSubCategories
  }
)(BusinessEdit);
