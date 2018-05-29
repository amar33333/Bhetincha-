import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="animated fadeIn">Hello Dashboard</div>
        {this.renderTest()}
      </div>
    );
  }

  renderTest = () => (
    <div>
      <p>Test render method</p>
    </div>
  );
}

export default connect(
  ({ BusinessContainer: { name_of_reducer } }) => ({ name_of_reducer }),
  {}
)(Dashboard);
