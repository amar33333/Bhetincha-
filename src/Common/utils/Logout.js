import { Component } from "react";
import { connect } from "react-redux";

import CookiesProvider from "./CookiesProvider";
import { onLogout } from "../../actions";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout();
  }

  logout() {
    console.log("Logout");
    CookiesProvider.removeAllCookies();
    this.props.onLogout();

    this.props.history.push("/");
  }

  render() {
    return null;
  }
}

export default connect(null, { onLogout })(Logout);
