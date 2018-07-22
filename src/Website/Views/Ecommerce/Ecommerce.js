import React, { Component } from "react";
import { connect } from "react-redux";

import { combineEpics } from "redux-observable";
import EcommerceMainNav from "./components/EcommerceMainNav";

import EcommerceRoutes from "./config/routes";
import withRepics from "../../../config/withRepics";
import ecommerceReducers from "./reducers";
import ecommerceEpics from "./config/epics";

class Ecommerce extends Component {
  onSelectCategory = categoryId =>
    this.props.history.push(`/ecommerce/${categoryId}`);

  componentDidUpdate() {
    console.log("ishome:::", this.props.isHome);
  }

  render() {
    return (
      <div>
        <EcommerceMainNav
          categories={this.props.categories}
          onSelect={this.onSelectCategory}
        />
        <EcommerceRoutes />
      </div>
    );
  }
}

export default withRepics(
  "EcommerceContainer",
  ecommerceReducers,
  combineEpics(...ecommerceEpics)
)(
  connect(({ EcommerceContainer: { home: { categories } } }) => ({
    categories
  }))(Ecommerce)
);
