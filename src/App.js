import React, { Component } from "react";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "./static/scss/style.css";
// import "../node_modules/@coreui/styles/scss/_dropdown-menu-right.scss";

import { MainRoute } from "./config/routes";

class App extends Component {
  render() {
    return <MainRoute />;
  }
}

export default App;
