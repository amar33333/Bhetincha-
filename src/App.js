import React, { Component } from "react";
import { connect } from "react-redux";

// Import Flag Icons Set
// import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";

import "react-toastify/dist/ReactToastify.css";

import "./static/scss/style.css";
// import "../node_modules/@coreui/styles/scss/_dropdown-menu-right.scss";

import "semantic-ui-css/semantic.min.css";

import { MainRoute } from "./config/routes";

import { loadCookies, loadPermissions } from "./actions";

import CookiesProvider from "./Common/utils/CookiesProvider";

import { ToastContainer } from "react-toastify";
import { NOTIFICATION_TIME } from "./config/CONSTANTS";

import Loading from "./Common/pages/Loading/Loading";

class App extends Component {
  state = { display: false };

  componentDidMount() {
    // this.props.loadCookies();

    if (CookiesProvider.getAccessToken()) {
      this.props.loadPermissions(() => {
        this.setState({ display: true });
      });
    } else {
      this.setState({ display: true });
    }
  }

  render() {
    if (!this.state.display) return <Loading />;

    return (
      <div>
        <ToastContainer hideProgressBar autoClose={NOTIFICATION_TIME} />
        <MainRoute ref={ref => (this.routeRef = ref)} />
      </div>
    );
  }
}

export default connect(
  null,
  { loadCookies, loadPermissions }
)(App);
