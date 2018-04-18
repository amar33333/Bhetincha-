import React, { Component } from "react";
import { connect } from "react-redux";
import "./minisite.css";

import { Loading } from "../../../Common/pages";
import { BusinessNav, BusinessFooter } from "./components";
import MinisiteRoutes from "./config/routes";
import withReducer from "../../../config/withReducer";
import reducers from "./reducers";

import { onBusinessGet } from "./actions";

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
    return (
      <div>
        <BusinessNav businessName={this.props.match.params.businessName} />
        {this.props.mainLoading ? (
          <Loading />
        ) : (
          <MinisiteRoutes params={this.props.match.params} />
        )}
        <BusinessFooter theme="dark" />
      </div>
    );
  }
}

export default withReducer("MinisiteContainer", reducers)(
  connect(
    ({ MinisiteContainer: { edit } }) => ({
      mainLoading: edit.mainLoading
    }),
    { onBusinessGet }
  )(Minisite)
);
