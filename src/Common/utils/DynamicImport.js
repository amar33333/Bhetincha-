import { Component } from "react";

class DynamicImport extends Component {
  state = { component: null };
  componentDidMount() {
    this.props
      .load()
      .then(module => this.setState(() => ({ component: module.default })));
  }

  render() {
    return this.props.children(this.state.component);
  }
}

export default DynamicImport;
