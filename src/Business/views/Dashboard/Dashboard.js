import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return <div className="animated fadeIn">Hello Dashboard</div>;
  }
}

export default connect(
  ({ BusinessContainer: { name_of_reducer } }) => ({ name_of_reducer }),
  {}
)(Dashboard);
