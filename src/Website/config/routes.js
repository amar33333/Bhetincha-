import React, { Component } from "react";
import DynamicImport from "../../Common/utils/DynamicImport";
import { Route, Switch } from "react-router-dom";
import { Loading } from "../../Common/pages";
import { Home, BusinessList } from "../Views";
import EcommerceAdmin from "../Views/Ecommerce/EcommerceAdmin";
import {
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_MINISITE_BUSINESS_ROUTE
} from "../../config/CONSTANTS";

const AsyncMinisite = props => (
  <DynamicImport load={() => import("../Views/Minisite")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const AsyncEcommerce = props => (
  <DynamicImport load={() => import("../Views/Ecommerce")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

class WebsiteRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/businesses"
          name="Business List"
          component={BusinessList}
        />

        <Route path="/ecommerce" name="Ecommerce" component={AsyncEcommerce} />

        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/:${ROUTE_PARAMS_MINISITE_BUSINESS_ROUTE}`}
          name="Minisite Extra"
          component={AsyncMinisite}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}`}
          name="Minisite"
          component={AsyncMinisite}
        />
        <Route path="/" name="Home" component={Home} />
      </Switch>
    );
  }
}

export default WebsiteRoute;
