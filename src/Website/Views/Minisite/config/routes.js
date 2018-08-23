import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "../MainPage";
import {
  Gallery,
  AboutUs,
  Contact,
  Ecommerce,
  EcommerceProduct,
  CoreMember,
  Sections
} from "../components";
import slugify from "slugify";
import {
  ROUTE_PARAMS_BUSINESS_NAME,
  ROUTE_PARAMS_MINISITE_BUSINESS_ROUTE
} from "../../../../config/CONSTANTS";
import ThemeLight from "../theme-light/ThemeLight";
import GalleryView from "../components/Gallery/GalleryView";

class MinisiteRoute extends Component {
  render() {
    const businessName = this.props.params[ROUTE_PARAMS_BUSINESS_NAME];
    const minisiteBusinessRoute = this.props.params[
      ROUTE_PARAMS_MINISITE_BUSINESS_ROUTE
    ];
    console.log(this.props.sections);
    console.log(this.props.subsections);
    var subsectionsroute;
    if (this.props.subsections !== undefined) {
      subsectionsroute = this.props.subsections.map((section, index) => {
        let name = slugify(section.attributes.name);
        if (section.children.length > 0) {
          console.log("my name for route=", name);
          return (
            <Route
              path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/${name}/:sectionId`}
              name="sections"
              component={Sections}
              key={index}
            />
          );
        }
      });
    }
    console.log("this is my subsection route =>", { subsectionsroute });
    var sectionroute;
    if (this.props.sections !== undefined) {
      sectionroute = this.props.sections.map((section, index) => {
        let name = slugify(section.name);
        console.log(section.uid);
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
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/theme`}
          name="theme"
          component={ThemeLight}
        />{" "}
        {/* <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/test-me/:sectionId`}
          name="theme"
          component={Sections}
        />{" "} */}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/about`}
          name="about-us"
          component={AboutUs}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce/product/:productId`}
          name="ecommerce"
          component={EcommerceProduct}
        />{" "}
        {this.props.sections ? sectionroute : ""}
        {this.props.subsections ? subsectionsroute : ""}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce/:categoryId`}
          name="ecommerce"
          component={Ecommerce}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/ecommerce`}
          name="ecommerce"
          component={Ecommerce}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/contact`}
          name="contact"
          component={Contact}
        />{" "}
        <Route
          path={`/:${ROUTE_PARAMS_BUSINESS_NAME}/coremember`}
          name="coremember"
          component={CoreMember}
        />
        <Redirect
          from={`/${businessName}/${minisiteBusinessRoute}`}
          to={`/${businessName}`}
        />
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
