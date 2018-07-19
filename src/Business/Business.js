import React, { Component } from "react";
import { Container } from "reactstrap";
import {
  Header,
  Sidebar,
  Breadcrumb,
  Aside,
  Footer
} from "../Common/components";
import nav from "./config/nav";

import { combineEpics } from "redux-observable";
import BusinessRoute from "./config/routes";
import withRepics from "../config/withRepics";
import businessReducers from "./reducers";
import businessEpics from "./config/epics";

import { ROUTE_PARAMS_BUSINESS_NAME } from "../config/CONSTANTS";

class Business extends Component {
  state = { nav: [], routes: [] };

  componentDidMount() {
    document.body.classList.add(
      "app",
      "header-fixed",
      "sidebar-fixed",
      "aside-menu-fixed",
      "aside-menu-hidden"
    );
    this.updateSidebar();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME] !==
      prevProps.match.params[ROUTE_PARAMS_BUSINESS_NAME]
    ) {
      this.updateSidebar();
    }
  }

  componentWillUnmount() {
    document.body.classList.remove(
      "app",
      "header-fixed",
      "sidebar-fixed",
      "aside-menu-fixed",
      "aside-menu-hidden"
    );
  }

  updateSidebar() {
    const routes = {};
    Object.keys(nav.routes).forEach(
      key =>
        (routes[
          key.replace(
            ROUTE_PARAMS_BUSINESS_NAME,
            this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
          )
        ] =
          nav.routes[key])
    );

    const items = nav.items.map(item => {
      const temp = {};
      if (item.name) {
        temp.name = item.name.replace(
          ROUTE_PARAMS_BUSINESS_NAME,
          this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
        );
      }
      if (item.url) {
        temp.url = item.url.replace(
          ROUTE_PARAMS_BUSINESS_NAME,
          this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
        );
      }
      if (item.children) {
        item.children = item.children.map(child => {
          const childTemp = {};
          if (child.name) {
            childTemp.name = child.name.replace(
              ROUTE_PARAMS_BUSINESS_NAME,
              this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
            );
          }
          if (child.url) {
            childTemp.url = child.url.replace(
              ROUTE_PARAMS_BUSINESS_NAME,
              this.props.match.params[ROUTE_PARAMS_BUSINESS_NAME]
            );
          }
          return { ...child, ...childTemp };
        });
      }
      return { ...item, ...temp };
    });

    this.setState({
      nav: items,
      routes
    });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} nav={this.state.nav} />
          <main className="main">
            <Breadcrumb routes={this.state.routes} />
            <Container fluid>
              <BusinessRoute params={this.props.match.params} />
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRepics(
  "BusinessContainer",
  businessReducers,
  combineEpics(...businessEpics)
)(Business);
