import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import {
  Header,
  Sidebar,
  Breadcrumb,
  Aside,
  Footer
} from "../Common/components";
import nav from "./config/nav";

import { Dashboard, Component2 } from "./views";

class Admin extends Component {
  render() {
    const MATCH_URL = this.props.match.url;
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} nav={nav} />
          <main className="main">
            <Breadcrumb routes={nav.routes} />
            <Container fluid>
              <Switch>
                <Route
                  path={`${MATCH_URL}/component2`}
                  name="Component 2"
                  component={Component2}
                />
                <Route
                  path={`${MATCH_URL}/dashboard`}
                  name="Admin Dashboard"
                  component={Dashboard}
                />
                <Redirect from={MATCH_URL} to={`${MATCH_URL}/dashboard`} />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Admin;
