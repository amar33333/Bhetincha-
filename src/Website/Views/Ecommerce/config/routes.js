import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Product, Home } from "../components";

class WebsiteRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/ecommerce/product"
          name="Ecommerce-product"
          component={Product}
        />
        <Route exact path="/ecommerce" name="Ecommerce-home" component={Home} />
        <Redirect from="/ecommerce" to="/ecommerce" />
      </Switch>
    );
  }
}

export default WebsiteRoute;
