import React, { Component } from "react";
import { connect } from "react-redux";
// import withReducer from "../../../config/withReducer";
// import { adminReducer } from "../../reducers";

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        Hello Dashboard {this.props.admin.j_hoos}!
      </div>
    );
  }
}

// export default withReducer("admin", adminReducer)(
//   connect(({ admin }) => ({ admin }))(Dashboard)
// );

export default connect(({ AdminContainer: { admin } }) => ({ admin }))(
  Dashboard
);
