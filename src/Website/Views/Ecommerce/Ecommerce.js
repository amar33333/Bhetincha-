import React, { Component } from "react";

import EcommerceRoutes from "./config/routes";
// import { combineEpics } from "redux-observable";
// import withRepics from "../../../config/withRepics";
// import ecommerceReducers from "./reducers";
// import ecommerceEpics from "./config/epics";

class Ecommerce extends Component {
  render() {
    return <EcommerceRoutes />;
  }
}

// export default withRepics(
//   "EcommerceContainer",
//   ecommerceReducers,
//   combineEpics(...ecommerceEpics)
// )(Ecommerce);
export default Ecommerce;
