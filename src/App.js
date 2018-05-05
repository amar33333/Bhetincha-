import React, { Component } from "react";
import { connect } from "react-redux";

// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";

import "react-toastify/dist/ReactToastify.css";

// import "bootstrap/dist/css/bootstrap.min.css";

import "./static/scss/style.css";
// import "../node_modules/@coreui/styles/scss/_dropdown-menu-right.scss";

import { MainRoute } from "./config/routes";

import { loadCookies } from "./actions";

import { ToastContainer } from "react-toastify";
import { NOTIFICATION_TIME } from "./config/CONSTANTS";

class App extends Component {
  componentWillMount() {
    this.props.loadCookies();
  }
  render() {
    return (
      <div>
        <ToastContainer hideProgressBar autoClose={NOTIFICATION_TIME} />
        <MainRoute />
      </div>
    );
  }
}

export default connect(null, { loadCookies })(App);
