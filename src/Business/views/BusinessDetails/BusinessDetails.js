import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";

import {
  ToogleEDIT,
  onPaymentMethodsList,
  onIndustryList,
  onCategoryEachList,
  onIndustryEachList,
  onUnmountSubCategories,
  onRemoveCategoryData,
  onUnmountIndustryData,
  onUnmountCategoryData,
  onBusinessDetailsList,
  onBusinessDetailsEdit
} from "../../actions";

import SubBusinessDetails from "../../../Admin/views/BusinessAdminDetail/SubBusinessDetails";

class BusinessDetails extends Component {
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentDidMount() {
    this.props.ToogleEDIT(true);
    this.props.onPaymentMethodsList();
    this.props.onIndustryList({ access_token: this.access_token });
    this.props.onBusinessDetailsList({
      id: this.props.cookies.user_data.business_id
    });
  }

  onInitialPropsReceived = () => this.props.ToogleEDIT(!this.props.EDIT);

  onFormEdit = event => {
    event.preventDefault();

    const body = this.subBusinessAdminDetailRef.getState();
    console.log("bosy: ", body);
    if (
      !body.phone_validation_error &&
      !body.email_validation_error &&
      !body.website_url_validation_error
    )
      this.props.onBusinessDetailsEdit({
        body,
        id: this.props.cookies.user_data.business_id,
        EDIT: this.props.EDIT
      });
  };

  render() {
    console.log("props:ub usines sddetai: ", this.props);
    return (
      <div className="animated fadeIn">
        <form onSubmit={this.onFormEdit}>
          <SubBusinessDetails
            ref={ref => (this.subBusinessAdminDetailRef = ref)}
            businessData={this.props.businessDetails}
            payment_methods={this.props.payment_methods}
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
          <Row>
            <Col xs="12">
              <Button color="primary" size="lg" style={{ marginRight: 20 }}>
                SAVE
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({
  BusinessContainer: {
    business_reducer: { businessGet, EDIT, payment_methods, businessDetails },
    industries,
    categories
  },
  auth: { cookies }
}) => {
  return {
    businessGet,
    ...industries,
    ...categories,
    payment_methods,
    businessDetails,
    EDIT,
    cookies
  };
};

export default connect(
  mapStateToProps,
  {
    ToogleEDIT,
    onPaymentMethodsList,
    onIndustryList,
    onCategoryEachList,
    onIndustryEachList,
    onUnmountSubCategories,
    onRemoveCategoryData,
    onUnmountIndustryData,
    onUnmountCategoryData,
    onBusinessDetailsEdit,
    onBusinessDetailsList
  }
)(BusinessDetails);
