import React, { Component } from "react";
import { MainNavbar } from "../../components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BusinessNav, BusinessFooter, AboutUs } from "./components";
import banner from "../../../static/img/banner.jpg";
import logo from "../../../static/img/avatar.jpg";

import { onBusinessGet } from "./actions";

import "./minisite.css";

import withReducer from "../../../config/withReducer";
import reducers from "./reducers";

class Minisite extends Component {
  // componentDidMount() {
  //   this.props.onBusinessGet({ id: 52 });
  // }

  renderUploadOverlay = () => (
    <div className="minisite_banner__img__change__overlay">
      <Link to="#">
        <span className="fa fa-camera">
          <strong> Upload New Banner</strong>
        </span>
      </Link>
    </div>
  );

  render() {
    return (
      <div>
        <MainNavbar />
        <BusinessNav
          logo={logo}
          businessName={this.props.match.params.businessName}
        />
        <div className="minisite_banner__wrapper">
          <img className="minisite_banner__img" src={banner} alt="banner" />
          {this.props.mainEdit && this.renderUploadOverlay()}
        </div>
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
    ({ MinisiteContainer: { edit } }) => ({
      mainEdit: edit.main
    }),
    { onBusinessGet }
  )(Minisite)
);
