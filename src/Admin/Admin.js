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

import AdminRoute from "./config/routes";
import withReducer from "../config/withReducer";
import adminReducers from "./reducers";

// Import Main styles for this application

class Admin extends Component {
  componentDidMount() {
    document.body.classList.add(
      "app",
      "header-fixed",
      "sidebar-fixed",
      "aside-menu-fixed",
      "aside-menu-hidden"
    );
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
          <Sidebar {...this.props} nav={nav.items} />
          <main className="main">
            <Breadcrumb routes={nav.routes} />
            <Container fluid>
              <AdminRoute {...this.props} />
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withReducer("AdminContainer", adminReducers)(Admin);
