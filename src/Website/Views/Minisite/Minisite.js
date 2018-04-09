import React, { Component } from "react";
import { Footer, MainNavbar } from "../../components";
import BusinessNav from "./components/BusinessNav";

class Minisite extends Component {
  // const BUSINESSNAME = this.props.match.params.businessName;
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <MainNavbar />
        <BusinessNav name={this.props.match.params.businessName} />
        <div className="body-wrapper">
          Welcome to Minisite, {this.props.match.params.businessName}!
        </div>
        <Footer />
      </div>
    );
  }
}

export default Minisite;
