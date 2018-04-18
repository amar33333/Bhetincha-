import React, { Component } from "react";
import { MainNavbar } from "../../components";
import { connect } from "react-redux";
import { BusinessNav, BusinessFooter, AboutUs, CoverPhoto } from "./components";
import { Loading } from "../../../Common/pages";

import "./minisite.css";

import withReducer from "../../../config/withReducer";
import { onBusinessGet } from "./actions";
import reducers from "./reducers";

class Minisite extends Component {
  getBusiness = () => {
    this.props.onBusinessGet({
      username: this.props.match.params.businessName,
      history: this.props.history
    });
  };
  componentDidMount() {
    this.getBusiness();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.businessName !==
      this.props.match.params.businessName
    )
      this.getBusiness();
  }

  render() {
    if (this.props.mainLoading) return <Loading />;
    return (
      <div>
        <MainNavbar />
        <BusinessNav businessName={this.props.match.params.businessName} />
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
      data: crud
    }),
    { onBusinessGet }
  )(Minisite)
);
