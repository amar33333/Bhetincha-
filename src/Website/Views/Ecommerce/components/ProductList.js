import React, { Component } from "react";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";
import FilterRange from "./FilterRange";

class ProductList extends Component {
  render() {
    return (
      <div>
        <div>
          <Pagination activeIndex={2} total={10} /> and{" "}
          {this.props.priceFilter && (
            <FilterRange
              min={this.props.priceFilter.min}
              max={this.props.priceFilter.max}
            />
          )}
          and sort stuffs
        </div>
        <h2>Product ListList of products</h2>
        {this.props.products.map(product => (
          <ProductItem key={product._id} product={product._source} />
        ))}
        <div>
          <Pagination activeIndex={2} total={10} />
        </div>
      </div>
    );
  }
}

export default ProductList;
