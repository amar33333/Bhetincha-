import React, { Component } from "react";
import { connect } from "react-redux";

import { onEcommerceProductEachList } from "../actions";
import EcommerceMainNav from "./EcommerceMainNav";
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
        <EcommerceMainNav
          categories={this.props.categories}
          onSelect={this.onSelectCategory}
        />
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
      productDetail: { product, attributes, breadcrumbs },
      home: { categories }
    }
  }) => ({
    product,
    attributes,
    breadcrumbs,
    categories
  }),
  { onEcommerceProductEachList }
)(Product);
