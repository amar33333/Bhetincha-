import { Component } from "react";
import { connect } from "react-redux";

import CookiesProvider from "./CookiesProvider";

import {
  USER_GROUP_BUSINESS,
  USER_GROUP_INDIVIDUAL,
  USER_GROUP_ADMIN
} from "../../config/CONSTANTS";

class DynamicImport extends Component {
  state = { component: null };

  componentDidMount() {
    // Algorithm
    // ---
    // check group exists
    //   check (cookies not null) && (cookies not expired)
    //     check group matched
    //        then  proceed the load
    //     else redirect to "/"
    //   else redirect to "/"
    // else proceed with acync module load

    const loadModule = () =>
      this.props
        .load()
        .then(module => this.setState(() => ({ component: module.default })));

    const replaceRoute = path => this.props.history.replace(path);

    if (this.props.group) {
      if (this.props.cookies && CookiesProvider.getTokenData()) {
        const group = this.props.cookies.user_data.groups[0].name;
        if (
          group === this.props.group ||
          (group !== USER_GROUP_BUSINESS &&
            group !== USER_GROUP_INDIVIDUAL &&
            this.props.group === USER_GROUP_ADMIN)
        ) {
          loadModule();
        } else {
          this.props.history && replaceRoute("/");
        }
      } else {
        this.props.history && replaceRoute("/");
      }
    } else {
      loadModule();
    }

    // if (this.props.cookies) {
    //   const group = this.props.cookies.user_data.groups[0].name;

    //   if (
    //     group === this.props.group ||
    //     (group !== USER_GROUP_BUSINESS &&
    //       group !== USER_GROUP_INDIVIDUAL &&
    //       this.props.group === USER_GROUP_ADMIN)
    //   ) {
    //     this.props
    //       .load()
    //       .then(module => this.setState(() => ({ component: module.default })));
    //   }
    // }
    // if (this.props.history && !CookiesProvider.getTokenData()) {
    //   this.props.history.push("/logout");
    // } else {
    //   this.props
    //     .load()
    //     .then(module => this.setState(() => ({ component: module.default })));
    // }
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
