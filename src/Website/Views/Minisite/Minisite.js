import React, { Component } from "react";
import { MainNavbar } from "../../components";
import { connect } from "react-redux";
import { BusinessNav, BusinessFooter, AboutUs, CoverPhoto } from "./components";
import { Loading, Page404 } from "../../../Common/pages";

import "./minisite.css";

import withReducer from "../../../config/withReducer";
import { onBusinessGet } from "./actions";
import reducers from "./reducers";

class Minisite extends Component {
  componentDidMount() {
    this.props.onBusinessGet({
      username: this.props.match.params.businessName
    });
  }

  render() {
    if (this.props.mainLoading) return <Loading />;
    if (this.props.mainNotFound) return <Page404 />;
    return (
      <div>
        <MainNavbar />
        <BusinessNav businessName={this.props.data.business_name} />
        <CoverPhoto />
        <div className="body-wrapper">
          <AboutUs />
        </div>
        <BusinessFooter theme="dark" />
      </div>
    );
  }
}

export default withReducer("MinisiteContainer", reducers)(
  connect(
    ({ MinisiteContainer: { edit, crud } }) => ({
      mainEdit: edit.main,
      mainLoading: edit.mainLoading,
      mainNotFound: edit.mainNotFound,
      data: crud
    }),
    { onBusinessGet }
  )(Minisite)
);
