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

import BusinessRoute from "./config/routes";
import withReducer from "../config/withReducer";
import businessReducers from "./reducers";

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

    const routes = {};
    Object.keys(nav.routes).forEach(
      key =>
        (routes[
          key.replace(
            ROUTE_PARAMS_BUSINESS_NAME,
            this.props.match.params.businessName
          )
        ] =
          nav.routes[key])
    );

    this.setState({
      nav: nav.items.map(item => ({
        ...item,
        url: item.url.replace(
          ROUTE_PARAMS_BUSINESS_NAME,
          this.props.match.params.businessName
        )
      })),

      routes
    });
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

export default withReducer("BusinessContainer", businessReducers)(Business);
