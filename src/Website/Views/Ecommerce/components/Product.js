import React, { Component } from "react";
import { connect } from "react-redux";

import { onEcommerceProductEachList } from "../actions";
import EcommerceMainNav from "./EcommerceMainNav";
import ProductDetail from "./ProductDetail";
// import ProductReviews from "./ProductReviews";
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
    this.props.history.push(
      categoryId
        ? `${this.props.ECOMMERCE_URL || "/ecommerce/"}${categoryId}`
        : `${this.props.ECOMMERCE_URL || "/ecommerce"}`
    );

  render() {
    return (
      <div>
        {!this.props.accessFromOutside && (
          <EcommerceMainNav
            history={this.props.history}
            cookies={this.props.cookies}
            categories={this.props.categories}
            onSelect={this.onSelectCategory}
          />
        )}
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
          cookies={this.props.cookies}
          history={this.props.history}
        />
        {/* <ProductReviews /> */}
      </div>
    );
  }
}

export default connect(
  ({
    auth: { cookies },
    EcommerceContainer: {
      productDetail: { product, attributes, breadcrumbs },
      home: { categories }
    }
  }) => ({
    cookies,
    product,
    attributes,
    breadcrumbs,
    categories
  }),
  { onEcommerceProductEachList }
)(Product);
