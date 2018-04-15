import { Component } from "react";
import { connect } from "react-redux";

import CookiesProvider from "./CookiesProvider";

class DynamicImport extends Component {
  state = { component: null };

  componentDidMount() {
    if (this.props.history && !CookiesProvider.getTokenData()) {
      this.props.history.push("/logout");
    } else {
      this.props
        .load()
        .then(module => this.setState(() => ({ component: module.default })));
    }
  }

  componentWillUpdate() {
    if (this.props.history && !CookiesProvider.getTokenData()) {
      this.props.history.push("/logout");
    }
  }

  render() {
    return this.props.children(this.state.component);
  }
}

export default connect(({ auth: { cookies } }) => ({ cookies }))(DynamicImport);
