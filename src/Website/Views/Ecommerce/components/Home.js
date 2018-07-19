import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col } from "reactstrap";

import ProductList from "./ProductList";
import Filters from "./Filters";
import MegaMenu from "./MegaMenu";
import EcommerceMainNav from "./EcommerceMainNav";
import ChildCategories from "./ChildCategories";

import { onCategoriesList, onActiveCategoryChange } from "../actions";

class Home extends Component {
  componentDidMount() {
    const { categoryId } = this.props.match.params;
    if (categoryId) {
      this.props.onActiveCategoryChange({
        categoryId,
        history: this.props.history
      });
    }
    this.props.onCategoriesList({
      changeActive: !Boolean(categoryId),
      history: this.props.history
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.categoryId !== this.props.match.params.categoryId
    ) {
      const isCategoryId = Boolean(this.props.match.params.categoryId);
      if (isCategoryId) {
        this.props.onActiveCategoryChange({
          categoryId: this.props.match.params.categoryId,
          history: this.props.history
        });
      } else {
        this.props.onCategoriesList({
          changeActive: !isCategoryId,
          history: this.props.history
        });
      }
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(247, 237, 237, 0.32)"
        }}
      >
        <EcommerceMainNav />
        {/* <Row>
          <Col
            xs="12"
            md="4"
            style={{
              overflow: "visible"
            }}
          > */}
        <MegaMenu
          categories={this.props.categories}
          onSelect={categoryId =>
            this.props.history.push(`/ecommerce/${categoryId}`)
          }
        />
        {/* </Col>
        </Row> */}
        {/* <div>
          <ChildCategories categories={this.props.childCategories} />
        </div> */}
        <div>
          <Filters filters={this.props.filterAttributes} />
        </div>
        <div>
          <ProductList
            priceFilter={this.props.filterAttributes.find(
              x => x.name === "price"
            )}
            products={this.props.products}
            productCount={this.props.productCount}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    EcommerceContainer: {
      home: {
        categories,
        childCategories,
        filterAttributes,
        products,
        productCount,
        activeCategory
      }
    }
  }) => ({
    categories,
    childCategories,
    filterAttributes,
    products,
    productCount,
    activeCategory
  }),
  { onCategoriesList, onActiveCategoryChange }
)(Home);
