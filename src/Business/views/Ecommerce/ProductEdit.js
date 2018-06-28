import React, { Component } from "react";
import { connect } from "react-redux";
import { ProductAddEdit } from "./components";

import {
  onEcommerceProductEachList,
  onUpdateEcommerceProduct
} from "../../actions";

class ProductEdit extends Component {
  componentDidMount() {
    this.props.onEcommerceProductEachList({
      uid: this.props.match.params.productId
    });
  }

  render() {
    if (
      !(
        this.props.attributes &&
        this.props.attributes.attributes &&
        this.props.productDetail
      )
    ) {
      return <div>Fetching product information</div>;
    }
    return (
      <ProductAddEdit
        attributes={this.props.attributes.attributes}
        add={false}
        defaultValue={this.props.productDetail}
        onSubmit={this.props.onUpdateEcommerceProduct}
        routeToView={() =>
          this.props.history.push(
            `/${
              this.props.match.params.businessName
            }/dashboard/ecommerce/manage-products/${
              this.props.match.params.productId
            }`
          )
        }
      />
    );
  }
}

export default connect(
  ({
    BusinessContainer: {
      ecommerce: { attributes, productDetail }
    }
  }) => ({ attributes, productDetail }),
  {
    onEcommerceProductEachList,
    onUpdateEcommerceProduct
  }
)(ProductEdit);
