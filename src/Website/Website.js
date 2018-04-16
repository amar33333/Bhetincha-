import React, { Component } from "react";
import WebsiteRoutes from "./config/routes";

import "./website.css";

class Website extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <WebsiteRoutes />
      </div>
    );
  }
}

export default Website;
