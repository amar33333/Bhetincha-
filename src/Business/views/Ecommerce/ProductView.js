import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { onEcommerceProductEachList } from "../../actions";

class ProductView extends Component {
  componentDidMount() {
    this.props.onEcommerceProductEachList({
      uid: this.props.match.params.productId
    });
  }
  // {`${this.props.URL}/${product.uid}`}
  render() {
    const { productDetail } = this.props;
    return (
      <div>
        <div>
          <Link
            to={`/${
              this.props.match.params.businessName
            }/dashboard/ecommerce/manage-products/${
              this.props.match.params.productId
            }/edit`}
          >
            Edit
          </Link>
        </div>
        <h3>Product Information</h3>
        {productDetail && (
          <div>
            <p>Name: {productDetail.name}</p>
            <p>Price: {productDetail.price}</p>
            <p>Discount: {productDetail.discount}</p>
            {this.props.attributes &&
              this.props.attributes.attributes.map(attribute => {
                if (productDetail[attribute.name]) {
                  return (
                    <p key={attribute.uid}>
                      {attribute.name}: {productDetail[attribute.name]}
                    </p>
                  );
                } else {
                  return null;
                }
              })}
          </div>
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
    onEcommerceProductEachList
  }
)(ProductView);
