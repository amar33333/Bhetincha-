import React, { Component } from "react";
import ProductItem from "./ProductItem";
import PaginationComponent from "./Pagination";
import FilterRange from "./FilterRange";
import { Container, Row, Col } from "reactstrap";
import { Card, Select } from "semantic-ui-react";

const filterOptions = [
  {
    key: "az",
    value: "A - Z",
    text: "A - Z",
    attr: { sortby: "name", desc: false }
  },
  {
    key: "za",
    value: "Z - A",
    text: "Z - A",
    attr: { sortby: "name", desc: true }
  },
  {
    key: "highP",
    value: "Higher Price",
    text: "Higher Price",
    attr: { sortby: "price", desc: true }
  },
  {
    key: "lowP",
    value: "Lower Price",
    text: "Lower Price",
    attr: { sortby: "price", desc: false }
  }
];

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
            <strong>Filter by price:</strong>
            {this.props.priceFilter && (
              <FilterRange
                withTitle={false}
                unitLeft={true}
                value={{
                  min: this.props.priceFilter.min,
                  max: this.props.priceFilter.max
                }}
                onChangeComplete={({ min, max }) =>
                  this.props.handleFilterChange({
                    lte: max,
                    gte: min,
                    fieldType: this.props.priceFilter.fieldType,
                    name: this.props.priceFilter.name
                  })
                }
                unit="Rs"
              />
            )}
          </Col>

          <Col>
            <div className="sort-wrapper">
              <strong>Sort by:</strong>{" "}
              <Select
                placeholder="Select Order"
                options={filterOptions}
                onChange={(_, data) => {
                  const selected = filterOptions.find(
                    option => option.text === data.value
                  );
                  if (selected) {
                    this.props.handleSortChange(selected.attr);
                    // do stuffs
                  }
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Container>
              {this.props.products.length === 0 && <h4>No Products Found</h4>}
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
