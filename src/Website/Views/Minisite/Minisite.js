import React, { Component } from "react";
import { MainNavbar } from "../../components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BusinessNav, BusinessFooter, AboutUs } from "./components";
import banner from "../../../static/img/banner.jpg";
import logo from "../../../static/img/avatar.jpg";

import "./minisite.css";

import withReducer from "../../../config/withReducer";
import { MAIN_URL } from "./config/MINISITE_API";
import { onBusinessGet } from "./actions";
import reducers from "./reducers";

class Minisite extends Component {
  componentDidMount() {
    this.props.onBusinessGet({
      username: this.props.match.params.businessName
    });
  }

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
    console.log(`${MAIN_URL}${this.props.data.cover_photo}`);
    return (
      <div>
        <MainNavbar />
        <BusinessNav businessName={this.props.data.business_name} />
        <div className="minisite_banner__wrapper">
          <img
            className="minisite_banner__img"
            src={`${MAIN_URL}${this.props.data.cover_photo}`}
            alt="banner"
          />
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
    ({ MinisiteContainer: { edit, crud } }) => ({
      mainEdit: edit.main,
      data: crud
    }),
    { onBusinessGet }
  )(Minisite)
);
