import { Component } from "react";
import { connect } from "react-redux";

class DynamicImport extends Component {
  state = { component: null };

  componentDidMount() {
    console.log("component will mount dynamic simport ran ...", this.props);

    if (this.props.cookies === null) {
      console.log("cookies is nulll");
      this.props.history.push("/logout");
    } else {
      console.log("cooies not NULLLL");

      this.props
        .load()
        .then(module => this.setState(() => ({ component: module.default })));
    }
  }

  render() {
    return this.props.children(this.state.component);
  }
}

export default connect(({ auth }) => ({ ...auth }))(DynamicImport);
