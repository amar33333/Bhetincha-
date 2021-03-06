import React, { Component } from "react";
import { Card, Image, Label } from "semantic-ui-react";
import { MAIN_URL } from "../../../../Common/utils/API";
import { Col } from "reactstrap";

class ProductItem extends Component {
  render() {
    const {
      business_name,
      profilePicture,
      discount,
      name,
      price,
      Brand_Name: brandName
    } = this.props.product;

    const discountedPrice = price - price * (discount / 100);

    return (
      <Card
        className="product-card"
        onClick={() => this.props.onSelectProduct(this.props.id)}
      >
        <Image
          src={`${MAIN_URL}${profilePicture}`}
          className="product-card-thumbnail"
        />
        <Card.Content>
          <Card.Meta>{brandName}</Card.Meta>
          <Card.Header>{name}</Card.Header>
          <Card.Description>
            Rs. {discountedPrice}{" "}
            {discount !== 0 ? (
              <small>
                <strike>Rs. {price}</strike>
              </small>
            ) : null}
            <span
              style={{
                position: "absolute",
                right: "10px",
                bottom: "10px"
              }}
            >
              {discount !== 0 && (
                <Label basic color="orange" size="mini">
                  -{discount}%
                </Label>
              )}
            </span>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default ProductItem;
