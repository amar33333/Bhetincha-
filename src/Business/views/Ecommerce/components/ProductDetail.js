import React, { Component } from "react";
import { Link } from "react-router-dom";

import { PopoverDelete } from "../../../../Common/components";

class ProductDetail extends Component {
  render() {
    const { productDetail } = this.props;

    return (
      <div>
        <div>
          <Link to={this.props.editURL}>Edit</Link>
        </div>
        {productDetail && (
          <div>
            <div>
              <PopoverDelete
                onClick={() =>
                  this.props.onRemoveEcommerceProduct({
                    uid: productDetail.uid,
                    routeToManageProducts: this.props.routeToManageProducts
                  })
                }
              />
            </div>
            <h3>Product Information</h3>
            <p>Name: {productDetail.name}</p>
            <p>Price: {productDetail.price} Rs</p>
            <p>Discount: {productDetail.discount} %</p>
            {this.props.attributes.map(attribute => {
              let selectedKey = "";
              if (
                Object.keys(productDetail).find(key => {
                  const found = key.split("--")[0] === attribute.name;
                  if (found) selectedKey = key;
                  return found;
                })
              ) {
                return (
                  <p key={attribute.uid}>
                    {attribute.name.split("_").join(" ")}:
                    {productDetail[selectedKey]}{" "}
                    {selectedKey.split("--").length > 1
                      ? selectedKey.split("--")[1]
                      : ""}
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

export default ProductDetail;
