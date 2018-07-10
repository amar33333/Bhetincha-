import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";

import SubBusinessPrimaryAddress from "../../../Admin/views/BusinessAdminDetail/SubBusinessPrimaryAddress";

import {
  onAddressTreeList,
  onPrimaryAddressList,
  onPrimaryAddressEdit,
  onCountryList,
  ToogleEDIT
} from "../../actions";

class BusinessPrimaryAddress extends Component {
  access_token = this.props.cookies
    ? this.props.cookies.token_data.access_token
    : null;

  componentDidMount() {
    this.props.ToogleEDIT(true);
    this.props.onCountryList({ access_token: this.access_token });

    this.props.onPrimaryAddressList({
      id: this.props.cookies.user_data.business_id,
      access_token: this.access_token
    });
  }

  onInitialPropsReceived = () => this.props.ToogleEDIT(!this.props.EDIT);

  onFormEdit = event => {
    event.preventDefault();

    this.props.onPrimaryAddressEdit({
      data: {
        ...this.subBusinessPrimaryAddressRef.getState()
      },
      id: this.props.cookies.user_data.business_id,
      access_token: this.access_token,
      EDIT: this.props.EDIT
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <form onSubmit={this.onFormEdit}>
          <SubBusinessPrimaryAddress
            ref={ref => (this.subBusinessPrimaryAddressRef = ref)}
            cookies={this.props.cookies}
            address={this.props.primary_address_details}
            onAddressTreeList={this.props.onAddressTreeList}
            countries={this.props.countries}
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
    business_reducer: { primary_address_details, businessGet, EDIT },
    primary_address: { countries }
  },
  auth: { cookies }
}) => {
  return {
    primary_address_details,
    businessGet,
    EDIT,
    cookies,
    countries
  };
};

export default connect(
  mapStateToProps,
  {
    onAddressTreeList,
    onPrimaryAddressList,
    onPrimaryAddressEdit,
    onCountryList,
    ToogleEDIT
  }
)(BusinessPrimaryAddress);
