import React, { Component } from "react";

class Minisite extends Component {
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>Welcome to Minisite, {this.props.match.params.businessName}!</div>
    );
  }
}

export default Minisite;
