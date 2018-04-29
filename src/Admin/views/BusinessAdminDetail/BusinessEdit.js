import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";

import {
  onCompanyTypeList,
  onPaymentMethodsList,
  onCategoryEachList,
  onCategoryList,
  onIndustryList,
  onBusinessEachList
} from "../../actions";

import SubBusinessDetails from "./SubBusinessDetails";
import SubBusinessAbout from "./SubBusinessAbout";
import SubBusinessLogo from "./SubBusinessLogo";
import SubBusinessCoverImage from "./SubBusinessCoverImage";

class BusinessEdit extends Component {
  state = {};

  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentDidMount() {
    this.props.onCompanyTypeList({ access_token: this.access_token });
    this.props.onPaymentMethodsList({ access_token: this.access_token });
    this.props.onIndustryList({ access_token: this.access_token });
    this.props.onCategoryList({ access_token: this.access_token });
    this.props.onCategoryEachList({ access_token: this.access_token });
    this.props.onBusinessEachList({
      username: this.props.username,
      access_token: this.access_token
    });
  }

  static getDerivedStateFromProps = nextProps => ({
    data: nextProps.businessData
  });

  render() {
    console.log("new props: ", this.props);
    console.log("nextprops state: ", this.state);

    const businessData = {
      business_name: this.state.data.business_name,
      business_email: this.state.data.email,
      payment_method: this.state.data.paymentMethod,
      sub_categories: this.state.data.sub_categories
    };

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
                  {...businessData}
                  payment_methods={this.props.paymentMethods}
                  industries={this.props.industries}
                  edit
                />
                <SubBusinessAbout
                  ref={ref => (this.subBusinessAboutRef = ref)}
                  {...this.state.data.about}
                  company_types={this.props.companyTypes}
                  edit
                />
                <SubBusinessLogo
                  ref={ref => (this.subBusinessLogoRef = ref)}
                  imagePath={this.state.data.logo}
                  edit
                />
                <SubBusinessCoverImage
                  ref={ref => (this.subBusinessCoverImageRef = ref)}
                  imagePath={this.state.data.cover_photo}
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
    onBusinessEachList
  }
)(BusinessEdit);
