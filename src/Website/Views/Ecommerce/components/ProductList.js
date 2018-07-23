import React, { Component } from "react";
import ProductItem from "./ProductItem";
import PaginationComponent from "./Pagination";
import FilterRange from "./FilterRange";
import { Container, Row, Col } from "reactstrap";
import { Card, Select } from "semantic-ui-react";
import { filter } from "rxjs/operators";

class ProductList extends Component {
  render() {
    var filterOptions = [
      { key: "az", value: "A - Z", text: "A - Z" },
      { key: "za", value: "Z - A", text: "Z - A" },
      { key: "highP", value: "Higher Price", text: "Higher Price" },
      { key: "lowP", value: "Lower Price", text: "Lower Price" }
    ];
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
            <strong>Filter by price:</strong>
            {this.props.priceFilter && (
              <FilterRange
                withTitle={false}
                min={this.props.priceFilter.min}
                max={this.props.priceFilter.max}
              />
            )}
          </Col>

          <Col>
            <div className="sort-wrapper">
              <strong>Sort by:</strong>{" "}
              <Select placeholder="A - Z" options={filterOptions} />
            </div>
          </Col>
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
