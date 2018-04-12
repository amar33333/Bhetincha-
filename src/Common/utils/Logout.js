import React, { Component } from "react";

import CookiesProvider from "./CookiesProvider";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout();
  }

  logout() {
    console.log("asdasdasd logout");
    CookiesProvider.removeAllCookies();

    this.props.history.push("/");
  }

  render() {
    return null;
  }
}

export default Logout;
