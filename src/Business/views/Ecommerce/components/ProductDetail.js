import React, { Component } from "react";
import { Link } from "react-router-dom";

import { PopoverDelete } from "../../../../Common/components";
import { Row, Col, Button } from "reactstrap";

class ProductDetail extends Component {
  render() {
    const { productDetail } = this.props;
    return (
      <div>
        {productDetail && (
          <div>
            <Row className="mb-4">
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}
              >
                <h3 className="mb-0">
                  Product Information of {productDetail.name}{" "}
                </h3>
                <Link to={this.props.editURL} className="ml-2">
                  <Button color="primary">
                    <i className="fa fa-pencil" /> Edit
                  </Button>
                </Link>
                <div className="ml-2">
                  <PopoverDelete
                    text="Delete"
                    onClick={() =>
                      this.props.onRemoveEcommerceProduct({
                        uid: productDetail.uid,
                        routeToManageProducts: this.props.routeToManageProducts
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="8">
                <p className="product-spec-item">Name: {productDetail.name}</p>
                <p className="product-spec-item">
                  Price: {productDetail.price} Rs
                </p>
                <p className="product-spec-item">
                  Discount: {productDetail.discount} %
                </p>
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
                      <p key={attribute.uid} className="product-spec-item">
                        {attribute.name.split("_").join(" ")}:{" "}
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
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default ProductDetail;
