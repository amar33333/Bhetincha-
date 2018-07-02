import React, { Component } from "react";
import WebsiteRoutes from "./config/routes";
import { MainNavbar, BottomFooter } from "./components";
import "./website.css";

class Website extends Component {
  state = { initialQuery: "" };

  setInitialQuery = initialQuery => this.setState({ initialQuery });

  render() {
    const { pathname } = this.props.location;

    return (
      <div className="main-wrapper">
        {pathname === "/businesses" && (
          <MainNavbar
            history={this.props.history}
            initialQuery={this.state.initialQuery}
          />
        )}
        <WebsiteRoutes setInitialQuery={this.setInitialQuery} />
        {pathname !== "/" && <BottomFooter theme="dark" />}
      </div>
    );
  }
}

export default Website;
