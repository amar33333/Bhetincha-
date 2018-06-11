import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";

import { combineEpics } from "redux-observable";
import EcommerceRoutes from "./config/routes";
import withRepics from "../../../config/withRepics";
import ecommerceReducers from "./reducers";
import ecommerceEpics from "./config/epics";

class Ecommerce extends Component {
  render() {
    return (
      <Container fluid>
        <h2>Ecommerce Main Page</h2>
        <EcommerceRoutes />
      </Container>
    );
  }
}

export default withRepics(
  "EcommerceContainer",
  ecommerceReducers,
  combineEpics(...ecommerceEpics)
)(Ecommerce);
