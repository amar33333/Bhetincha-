import { Component } from "react";
import { connect } from "react-redux";

import CookiesProvider from "./CookiesProvider";

class DynamicImport extends Component {
  state = { component: null };

  componentDidMount() {
    console.log("component did mount dynamic simport ran ...", this.props);

    if (this.props.history && !CookiesProvider.getTokenData()) {
      console.log("cookies is nulll");
      this.props.history.push("/logout");
    } else {
      console.log("cooies not NULLLL");
      console.log("cookies: ", CookiesProvider.getTokenData());
      this.props
        .load()
        .then(module => this.setState(() => ({ component: module.default })));
    }
  }

  componentWillUpdate() {
    console.log("component WILL UPDATE Dynamic import ran ...", this.props);

    if (this.props.history && !CookiesProvider.getTokenData()) {
      console.log("route: cookies is nulll: ", CookiesProvider.getTokenData());
      this.props.history.push("/logout");
    } else {
      console.log("cooies not NULLLL");
      console.log("cookies: ", CookiesProvider.getTokenData());
    }
  }

  render() {
    return this.props.children(this.state.component);
  }
}

export default connect(({ auth }) => ({ ...auth }))(DynamicImport);
