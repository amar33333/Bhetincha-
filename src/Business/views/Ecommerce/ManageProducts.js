import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import {
  SideTreeView,
  BreadcrumbNav
} from "../../../Admin/views/Ecommerce/components";
import { ProductAddNew, ProductsList } from "./components";
import {
  onCategoriesListEcommerce,
  onChangeActiveCategoryEcommerce,
  openAllOnSearchEcommerce,
  onCreateEcommerceProduct
} from "../../actions";

class ManageProducts extends Component {
  componentDidMount() {
    this.props.onCategoriesListEcommerce();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="3">
              <SideTreeView
                categories={this.props.categories}
                activeCategory={this.props.activeCategory}
                onChangeActiveCategory={
                  this.props.onChangeActiveCategoryEcommerce
                }
                isOpen={this.props.isOpenCategories}
                openAllOnSearch={this.props.openAllOnSearchEcommerce}
                leafDetect={true}
              />
            </Col>
            <Col xs="12" md="9">
              {this.props.selectedCategoryDetail && (
                <div>
                  <BreadcrumbNav
                    breadCrumbs={this.props.selectedCategoryDetail.breadCrumbs}
                    onChangeActiveCategory={
                      this.props.onChangeActiveCategoryEcommerce
                    }
                  />
                  <ProductsList
                    products={this.props.selectedCategoryDetail.products}
                    URL={`/${
                      this.props.match.params.businessName
                    }/dashboard/ecommerce/manage-products`}
                  />
                </div>
              )}
              {this.props.attributes &&
                this.props.attributes.attributes &&
                this.props.selectedCategoryDetail &&
                this.props.selectedCategoryDetail.hasProduct && (
                  <ProductAddNew
                    attributes={this.props.attributes.attributes}
                    onSubmit={this.props.onCreateEcommerceProduct}
                    loading={this.props.productLoading}
                    error={this.props.productError}
                  />
                )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({
    BusinessContainer: {
      ecommerce: {
        categories,
        activeCategory,
        isOpenCategories,
        attributes,
        selectedCategoryDetail,
        productLoading,
        productError
      }
    }
  }) => ({
    categories,
    activeCategory,
    isOpenCategories,
    attributes,
    selectedCategoryDetail,
    productLoading,
    productError
  }),
  {
    onCategoriesListEcommerce,
    onChangeActiveCategoryEcommerce,
    openAllOnSearchEcommerce,
    onCreateEcommerceProduct
  }
)(ManageProducts);
