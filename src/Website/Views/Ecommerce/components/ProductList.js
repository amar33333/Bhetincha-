import React, { Component } from "react";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";

class ProductList extends Component {
  render() {
    return (
      <div>
        <div>
          <Pagination /> and Price range selector and sort stuffs
        </div>
        <h2>Product ListList of products</h2>
        {[1, 2, 3, 4, 5].map(product => <ProductItem key={product} />)}
        <div>
          <Pagination />
        </div>
      </div>
    );
  }
}

export default ProductList;
