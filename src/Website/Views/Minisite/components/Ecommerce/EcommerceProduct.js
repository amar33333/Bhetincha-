import React, { Component } from "react";
import Product from "../../../Ecommerce/components/Product";

class EcommerceProduct extends Component {
  render() {
    return (
      <div
        style={{
          paddingTop: "60px"
        }}
      >
        <Product
          match={this.props.match}
          history={this.props.history}
          accessFromOutside
          ECOMMERCE_URL={`/${this.props.match.params.businessName}/ecommerce/`}
        />
      </div>
    );
  }
}

export default EcommerceProduct;
