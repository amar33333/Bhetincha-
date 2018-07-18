import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col } from "reactstrap";

import ProductList from "./ProductList";
import Filters from "./Filters";
import MegaMenu from "./MegaMenu";
import EcommerceMainNav from "./EcommerceMainNav";
import ChildCategories from "./ChildCategories";

import { onCategoriesList } from "../actions";

class Home extends Component {
  componentDidMount() {
    this.props.onCategoriesList();
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
        <MegaMenu categories={this.props.categories} />
        {/* </Col>
        </Row> */}
        <div>
          <ChildCategories categories={this.props.childCategories} />
        </div>
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
        productCount
      }
    }
  }) => ({
    categories,
    childCategories,
    filterAttributes,
    products,
    productCount
  }),
  { onCategoriesList }
)(Home);
