import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="animated fadeIn">
          Hello Dashboard {this.props.name_of_reducer.hi}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ IndividualContainer: { name_of_reducer } }) => ({ name_of_reducer }),
  {}
)(Dashboard);
