import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="animated fadeIn joyride-dashboard">Hello Dashboard</div>
      </div>
    );
  }
}

export default connect(
  ({ BusinessContainer: { name_of_reducer } }) => ({ name_of_reducer }),
  {}
)(Dashboard);
