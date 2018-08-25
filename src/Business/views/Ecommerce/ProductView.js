import React, { Component } from "react";
import { connect } from "react-redux";

import { ProductDetail } from "./components";

import {
  onEcommerceProductEachList,
  onRemoveEcommerceProduct
} from "../../actions";

class ProductView extends Component {
  componentDidMount() {
    this.props.onEcommerceProductEachList({
      uid: this.props.match.params.productId
    });
  }

  routeToManageProducts = () => {
    this.props.history.replace(
      `/${
        this.props.match.params.businessName
      }/dashboard/ecommerce/manage-products`
    );
  };

  render() {
    const { productDetail } = this.props;
    return (
      <div>
        {productDetail &&
          this.props.attributes &&
          this.props.attributes.attributes && (
            <ProductDetail
              editURL={`/${
                this.props.match.params.businessName
              }/dashboard/ecommerce/${this.props.match.params.productId}/edit`}
              onRemoveEcommerceProduct={this.props.onRemoveEcommerceProduct}
              productDetail={this.props.productDetail}
              routeToManageProducts={this.routeToManageProducts}
              attributes={this.props.attributes.attributes}
            />
          )}
      </div>
    );
  }
}

export default connect(
  ({
    BusinessContainer: {
      ecommerce: { productDetail, attributes }
    }
  }) => ({ productDetail, attributes }),
  {
    onEcommerceProductEachList,
    onRemoveEcommerceProduct
  }
)(ProductView);
