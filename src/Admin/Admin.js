import React, { Component } from "react";
import { Container } from "reactstrap";
import "react-table/react-table.css";
import {
  Header,
  Sidebar,
  Breadcrumb,
  Aside,
  Footer
} from "../Common/components";
import nav from "./config/nav";

import { combineEpics } from "redux-observable";
import AdminRoute from "./config/routes";
import withRepics from "../config/withRepics";
import adminReducers from "./reducers";
import adminEpics from "./config/epics";

// Import Main styles for this application

class Admin extends Component {
  componentDidMount() {
    console.log("asdasdaddsd");
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

  icons = [
    {
      name: "icon-list"
    },
    {
      name: "icon-speech"
    }
  ];
  data = [
    [
      {
        business_name: "naam",
        address_name: "address_name",
        reminder: new Date().toISOString(),
        note: "note"
      },
      {
        business_name: "naam2",
        address_name: "address_name2",
        reminder: new Date().toISOString(),
        note: "note2"
      }
    ],
    [
      {
        business_name: "naam",
        address_name: "address_name",
        reminder: new Date().toISOString(),
        note: "note"
      },
      {
        business_name: "naam2",
        address_name: "address_name2",
        reminder: new Date().toISOString(),
        note: "note2"
      }
    ]
  ];

  renderContent = row => (
    <div className="callout callout-warning m-0 py-3">
      <div className="avatar float-right">
        <img
          src={"img/avatars/7.jpg"}
          className="img-avatar"
          alt="admin@bootstrapmaster.com"
        />
      </div>
      <div>
        Meeting with <strong>{row.business_name}</strong>
      </div>
      <small className="text-muted mr-3">
        <i className="icon-calendar" />&nbsp; 1 - 3pm
      </small>
      <small className="text-muted">
        <i className="icon-location-pin" />&nbsp; Palo Alto, CA
      </small>
    </div>
  );

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
          <Aside
            icons={this.icons}
            renderContent={this.renderContent}
            data={this.data}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRepics(
  "AdminContainer",
  adminReducers,
  combineEpics(...adminEpics)
)(Admin);
