import React, { Component } from "react";
import WebsiteRoutes from "./config/routes";
import { MainNavbar, BottomFooter } from "./components";

import "./website.css";

class Website extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="main-wrapper">
        {pathname !== "/" && <MainNavbar />}
        <WebsiteRoutes />
        {pathname !== "/" && <BottomFooter theme="dark" />}
      </div>
    );
  }
}

export default Website;
