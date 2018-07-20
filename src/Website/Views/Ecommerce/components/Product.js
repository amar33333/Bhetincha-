import React, { Component } from "react";
import { connect } from "react-redux";

import { onEcommerceProductEachList } from "../actions";
import ProductDetail from "./ProductDetail";
import ProductReviews from "./ProductReviews";

class Product extends Component {
  componentDidMount() {
    this.props.onEcommerceProductEachList({
      uid: this.props.match.params.productId,
      history: this.props.history
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.productId !== this.props.match.params.productId
    ) {
      this.props.onEcommerceProductEachList({
        uid: this.props.match.params.productId,
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <div>
        <ProductDetail product={this.props.product} />
        <ProductReviews />
      </div>
    );
  }
}

export default connect(
  ({
    EcommerceContainer: {
      productDetail: { product }
    }
  }) => ({
    product
  }),
  { onEcommerceProductEachList }
)(Product);
