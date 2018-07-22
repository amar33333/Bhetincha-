import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";

class ProductDetail extends Component {
  render() {
    const { product } = this.props;
    return (
      <Container>
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
      </Container>
    );
  }
}

export default ProductDetail;
