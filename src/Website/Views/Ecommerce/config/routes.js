import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Product, Home } from "../components";

class WebsiteRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/ecommerce/product"
          name="Ecommerce-product"
          component={Product}
        />
        <Route path="/ecommerce" name="Ecommerce-home" component={Home} />
      </Switch>
    );
  }
}

export default WebsiteRoute;
