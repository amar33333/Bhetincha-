import React, { Component } from "react";
import EcommerceHome from "../../../Ecommerce/components/Home";

class Ecommerce extends Component {
  render() {
    return (
      <div
        style={{
          paddingTop: "60px"
        }}
      >
        <EcommerceHome
          match={this.props.match}
          history={this.props.history}
          accessFromOutside
          ECOMMERCE_URL={`/${this.props.match.params.businessName}/ecommerce/`}
        />
      </div>
    );
  }
}

export default Ecommerce;
