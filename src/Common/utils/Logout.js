import { Component } from "react";
import { connect } from "react-redux";

import CookiesProvider from "./CookiesProvider";
import { onLogout } from "../../actions";

import store from "../../config/store";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout();
  }

  logout() {
    CookiesProvider.removeAllCookies();
    this.props.onLogout();
    console.log("Logout: ", CookiesProvider.getUserData());
    console.log("Logout2: ", store.getState().auth.cookies);

    this.props.history.push("/");
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  { onLogout }
)(Logout);
