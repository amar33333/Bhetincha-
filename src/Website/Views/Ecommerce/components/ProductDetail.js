import React, { Component } from "react";

class ProductDetail extends Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        Product Detail
        {product && (
          <div>
            <h1>{product.name}</h1>
            <p>Price: {product.price}</p>
            <p>Discount: {product.discount}</p>
            {this.props.attributes.map(attribute => {
              if (product[attribute.name]) {
                return (
                  <p key={attribute.uid}>
                    {attribute.name.split("_").join(" ")}:
                    {product[attribute.name]}
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
