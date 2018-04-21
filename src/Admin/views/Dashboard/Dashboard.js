import React, { Component } from "react";
import { connect } from "react-redux";
import { ping, ping2 } from "../../actions";

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        Hello Dashboard
        {/* Test */}
        <div>
          <h1> is pinging: {this.props.isPinging.toString()}</h1>
          <h1 onClick={this.props.ping2}>
            {" "}
            is pinging: {this.props.kxa.toString()}
          </h1>
          <button onClick={this.props.ping}>Start PING</button>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ AdminContainer: { dashboard } }) => ({
    ...dashboard
  }),
  { ping, ping2 }
)(Dashboard);
