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
        <Row className="hor-filter-sort__container mb-3">
          <Col>
            <PaginationComponent
              activePage={this.props.activePage}
              totalPages={this.props.totalPages}
              handlePaginationChange={this.props.handlePaginationChange}
            />
          </Col>
          <Col>
            filter price
            {/* {this.props.priceFilter && (
            <FilterRange
              min={this.props.priceFilter.min}
              max={this.props.priceFilter.max}
            />
          )} */}
          </Col>

          <Col>sort</Col>
        </Row>
        <Row>
          <Col xs="12">
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
                activePage={this.props.activePage}
                totalPages={this.props.totalPages}
                handlePaginationChange={this.props.handlePaginationChange}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductList;
