import React, { Component } from "react";
import WebsiteRoutes from "./config/routes";
import { MainNavbar, BottomFooter } from "./components";
import querystring from "querystring";

import "./website.css";

class Website extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.location.search) {
      this.state.query = querystring.parse(this.props.location.search.slice(1));
    }
  }

  render() {
    const { pathname } = this.props.location;
    return (
      <div className="main-wrapper">
        {pathname !== "/" && (
          <MainNavbar
            history={this.props.history}
            initialQuery={this.state.query}
          />
        )}
        <WebsiteRoutes />
        {pathname !== "/" && <BottomFooter theme="dark" />}
      </div>
    );
  }
}

export default Website;
