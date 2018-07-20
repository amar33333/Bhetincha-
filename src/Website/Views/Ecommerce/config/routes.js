import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Product, Home, MainHome } from "../components";

class WebsiteRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/ecommerce/product/:productId"
          name="Ecommerce-product"
          component={Product}
        />
        <Route
          exact
          path="/ecommerce/:categoryId"
          name="Ecommerce-home-category"
          component={Home}
        />
        <Route
          exact
          path="/ecommerce-main"
          name="Ecommerce-home-main-main"
          component={MainHome}
        />
        <Route exact path="/ecommerce" name="Ecommerce-home" component={Home} />
        <Redirect from="/ecommerce" to="/ecommerce" />
      </Switch>
    );
  }
}

export default WebsiteRoute;
