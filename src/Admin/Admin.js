import React, { Component } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
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
  // componentWillMount() {
  //   console.log("component will mount admin ran ...", this.props);
  //   if (this.props.cookies === null) {
  //     console.log("cookies is nulll");
  //     this.props.history.push("/logout");
  //   } else {
  //     console.log("cooies not NULLLL");
  //   }
  // }

  componentDidMount() {
    // if (
    //   this.props.cookies === null ||
    //   this.props.cookies.token_data === undefined
    // ) {
    //   console.log("cookies is nulll");
    //   this.props.history.push("/");
    // } else {
    //   console.log("cooies not NULLLL");
    // }

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
          <Sidebar {...this.props} nav={nav} />
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

export default withReducer("AdminContainer", adminReducers)(
  connect(({ auth }) => ({ ...auth }))(Admin)
);
