import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "no no loaded" };
  }
  componentDidMount() {
    this.setState({ value: "yo yo loaded" });
  }
  render() {
    return (
      <div className="animated fadeIn">Hello Dashboard {this.state.value}!</div>
    );
  }
}

export default Dashboard;
