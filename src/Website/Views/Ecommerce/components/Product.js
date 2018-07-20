import React, { Component } from "react";
import { connect } from "react-redux";

import { onEcommerceProductEachList } from "../actions";
import ProductDetail from "./ProductDetail";
import ProductReviews from "./ProductReviews";
import BreadcrumbNav from "./Breadcrumbs";

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

  onSelectCategory = categoryId =>
    this.props.history.push(`/ecommerce/${categoryId}`);

  render() {
    return (
      <div>
        {this.props.product && (
          <BreadcrumbNav
            items={[
              { name: this.props.product.name, uid: this.props.product.uid },
              ...this.props.breadcrumbs
            ]}
            onSelectCategory={this.onSelectCategory}
          />
        )}
        <ProductDetail
          product={this.props.product}
          attributes={this.props.attributes}
        />
        <ProductReviews />
      </div>
    );
  }
}

export default connect(
  ({
    EcommerceContainer: {
      productDetail: { product, attributes, breadcrumbs }
    }
  }) => ({
    product,
    attributes,
    breadcrumbs
  }),
  { onEcommerceProductEachList }
)(Product);
