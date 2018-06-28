import React, { Component } from "react";
import ProductAddEdit from "./ProductAddEdit";

class ProductAddNew extends Component {
  render() {
    return (
      <div>
        <ProductAddEdit
          add
          attributes={this.props.attributes}
          onSubmit={this.props.onSubmit}
          loading={this.props.loading}
          error={this.props.error}
        />
      </div>
    );
  }
}

export default ProductAddNew;
