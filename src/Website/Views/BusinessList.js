import React, { Component } from "react";
import { connect } from "react-redux";

class BusinessList extends Component {
  render() {
    return <div className="body-wrapper">This is the list of businesses</div>;
  }
}

export default connect(({ auth: { cookies } }) => ({
  cookies
}))(BusinessList);
