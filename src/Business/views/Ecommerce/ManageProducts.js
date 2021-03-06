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
  onCreateEcommerceProduct,
  onFetchEcommerceProducts,
  onRemoveEcommerceProduct
} from "../../actions";

class ManageProducts extends Component {
  componentDidMount() {
    this.props.onCategoriesListEcommerce(
      this.props.match.params.categoryId,
      this.routeToManageProducts
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.categoryId !== prevProps.match.params.categoryId
    ) {
      if (!this.props.match.params.categoryId) {
        this.props.onCategoriesListEcommerce(
          this.props.match.params.categoryId,
          this.routeToManageProducts
        );
      } else {
        this.props.onChangeActiveCategoryEcommerce(
          this.props.match.params.categoryId,
          prevProps.match.params.categoryId,
          this.routeToManageProducts
        );
      }
    }
  }

  routeToManageProducts = () => {
    this.props.history.push(
      `/${
        this.props.match.params.businessName
      }/dashboard/ecommerce/manage-products`
    );
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Container fluid>
          <Row>
            <Col xs="12" md="4">
              <SideTreeView
                categories={this.props.categories}
                activeCategory={this.props.activeCategory}
                onChangeActiveCategory={
                  // this.props.onChangeActiveCategoryEcommerce
                  uid => {
                    if (this.props.match.params.categoryId !== uid) {
                      this.props.history.push(
                        `/${
                          this.props.match.params.businessName
                        }/dashboard/ecommerce/manage-products/${uid}`
                      );
                    } else {
                      this.props.onChangeActiveCategoryEcommerce(
                        uid,
                        this.props.match.params.categoryId,
                        this.routeToManageProducts,
                        true
                      );
                    }
                  }
                }
                isOpen={this.props.isOpenCategories}
                openAllOnSearch={this.props.openAllOnSearchEcommerce}
                leafDetect={true}
              />
            </Col>
            <Col xs="12" md="8">
              {this.props.selectedCategoryDetail && (
                <div>
                  <BreadcrumbNav
                    breadCrumbs={this.props.selectedCategoryDetail.breadCrumbs}
                    onChangeActiveCategory={uid =>
                      this.props.history.push(
                        `/${
                          this.props.match.params.businessName
                        }/dashboard/ecommerce/manage-products/${uid}`
                      )
                    }
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
              {this.props.selectedCategoryDetail && (
                <div>
                  <h5>Products</h5>
                  <ProductsList
                    products={this.props.selectedCategoryDetail.products}
                    rowCount={this.props.selectedCategoryDetail.totalProducts}
                    count={this.props.count}
                    page={this.props.page}
                    fetchData={this.props.onFetchEcommerceProducts}
                    URL={`/${
                      this.props.match.params.businessName
                    }/dashboard/ecommerce`}
                    loading={this.props.productsFetchLoading}
                    onDelete={this.props.onRemoveEcommerceProduct}
                  />
                </div>
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
        productError,
        count,
        page,
        productsFetchLoading
      }
    }
  }) => ({
    categories,
    activeCategory,
    isOpenCategories,
    attributes,
    selectedCategoryDetail,
    productLoading,
    productError,
    count,
    page,
    productsFetchLoading
  }),
  {
    onCategoriesListEcommerce,
    onChangeActiveCategoryEcommerce,
    openAllOnSearchEcommerce,
    onCreateEcommerceProduct,
    onFetchEcommerceProducts,
    onRemoveEcommerceProduct
  }
)(ManageProducts);
