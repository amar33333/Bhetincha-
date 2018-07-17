import React, { Component } from "react";
import { connect } from "react-redux";

import ProductList from "./ProductList";
import Filters from "./Filters";
import MegaMenu from "./MegaMenu";
import ChildCategories from "./ChildCategories";

import { onCategoriesList } from "../actions";

class Home extends Component {
  componentDidMount() {
    this.props.onCategoriesList();
  }

  render() {
    return (
      <div>
        <div>This is home page</div>
        <div>
          <MegaMenu categories={this.props.categories} />
        </div>
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
