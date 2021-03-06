import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "../MainPage";
import {
  Gallery,
  AboutUs,
  Contact,
  Ecommerce,
  Sections,
  SectionsDetails,
  EcommerceProduct
} from "../components";

import MinisitePermissionRoute from "./MinisitePermissionRoute";
import slugify from "slugify";

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

    var testroute;

    if (this.props.test !== undefined) {
      testroute = this.props.test.map((section, index) => {
        let name = slugify(section.attributes.name);
        if (section.children.length > 0) {
          return (
            <Route
              path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/${name}/:sectionId`}
              name="sections"
              component={Sections}
              key={index}
            />
          );
        } else {
          return (
            <Route
              path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/${name}/:sectionId`}
              name="sectionsDetails"
              component={SectionsDetails}
              key={index}
            />
          );
        }
      });
    }

    var subsectionsroute;
    if (this.props.subsections !== undefined) {
      subsectionsroute = this.props.subsections.map((section, index) => {
        let name = slugify(section.attributes.name);
        if (section.children.length > 0) {
          return (
            <Route
              path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/${name}/:sectionId`}
              name="sections"
              component={Sections}
              key={index}
            />
          );
        } else {
          return (
            <Route
              path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/${name}/:sectionId`}
              name="sectionsDetails"
              component={SectionsDetails}
              key={index}
            />
          );
        }
      });
    }

    console.log("this is my sectionrouting route =>", { subsectionsroute });
    console.log("this is my testroute route =>", { testroute });

    var sectionroute;
    if (this.props.sections !== undefined) {
      sectionroute = this.props.sections.map((section, index) => {
        let name = slugify(section.name);
        return (
          <Route
            path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/${name}/:sectionId`}
            name="sections"
            component={Sections}
            key={index}
          />
        );
      });
    }

    console.log("this is my section route =>", { sectionroute });

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
        <MinisitePermissionRoute
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce/product/:productId`}
          name="ecommerce"
          component={EcommerceProduct}
          permission={this.props.minisitePermissions.ECOMMERCE}
        />
        <MinisitePermissionRoute
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce/:categoryId`}
          name="ecommerce"
          component={Ecommerce}
          permission={this.props.minisitePermissions.ECOMMERCE}
        />
        <MinisitePermissionRoute
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce`}
          name="ecommerce"
          component={Ecommerce}
          permission={this.props.minisitePermissions.ECOMMERCE}
        />
        {this.props.sections ? sectionroute : ""}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/contact`}
          name="contact"
          component={Contact}
        />
        {this.props.test ? testroute : ""}
        {this.props.subsections ? subsectionsroute : ""}
        <Redirect
          from={`/${businessName}/${minisiteBusinessRoute}`}
          to={`/${businessName}`}
        />

        {/* <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}`}
          name="Minisite-Generic"
          component={props => <GenericSiteMainPage {...this.props} />}
          // component={MainPage}
        /> */}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}`}
          name="Minisite-MainPage"
          component={props => <MainPage {...this.props} />}
          // component={MainPage}
        />
      </Switch>
    );
  }
}

export default MinisiteRoute;
