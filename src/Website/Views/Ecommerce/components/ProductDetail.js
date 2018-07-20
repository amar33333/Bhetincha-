import React, { Component } from "react";

class ProductDetail extends Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        Product Detail
        {product && (
          <div>
            <h1>{product.name}</h1>
          </div>
        )}
      </div>
    );
  }
}

export default ProductDetail;
