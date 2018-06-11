import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Product, Home } from "../components";
import EcommerceAdmin from "../EcommerceAdmin";

class WebsiteRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/ecommerce/product"
          name="Ecommerce-product"
          component={Product}
        />
        <Route
          path="/ecommerce/admin"
          name="Ecommerce-admin"
          component={EcommerceAdmin}
        />
        <Route path="/ecommerce" name="Ecommerce-home" component={Home} />
      </Switch>
    );
  }
}

export default WebsiteRoute;
