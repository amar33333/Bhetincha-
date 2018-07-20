import React, { Component } from "react";
import ProductDetail from "./ProductDetail";
import ProductReviews from "./ProductReviews";

class Product extends Component {
  render() {
    return (
      <div>
        <ProductDetail />
        <ProductReviews />
      </div>
    );
  }
}

export default Product;
