import React, { Component } from "react";
import ProductItem from "./ProductItem";
import PaginationComponent from "./Pagination";
import FilterRange from "./FilterRange";
import { Container, Row, Col } from "reactstrap";
import { Card } from "semantic-ui-react";
class ProductList extends Component {
  render() {
    return (
      <div>
        {/* <Container className="mb-5">
          {this.props.priceFilter && (
            <FilterRange
              min={this.props.priceFilter.min}
              max={this.props.priceFilter.max}
            />
          )}
        </Container> */}
        <Container>
          <Card.Group itemsPerRow={4} stackable>
            {this.props.products.map(product => (
              <ProductItem
                key={product._id}
                product={product._source}
                id={product._id}
                onSelectProduct={this.props.onSelectProduct}
              />
            ))}
          </Card.Group>
        </Container>
        <div className="mt-5 text-center">
          <PaginationComponent
            activeIndex={1}
            total={this.props.productCount}
          />
        </div>
      </div>
    );
  }
}

export default ProductList;
