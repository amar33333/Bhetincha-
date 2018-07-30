import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";

import {
  ToogleEDIT,
  onAboutEdit,
  onAboutList,
  onCompanyTypeList
} from "../../actions";

class Gallery extends Component {
  render() {
    return (
      <div className="animated fadeIn">{/* Place your code here ... */}</div>
    );
  }
}

const mapStateToProps = ({
  BusinessContainer: {
    business_reducer: { businessGet, EDIT, company_types, about }
  },
  auth: { cookies }
}) => {
  return {
    businessGet,
    company_types,
    about,
    EDIT,
    cookies
  };
};

export default connect(
  mapStateToProps,
  {
    ToogleEDIT,
    onAboutEdit,
    onAboutList,
    onCompanyTypeList
  }
)(Gallery);
