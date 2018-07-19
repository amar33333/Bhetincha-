import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { MAIN_URL } from "../../../../Common/utils/API";
import { Col } from "reactstrap";

class ProductItem extends Component {
  render() {
    const {
      business_name,
      profilePicture,
      discount,
      name,
      price
    } = this.props.product;

    const discountedPrice = price + price * (discount / 100);

    const brandName = this.props.product["Brand Name"];
    console.log("product::", this.props.product);
    return (
      <Card>
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
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default ProductItem;
