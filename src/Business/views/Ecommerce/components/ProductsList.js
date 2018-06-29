import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductsList extends Component {
  render() {
    return (
      <div>
        {!this.props.products.length && <p>No products</p>}
        {this.props.products.map(product => (
          <div key={product.uid}>
            <Link to={`${this.props.URL}/${product.uid}`}>{product.name}</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductsList;
