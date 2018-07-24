import React, { Component } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Label } from "semantic-ui-react";
import { Container, Row, Col, Button } from "reactstrap";
import { MAIN_URL } from "../../../../Common/utils/API";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.product &&
      this.props.product.pictures &&
      this.props.product.pictures.length &&
      (!prevProps.product ||
        prevProps.product.pictures.length !==
          this.props.product.pictures.length)
    ) {
      this.setState({
        selectedImage: this.props.product.pictures[0].url
      });
    }
  }

  componentDidMount() {
    this.setState({
      selectedImage:
        this.props.product &&
        this.props.product.pictures &&
        this.props.product.pictures.length &&
        this.props.product.pictures[0].url
    });
  }

  hanldeImageSelect = url => {
    this.setState({
      selectedImage: url
    });
  };

  render() {
    const { product } = this.props;
    return (
      <Container>
        {product && (
          <Row>
            <Col xs="12" md="1">
              {product.pictures.map(pic => {
                return (
                  <Row key={pic.uid} className="mb-2">
                    <Col xs="12">
                      <img
                        src={`${MAIN_URL}${pic.url}`}
                        alt=""
                        className={
                          pic.url === this.state.selectedImage
                            ? `product-img img-fluid active-product-img`
                            : `product-img img-fluid`
                        }
                        onClick={() => this.hanldeImageSelect(pic.url)}
                      />
                    </Col>
                  </Row>
                );
              })}
            </Col>
            <Col xs="12" md="5">
              <ReactImageMagnify
                isHintEnabled={true}
                style={{
                  zIndex: 20
                }}
                {...{
                  smallImage: {
                    alt: "",
                    isFluidWidth: true,
                    src: MAIN_URL + this.state.selectedImage
                  },
                  largeImage: {
                    src: MAIN_URL + this.state.selectedImage,
                    width: 1200,
                    height: 900
                  }
                }}
              />
            </Col>
            <Col xs="12" md="5">
              <div>
                <p className="product-detail__title">{product.name}</p>
                {this.props.cookies &&
                  this.props.cookies.user_data &&
                  this.props.cookies.user_data.business_id &&
                  this.props.cookies.user_data.business_id ===
                    product.businessId && (
                    <span>
                      <Button
                        color="link"
                        onClick={() =>
                          this.props.history.push(
                            `/${
                              product.businessSlug
                            }/dashboard/ecommerce/manage-products/${
                              product.uid
                            }/edit`
                          )
                        }
                      >
                        Edit
                      </Button>
                    </span>
                  )}
                <p>
                  <small>By {product.businessName}</small>
                </p>
                <p>{product.Description}</p>
                <Row>
                  <Col xs="8">
                    <Row>
                      <Col>
                        <h2>
                          Rs.{" "}
                          {product.price -
                            (product.price * product.discount) / 100}
                        </h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {product.discount !== 0 ? (
                          <small>
                            <strike>Rs. {product.price}</strike>
                          </small>
                        ) : null}

                        <span className="ml-3">
                          {product.discount !== 0 && (
                            <Label basic color="orange" size="large">
                              - {product.discount}%
                            </Label>
                          )}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Button color="warning" size="lg">
                      Buy Now
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-5 mb-2">
                  <Col>
                    <h3>Specifications:</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.props.attributes.map(attribute => {
                      if (attribute.name === "Description") return null;
                      let selectedKey = "";
                      if (
                        Object.keys(product).find(key => {
                          const found = key.split("--")[0] === attribute.name;
                          if (found) selectedKey = key;
                          return found;
                        })
                      ) {
                        return (
                          <p key={attribute.uid} className="product-spec-item">
                            {attribute.name.split("_").join(" ")}:
                            <span className="ml-3">
                              {product[selectedKey] instanceof Array
                                ? product[selectedKey].map(inst => {
                                    var last = product[selectedKey].slice(
                                      -1
                                    )[0];
                                    return (
                                      <span key={inst} className="pl-1">
                                        {inst}
                                        {last !== inst && (
                                          <span className="mx-2"> | </span>
                                        )}
                                      </span>
                                    );
                                  })
                                : `${product[selectedKey]} ${
                                    selectedKey.split("--").length > 1
                                      ? selectedKey.split("--")[1]
                                      : ""
                                  }`}
                            </span>
                          </p>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default ProductDetail;
