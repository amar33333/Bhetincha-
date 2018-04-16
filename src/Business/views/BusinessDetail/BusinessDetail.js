import React, { Component } from "react";
import { connect } from "react-redux";

import { onBusinessSubmit } from "../../actions";

class BusinessDetail extends Component {
  render() {
    return <div className="animated fadeIn">Hello BusinessDetail</div>;
  }
}

export default connect(
  ({ BusinessContainer: { name_of_reducer } }) => ({ name_of_reducer }),
  { onBusinessSubmit }
)(BusinessDetail);
