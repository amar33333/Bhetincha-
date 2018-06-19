import React, { Component } from "react";

import { combineEpics } from "redux-observable";
import EcommerceRoutes from "./config/routes";
import withRepics from "../../../config/withRepics";
import ecommerceReducers from "./reducers";
import ecommerceEpics from "./config/epics";

class Ecommerce extends Component {
  render() {
    return <EcommerceRoutes />;
  }
}

export default withRepics(
  "EcommerceContainer",
  ecommerceReducers,
  combineEpics(...ecommerceEpics)
)(Ecommerce);
