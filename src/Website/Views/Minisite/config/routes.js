import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "../MainPage";
import {
  Gallery,
  AboutUs,
  Contact,
  Ecommerce,
  EcommerceProduct
} from "../components";

import {
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_MINISITE_BUSINESS_ROUTE
} from "../../../../config/CONSTANTS";
import ThemeLight from "../theme-light/ThemeLight";
import GalleryView from "../components/Gallery/GalleryView";
import GenericSiteMainPage from "../GenericSiteMainPage";

class MinisiteRoute extends Component {
  render() {
    const businessName = this.props.params[ROUTE_PARAMS_BUSINESS_NAME];
    const minisiteBusinessRoute = this.props.params[
      ROUTE_PARAMS_MINISITE_BUSINESS_ROUTE
    ];
    return (
      <Switch>
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/gallery/:id`}
          name="Gallery-View"
          render={props => <GalleryView {...props} />}
          // component={GalleryView}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/gallery`}
          name="Minisite-Gallery"
          component={Gallery}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/theme`}
          name="theme"
          component={ThemeLight}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/about`}
          name="about-us"
          component={AboutUs}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce/product/:productId`}
          name="ecommerce"
          component={EcommerceProduct}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce/:categoryId`}
          name="ecommerce"
          component={Ecommerce}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce`}
          name="ecommerce"
          component={Ecommerce}
        />
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/contact`}
          name="contact"
          component={Contact}
        />

        <Redirect
          from={`/${businessName}/${minisiteBusinessRoute}`}
          to={`/${businessName}`}
        />

        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}`}
          name="Minisite-Generic"
          component={props => <GenericSiteMainPage {...this.props} />}
          // component={MainPage}
        />
        {/* <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}`}
          name="Minisite-MainPage"
          component={props => <MainPage {...this.props} />}
          // component={MainPage}
        /> */}
      </Switch>
    );
  }
}

export default MinisiteRoute;
