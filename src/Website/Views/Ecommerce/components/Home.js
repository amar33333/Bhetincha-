import React, { Component } from "react";
import { connect } from "react-redux";

import ProductList from "./ProductList";
import Filters from "./Filters";
import MegaMenu from "./MegaMenu";

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
          <Filters />
        </div>
        <div>
          <ProductList />
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    EcommerceContainer: {
      home: { categories }
    }
  }) => ({ categories }),
  { onCategoriesList }
)(Home);
